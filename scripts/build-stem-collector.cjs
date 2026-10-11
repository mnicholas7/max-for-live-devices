const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../devices/stem-collector');
const boxes = [];
const lines = [];
function box(id, maxclass, rect, attributes = {}) {
    boxes.push({box: {id, maxclass, patching_rect: rect, ...attributes}});
}
function wire(source, destination, inlet = 0) {
    lines.push({patchline: {source: [source, 0], destination: [destination, inlet]}});
}
box('controller', 'newobj', [20, 380, 500, 22], {text: 'js controller.js', numinlets: 1, numoutlets: 1});
box('ready', 'newobj', [20, 420, 110, 22], {text: 'live.thisdevice'});
box('defer', 'newobj', [150, 420, 65, 22], {text: 'deferlow'});
box('init', 'message', [240, 420, 45, 22], {text: 'init'});
wire('ready', 'defer'); wire('defer', 'init'); wire('init', 'controller');
box('title', 'comment', [15, 4, 620, 24], {text: 'SPECTRA / SESSION STEM COLLECTOR', fontsize: 16, textcolor: [0.8, 0.9, 1, 1], presentation: 1, presentation_rect: [15, 4, 620, 24]});
for (const [index, [name, label, initial]] of [['firsttrack', 'First track', 1], ['lasttrack', 'Last track', 8], ['firstscene', 'First scene', 1], ['lastscene', 'Last scene', 1]].entries()) {
    const left = 15 + index * 155;
    box(name + '-label', 'comment', [left, 28, 145, 16], {text: label, textcolor: [0.8, 0.9, 1, 1], presentation: 1, presentation_rect: [left, 28, 145, 16]});
    box(name, 'number', [left, 46, 140, 22], {minimum: 1, varname: name, presentation: 1, presentation_rect: [left, 46, 140, 22]});
    box(name + '-initial', 'newobj', [20 + index * 150, 540, 100, 22], {text: 'loadmess ' + initial});
    box(name + '-message', 'newobj', [20 + index * 150, 580, 145, 22], {text: 'prepend rangeparameter ' + name});
    box(name + '-defer', 'newobj', [20 + index * 150, 620, 65, 22], {text: 'deferlow'});
    wire(name + '-initial', name); wire(name, name + '-message'); wire(name + '-message', name + '-defer'); wire(name + '-defer', 'controller');
}
for (const [index, command] of ['scan', 'collect', 'previousreport', 'nextreport'].entries()) {
    const rect = index < 2 ? [15 + index * 190, 72, 180, 22] : [405 + (index - 2) * 115, 72, 105, 22];
    box(command, 'message', rect, {text: command === 'previousreport' ? 'Prev' : command === 'nextreport' ? 'Next' : command, presentation: 1, presentation_rect: rect, fontsize: 12});
    box(command + '-command', 'message', [20 + index * 140, 490, 130, 22], {text: command});
    box(command + '-defer', 'newobj', [20 + index * 100, 460, 65, 22], {text: 'deferlow'});
    wire(command, command + '-command'); wire(command + '-command', command + '-defer'); wire(command + '-defer', 'controller');
}
box('status', 'textedit', [15, 98, 620, 67], {text: 'Set a track/scene rectangle, then Scan.', readonly: 1, nosymquotes: 1, fontname: 'Menlo', fontsize: 10, presentation: 1, presentation_rect: [15, 98, 620, 67]});
wire('controller', 'status');
box('midiin', 'newobj', [20, 500, 60, 22], {text: 'midiin'});
box('midiout', 'newobj', [110, 500, 60, 22], {text: 'midiout'});
wire('midiin', 'midiout');
const patcher = {fileversion: 1, appversion: {major: 9, minor: 1, revision: 5, architecture: 'x64'}, classnamespace: 'box', rect: [80, 80, 650, 560], openinpresentation: 1, devicewidth: 650, bgcolor: [0.05, 0.06, 0.1, 1], boxes, lines, dependency_cache: [{name: 'controller.js', bootpath: '.', type: 'TEXT', implicit: 1}]};
function writeDevice(name, patch) {
    const json = Buffer.from(JSON.stringify({patcher: patch}, null, 2) + '\n');
    const header = Buffer.alloc(32);
    header.write('ampf'); header.writeUInt32LE(4, 4); header.write('mmmm', 8); header.write('meta', 12); header.writeUInt32LE(4, 16); header.write('ptch', 24); header.writeUInt32LE(json.length, 28);
    fs.writeFileSync(path.join(root, name + '.amxd'), Buffer.concat([header, json]));
    return json;
}
fs.writeFileSync(path.join(root, 'Session Stem Collector.maxpat'), writeDevice('Session Stem Collector', patcher));
const local = JSON.parse(JSON.stringify(patcher));
local.boxes.find(entry => entry.box.id === 'controller').box.text = 'js ' + JSON.stringify(path.join(root, 'controller.js'));
local.dependency_cache[0].bootpath = root;
writeDevice('Session Stem Collector Local', local);
console.log('Built portable and local Session Stem Collector devices (unfrozen).');
