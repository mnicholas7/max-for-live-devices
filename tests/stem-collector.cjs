const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../devices/stem-collector/controller.js'), 'utf8');
function fixture() {
    let nextId = 2;
    const objects = {1: {tracks: [], scenes: [90, 91]}};
    const messages = [];
    const copies = [];
    const calls = [];
    function add(object) { const identifier = nextId++; objects[identifier] = object; return identifier; }
    function track(name, group = 0, clips = [0, 0]) {
        const slots = clips.map(clip => add({clip, has_clip: clip ? 1 : 0}));
        const identifier = add({name, group_track: group, clip_slots: slots, is_foldable: 0, has_audio_input: 1, is_frozen: 0, mute: 0});
        objects[1].tracks.push(identifier);
        return identifier;
    }
    function group(name) {
        const identifier = add({name, is_foldable: 1, group_track: 0});
        objects[1].tracks.push(identifier);
        for (const kind of ['Drums', 'Bass', 'Vocals', 'Other']) {
            const clip = add({is_recording: 0, name: kind});
            track(kind, identifier, [clip, 0]);
        }
        return identifier;
    }
    class LiveAPI {
        constructor(callback, location) { this.id = location === 'live_set' ? 1 : Number(location.split(' ')[1]); }
        get(property) {
            const object = objects[this.id];
            if (!object) throw new Error('Object unavailable');
            const value = object[property];
            if (['tracks', 'scenes', 'clip_slots'].includes(property)) return value.flatMap(identifier => ['id', identifier]);
            if (['group_track', 'clip'].includes(property)) return ['id', value || 0];
            return [value];
        }
        set(property, value) { objects[this.id][property] = value; }
        call(command, ...args) {
            calls.push(command);
            if (command === 'create_audio_track') track('Audio', 0, objects[1].scenes.map(() => 0));
            else if (command === 'create_scene') {
                objects[1].scenes.push(add({}));
                for (const identifier of objects[1].tracks) {
                    if (objects[identifier].clip_slots) objects[identifier].clip_slots.push(add({clip: 0, has_clip: 0}));
                }
            } else if (command === 'duplicate_clip_to') {
                assert.equal(args[0], 'id');
                const target = objects[args[1]];
                assert.equal(target.has_clip, 0);
                target.clip = add({...objects[objects[this.id].clip]});
                target.has_clip = 1;
                copies.push([this.id, args[1]]);
            } else throw new Error('Unexpected call ' + command);
        }
    }
    class Task {
        constructor(callback) { this.callback = callback; this.active = false; }
        repeat() { this.active = true; }
        cancel() { this.active = false; }
    }
    const context = vm.createContext({LiveAPI, Task, outlet: (...args) => messages.push(args[2])});
    vm.runInContext(source, context);
    context.bounds.lasttrack = 999;
    context.bounds.lastscene = 999;
    function run() {
        let iterations = 0;
        while (context.worker && context.worker.active && iterations++ < 1000) context.worker.callback();
        assert.ok(iterations < 1000);
    }
    return {context, objects, messages, copies, calls, group, track, run};
}
{
    const test = fixture();
    test.group('Song A'); test.group('Song B');
    test.context.scan();
    assert.equal(test.context.plan.rows.length, 2);
    assert.equal(test.calls.length, 0);
    const before = JSON.stringify(test.objects);
    test.context.collect(); test.run();
    assert.equal(test.copies.length, 8);
    const targets = test.objects[1].tracks.slice(-4);
    assert.deepEqual(targets.map(identifier => test.objects[identifier].name), ['Collected Drums', 'Collected Bass', 'Collected Vocals', 'Collected Other']);
    assert.ok(targets.every(identifier => test.objects[identifier].mute === 1));
    const originals = JSON.parse(before);
    for (const identifier of Object.keys(originals).filter(value => value !== '1')) assert.deepEqual(test.objects[identifier], originals[identifier]);
    assert.equal(test.context.plan, null);
    assert.ok(test.messages.at(-1).startsWith('Done:'));
}
{
    const test = fixture();
    test.group('Ambiguous'); test.track('Extra', test.objects[1].tracks[0]);
    test.context.scan(); assert.equal(test.context.plan, null);
}
{
    const test = fixture(); test.group('Changed'); test.context.scan();
    const cell = test.context.plan.rows[0].cells[0];
    test.objects[cell.slot].clip = 0;
    test.context.collect(); assert.equal(test.calls.length, 0);
}
{
    const test = fixture(); test.group('Occupied'); test.context.scan(); test.context.collect();
    for (let index = 0; index < 4; index++) test.context.worker.callback();
    const target = test.objects[test.objects[1].tracks.at(-4)].clip_slots[0];
    test.objects[target].has_clip = 1;
    test.run(); assert.equal(test.copies.length, 0);
    assert.ok(test.messages.at(-1).includes('refusing to overwrite'));
}
{
    const test = fixture(); test.group('Recording'); test.context.scan();
    const clip = test.context.plan.rows[0].cells[0].clip;
    test.objects[clip].is_recording = 1;
    test.context.collect(); assert.equal(test.calls.length, 0);
}
{
    const test = fixture();
    test.group('One'); test.group('Two'); test.group('Three');
    test.context.scan(); test.context.collect(); test.run();
    assert.equal(test.objects[1].scenes.length, 3);
    assert.equal(test.copies.length, 12);
}
{
    const test = fixture(); test.group('First'); test.group('Second');
    test.context.rangeparameter('firsttrack', 7);
    test.context.rangeparameter('lasttrack', 10);
    test.context.scan();
    assert.equal(test.context.plan.rows.length, 1);
    assert.equal(test.context.plan.groups[0], 'Second');
    test.context.rangeparameter('lasttrack', 9);
    assert.equal(test.context.plan, null);
    test.context.scan(); assert.equal(test.context.plan, null);
}
{
    const test = fixture(); test.group('Row filter');
    const child = test.objects[test.objects[1].tracks[1]];
    test.objects[child.clip_slots[1]].clip = test.objects[child.clip_slots[0]].clip;
    test.objects[child.clip_slots[1]].has_clip = 1;
    test.context.rangeparameter('firstscene', 2);
    test.context.rangeparameter('lastscene', 2);
    test.context.scan();
    assert.equal(test.context.plan.rows.length, 1);
    assert.equal(test.context.plan.rows[0].sourceRow, 1);
    test.context.rangeparameter('firstscene', 3);
    test.context.scan(); assert.equal(test.context.plan, null);
}
{
    const test = fixture(); test.group('316 Eb maj'); test.group('320 Eb maj');
    for (const identifier of test.objects[1].tracks) {
        const track = test.objects[identifier];
        if (track.name === 'Other') track.name = 'Others 316_Eb_maj';
    }
    test.context.rangeparameter('firsttrack', 2);
    test.context.rangeparameter('lasttrack', 10);
    test.context.rangeparameter('lastscene', 2);
    test.context.scan();
    assert.equal(test.context.plan.groups.length, 2);
    test.context.collect(); test.run();
    assert.equal(test.copies.length, 8);
    assert.equal(test.context.classify('Others 320_Eb_maj'), 3);
    assert.equal(test.context.classify('Other'), 3);
    assert.equal(test.context.classify('Bass and Others'), -1);
}
{
    const test = fixture();
    test.context.status('One\nTwo\nThree\nFour\nFive\nSix');
    assert.ok(test.messages.at(-1).includes('Report 1/2'));
    test.context.nextreport(); assert.ok(test.messages.at(-1).startsWith('Five\nSix'));
    test.context.nextreport(); assert.equal(test.context.reportPage, 1);
    test.context.previousreport(); assert.equal(test.context.reportPage, 0);
}
{
    const test = fixture(); test.group('Left / later scene'); test.group('Right / earlier scene');
    for (const identifier of test.objects[1].tracks.slice(1, 5)) {
        const slots = test.objects[identifier].clip_slots;
        test.objects[slots[1]].clip = test.objects[slots[0]].clip;
        test.objects[slots[1]].has_clip = 1;
        test.objects[slots[0]].clip = 0;
        test.objects[slots[0]].has_clip = 0;
    }
    test.context.scan();
    assert.equal(test.context.plan.rows[0].sourceRow, 0);
    assert.equal(test.context.plan.rows[0].name, 'Right / earlier scene');
    assert.equal(test.context.plan.rows[1].sourceRow, 1);
    const expectedSlots = test.context.plan.rows.flatMap(row => Array.from(row.cells, cell => cell.slot));
    test.context.collect(); test.run();
    assert.deepEqual(test.copies.map(copy => copy[0]), Array.from(expectedSlots));
}
{
    const test = fixture(); test.group('Left'); test.group('Right'); test.context.scan();
    assert.equal(test.context.plan.rows[0].name, 'Left');
    assert.equal(test.context.plan.rows[1].name, 'Right');
}
{
    const test = fixture(); test.group('Cancel'); test.context.scan(); test.context.collect();
    test.context.freebang(); assert.equal(test.context.worker.active, false);
}
console.log('Stem collector: preview, alignment, muted copies, source preservation, stale/recording/occupied guards and cancellation passed.');
