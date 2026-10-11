// SPDX-License-Identifier: GPL-3.0-only
// Copyright (C) 2026 Michael Nicholas
autowatch = 0;
inlets = 1;
outlets = 1;
var plan = null;
var busy = false;
var worker = null;
var kinds = ['Drums', 'Bass', 'Vocals', 'Other'];
var bounds = {firsttrack: 1, lasttrack: 8, firstscene: 1, lastscene: 1};
var reportLines = [];
var reportPage = 0;

function rangeparameter(name, value) {
    if (busy || !bounds.hasOwnProperty(name)) return;
    value = Number(value);
    if (!isFinite(value) || value < 1 || Math.floor(value) !== value) return;
    bounds[name] = value;
    plan = null;
    status('Range changed — Scan again. Track numbers include group headers and folded tracks.');
}

function ids(values) {
    var result = [];
    for (var index = 0; index < values.length; index++) {
        if (values[index] === 'id' && Number(values[index + 1])) result.push(Number(values[++index]));
    }
    return result;
}

function api(identifier) { return new LiveAPI(null, 'id ' + identifier); }
function scalar(object, property) { return object.get(property)[0]; }
function showreport() {
    var pages = Math.max(1, Math.ceil(reportLines.length / 4));
    outlet(0, 'set', reportLines.slice(reportPage * 4, reportPage * 4 + 4).join('\n') + '\n[Report ' + (reportPage + 1) + '/' + pages + ' — Prev / Next]');
}
function status(message) {
    reportLines = [];
    var lines = String(message).split('\n');
    for (var index = 0; index < lines.length; index++) {
        var line = lines[index];
        while (line.length > 88) {
            var end = line.lastIndexOf(' ', 88);
            if (end < 30) end = 88;
            reportLines.push(line.substring(0, end));
            line = line.substring(end).replace(/^\s+/, '');
        }
        reportLines.push(line);
    }
    reportPage = 0;
    showreport();
}
function nextreport() {
    if (reportPage + 1 < Math.ceil(reportLines.length / 4)) reportPage++;
    showreport();
}
function previousreport() {
    if (reportPage > 0) reportPage--;
    showreport();
}

function classify(name) {
    var matches = String(name).match(/\b(drums|bass|vocals|others?)\b/gi) || [];
    if (matches.length !== 1) return -1;
    var normalized = matches[0].toLowerCase();
    if (normalized === 'others') normalized = 'other';
    for (var index = 0; index < kinds.length; index++) {
        if (normalized === kinds[index].toLowerCase()) return index;
    }
    return -1;
}

function discover(song) {
    var tracks = ids(song.get('tracks'));
    var groups = [];
    var rows = [];
    for (var index = 0; index < tracks.length; index++) {
        var group = api(tracks[index]);
        if (!Number(scalar(group, 'is_foldable'))) continue;
        var children = [null, null, null, null];
        var count = 0;
        var valid = true;
        for (var childIndex = 0; childIndex < tracks.length; childIndex++) {
            var child = api(tracks[childIndex]);
            if (ids(child.get('group_track'))[0] !== tracks[index]) continue;
            if (childIndex + 1 < bounds.firsttrack || childIndex + 1 > bounds.lasttrack) { valid = false; break; }
            count++;
            var kind = classify(scalar(child, 'name'));
            if (kind < 0 || children[kind] || !Number(scalar(child, 'has_audio_input')) || Number(scalar(child, 'is_frozen'))) { valid = false; break; }
            children[kind] = ids(child.get('clip_slots'));
        }
        if (!valid || count !== 4 || children.some(function(value) { return !value; })) continue;
        var groupRows = [];
        for (var row = bounds.firstscene - 1; row < Math.min(children[0].length, bounds.lastscene); row++) {
            var cells = [];
            for (var kindIndex = 0; kindIndex < 4; kindIndex++) {
                var slot = api(children[kindIndex][row]);
                if (!Number(scalar(slot, 'has_clip'))) { cells.push(null); continue; }
                var clipId = ids(slot.get('clip'))[0];
                if (Number(scalar(api(clipId), 'is_recording'))) throw new Error('A source clip is recording. Stop recording before scanning.');
                cells.push({slot: Number(slot.id), clip: clipId});
            }
            if (cells.some(function(value) { return !!value; })) groupRows.push({name: String(scalar(group, 'name')), sourceRow: row, sourceTrack: index, cells: cells});
        }
        if (groupRows.length) { groups.push(String(scalar(group, 'name'))); rows = rows.concat(groupRows); }
    }
    rows.sort(function(first, second) {
        return first.sourceRow - second.sourceRow || first.sourceTrack - second.sourceTrack;
    });
    return {groups: groups, rows: rows};
}

