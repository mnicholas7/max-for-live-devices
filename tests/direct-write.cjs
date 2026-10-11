const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.resolve(__dirname, '../devices/spectra-cube'), messages = [], writes = [];
let schedules = 0, notifications = 0, reads = 0;
const context = vm.createContext({SpectraCube: require(path.join(root, 'core.js')), Task: function() { this.schedule = delay => { assert.equal(delay, 100); schedules++; }; this.cancel = () => {}; }, include() {}, notifyclients() { notifications++; }, outlet(...values) { messages.push(values); }});
vm.runInContext(fs.readFileSync(path.join(root, 'controller.js'), 'utf8'), context);
context.ready = true;
for (let index = 0; index < 8; index++) {
    const location = 'live_set tracks ' + index + ' mixer_device volume';
    context.state.mappings[index] = {id: index + 10, path: location, base: 0, table: [[0, -120], [1, 12]]};
    context.apis[index] = {id: index + 10, type: 'DeviceParameter', path: location, get() { reads++; return [1]; }, set(property, value) { writes.push([index, value]); }};
}
context.directwrite(1); messages.length = 0; context.touch(1);
for (let index = 0; index < 500; index++) context.point(.2, .7, .8);
assert.equal(schedules, 1); assert.equal(notifications, 0); assert.equal(reads, 0); assert.equal(writes.length, 0);
context.flushwrites(); assert.equal(writes.length, 8);
context.touch(0); assert.equal(notifications, 1);
context.emit(); context.flushwrites(); assert.equal(writes.length, 8); assert.equal(reads, 8);
for (let index = 0; index < 1000; index++) context.tick();
assert.equal(reads, 8); assert.equal(writes.length, 8);
let cancelled = 0;
context.task = {cancel() { cancelled++; }, repeat() {}};
context.selectionObserver = {property: 'selected_parameter'};
context.mirror = () => {};
context.point(.8,.1,.2); context.manual(1); context.flushwrites();
assert.equal(writes.length, 8); assert.equal(cancelled, 1); assert.equal(context.selectionObserver.property, '');
for (let index = 0; index < 1000; index++) context.tick();
assert.equal(reads, 8); assert.equal(writes.length, 8);
context.directwrite(0); assert.ok(!messages.some(value => value[0] === 1 && value[3] > 0));
console.log('PASS event-driven direct control: bounded writes, no idle polling, no duplicate reads/writes, deferred persistence, MANUAL cancels scheduler/observer and pending writes');