function init() { status('Set inclusive track and scene ranges, then Scan. Include all four stem tracks of each group. Sources stay untouched.'); }

function scan() {
    if (busy) return;
    plan = null;
    try {
        var song = new LiveAPI(null, 'live_set');
        if (!Number(song.id)) throw new Error('Live is not ready.');
        if (bounds.firsttrack > bounds.lasttrack || bounds.firstscene > bounds.lastscene) throw new Error('First must be less than or equal to Last for both ranges.');
        var found = discover(song);
        if (!found.rows.length) throw new Error('No matching groups in this range. Include all four audio stem tracks (Drums, Bass, Vocals, Other) and occupied source scenes.');
        plan = found;
        var preview = found.rows.map(function(row, index) { return (index + 1) + ': ' + row.name + ' / source scene ' + (row.sourceRow + 1); });
        status('Tracks ' + bounds.firsttrack + '–' + bounds.lasttrack + ' / scenes ' + bounds.firstscene + '–' + bounds.lastscene + '\n' + found.groups.length + ' groups / ' + found.rows.length + ' rows → four NEW muted tracks.\n' + preview.join('\n') + '\nCollect copies clips only; effects and mixer settings are NOT copied.');
    } catch (error) { status('Scan: ' + error.message); }
}

function validateRows(rows) {
    for (var row = 0; row < rows.length; row++) {
        for (var kind = 0; kind < 4; kind++) {
            var cell = rows[row].cells[kind];
            if (!cell) continue;
            var slot = api(cell.slot);
            if (ids(slot.get('clip'))[0] !== cell.clip || Number(scalar(api(cell.clip), 'is_recording'))) throw new Error('Source changed. Scan again.');
        }
    }
}

function collect() {
    if (busy || !plan) { if (!busy) status('Scan before collecting.'); return; }
    try {
        var song = new LiveAPI(null, 'live_set');
        validateRows(plan.rows);
        var rows = plan.rows;
        plan = null;
        busy = true;
        var destinations = [];
        var kind = 0;
        var rowIndex = 0;
        var cellIndex = 0;
        var copied = 0;
        worker = new Task(function() {
            try {
                if (kind < 4) {
                    song.call('create_audio_track', -1);
                    var tracks = ids(song.get('tracks'));
                    var target = api(tracks[tracks.length - 1]);
                    target.set('name', 'Collected ' + kinds[kind]);
                    target.set('mute', 1);
                    destinations.push(Number(target.id));
                    kind++;
                } else if (ids(song.get('scenes')).length < rows.length) {
                    song.call('create_scene', -1);
                } else if (rowIndex < rows.length) {
                    var cell = rows[rowIndex].cells[cellIndex];
                    if (cell) {
                        validateRows([rows[rowIndex]]);
                        var targetSlotId = ids(api(destinations[cellIndex]).get('clip_slots'))[rowIndex];
                        var targetSlot = api(targetSlotId);
                        if (Number(scalar(targetSlot, 'has_clip'))) throw new Error('Destination occupied; refusing to overwrite.');
                        api(cell.slot).call('duplicate_clip_to', 'id', targetSlotId);
                        if (Number(scalar(targetSlot, 'has_clip')) !== 1) throw new Error('Live did not confirm the copy.');
                        copied++;
                    }
                    cellIndex++;
                    if (cellIndex === 4) { cellIndex = 0; rowIndex++; }
                } else {
                    worker.cancel(); busy = false;
                    status('Done: ' + copied + ' clips / ' + rows.length + ' aligned rows. New tracks are MUTED to avoid doubled audio. Audition them manually; sources remain unchanged.');
                    return;
                }
                status('Collecting: ' + copied + ' clips copied. Sources unchanged.');
            } catch (error) {
                worker.cancel(); busy = false;
                status('Stopped: ' + error.message + ' Copies already made remain on muted tracks. Nothing was deleted.');
            }
        }, this);
        worker.interval = 60;
        worker.repeat();
    } catch (error) { busy = false; plan = null; status('Collect: ' + error.message); }
}

function freebang() { if (worker) worker.cancel(); busy = false; }
