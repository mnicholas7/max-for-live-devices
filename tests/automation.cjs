const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../devices/spectra-cube'),core=require(path.join(root,'core.js'));
const objects={1:{type:'Song',path:'live_set',tracks:['id',10,'id',20,'id',30],return_tracks:[]}};
for(const [side,id]of [10,20,30].entries()){
 objects[id]={type:'Track',path:'live_set tracks '+side,name:'Track '+side,has_audio_output:1,mixer_device:['id',id+1],devices:side<2?['id',id+3]:[]};
 objects[id+1]={type:'MixerDevice',path:objects[id].path+' mixer_device',volume:['id',id+2]};
 objects[id+2]={type:'DeviceParameter',path:objects[id+1].path+' volume',name:'Track Volume',value:.8,min:0,max:1,is_quantized:0,is_enabled:1,volume:true};
 if(side<2){objects[id+3]={type:'Device',path:objects[id].path+' devices 0',class_name:'FilterEQ3',parameters:[]};
  for(let lane=0;lane<3;lane++){const pid=100+side*10+lane;objects[id+3].parameters.push('id',pid);objects[pid]={type:'DeviceParameter',path:objects[id+3].path+' parameters '+lane,name:['GainLo','GainMid','GainHi'][lane],original_name:['GainLo','GainMid','GainHi'][lane],value:.5,min:0,max:1,is_quantized:0,is_enabled:1};}
 }
}
let writes=0,notifications=0,schedules=0;
function make(){const messages=[];const c=vm.createContext({SpectraCube:core,include(){},notifyclients(){notifications++;},arrayfromargs(a){return Array.from(a);},outlet(...a){messages.push(a);},Task:function(){this.schedule=()=>{schedules++;};this.cancel=()=>{};},LiveAPI:function(callback,location){
 const id=location.startsWith('id ')?Number(location.slice(3)):Number(Object.keys(objects).find(id=>objects[id].path===location));const o=objects[id];this.id=o?id:0;this.type=o?.type;this.path=o?.path;
 this.get=k=>o[k];this.call=(method,value)=>{assert.equal(method,'str_for_value');return (o.volume?-120+132*value:-12+24*value)+' dB';};this.set=()=>{writes++;throw new Error('Unexpected direct parameter write');};
 }});vm.runInContext(fs.readFileSync(path.join(root,'automation-controller.js'),'utf8'),c);return {c,messages};}
const {c,messages}=make();c.init();assert(c.ready);assert.equal(schedules,0);
c.track(0,1);c.track(1,2);assert.equal(writes,0);assert.equal(c.state.mappings[0].base,0);assert.equal(c.state.mappings[4].base,0);
assert.equal(c.state.volumeCurve,2,'New Cube must default to Equal power');
let gains=messages.filter(m=>m[0]===0);const centerRaw=(120+20*Math.log10(Math.SQRT1_2))/132;assert(Math.abs(gains.findLast(m=>m[1]===0)[2]-centerRaw)<1e-6);assert(Math.abs(gains.findLast(m=>m[1]===4)[2]-centerRaw)<1e-6);assert(Math.abs(gains.findLast(m=>m[1]===1)[2]-.5)<1e-6);
const saved=JSON.stringify(Array.from(c.getvalueof())),beforeNotifications=notifications;
messages.length=0;c.parameter('x',0);c.parameter('y',1);c.parameter('z',0);
gains=messages.filter(m=>m[0]===0);assert.equal(gains.findLast(m=>m[1]===4)[2],0);assert.equal(gains.findLast(m=>m[1]===1)[2],1);assert.equal(gains.findLast(m=>m[1]===2)[2],0);
assert.equal(JSON.stringify(Array.from(c.getvalueof())),saved,'Playback must not rewrite persisted mappings');assert.equal(notifications,beforeNotifications,'Playback must not produce pattr notifications');
for(const [axis,value,lanes]of [['x',.6,[0,4]],['y',.6,[1,3,5,7]],['z',.7,[2,6]]]){
 messages.length=0;c.parameter(axis,value);
 assert.deepEqual(messages.filter(m=>m[0]===0).map(m=>m[1]),lanes,'Only dependent gains should update');
 messages.length=0;c.parameter(axis,value);assert.equal(messages.length,0,'Repeated automation values must do no work');
}
assert.equal(schedules,0,'Automation must not start controller timers');
let redraws=0,uiSchedules=0,delay=0,cancels=0;
const uiContext=vm.createContext({SpectraCube:core,include(){},arrayfromargs(a){return Array.from(a);},mgraphics:{init(){},redraw(){redraws++;}},Task:function(fn){this.schedule=ms=>{uiSchedules++;delay=ms;};this.cancel=()=>{cancels++;};}});
vm.runInContext(fs.readFileSync(path.join(root,'automation-ui.js'),'utf8'),uiContext);
for(let n=0;n<100;n++)uiContext.axes(n/100,.2,.3);
assert.equal(uiSchedules,1,'Burst of axis changes must coalesce into one display update');assert.equal(delay,50);assert.equal(redraws,0);
uiContext.flushRedraw();assert.equal(redraws,1);assert.equal(uiContext.point[0],.99,'Trailing redraw uses the latest point');
uiContext.axes(.99,.2,.3);assert.equal(uiSchedules,1,'Identical points must not schedule redraws');
uiContext.axes(.1,.2,.3);assert.equal(uiSchedules,2);uiContext.freebang();assert.equal(cancels,1);
for(const mode of [5,6,7]){
 assert.equal(core.shape(.5,mode,.5),.5,'Added EQ curves retain a neutral midpoint');
 let previous=-1;for(let n=0;n<=100;n++){const v=core.shape(n/100,mode,.5);assert(v>=previous&&v>=0&&v<=1);previous=v;}
}
assert.equal(core.shape(.55,6,.5),.5,'Center hold has a neutral zone');
assert(core.shape(.75,5,.5)<.75,'Gentle sweep reduces EQ range');assert(core.shape(.6,7,.5)>.6,'Fast center increases response near center');
const curveNotifications=notifications;c.parameter('toneCurve',5);c.parameter('toneShape',.8);assert.equal(c.state.toneCurve,5);assert.equal(c.state.toneShape,.8);assert.equal(notifications,curveNotifications,'Native curve automation must not notify saved-state clients');
c.custom('tone',0,2,.6);assert.equal(c.state.toneCurve,4);assert.equal(c.state.customTone[2],.6);const restoredCustom=make();restoredCustom.c.setvalueof(Array.from(c.getvalueof()));assert.equal(restoredCustom.c.state.customTone[2],.6);
const originalBase=c.state.mappings[0].base;c.track(0,1);assert.equal(c.state.mappings[0].base,originalBase,'Reselecting an attached track must not recapture attenuated gains');
c.track(1,1);assert.equal(c.bindings[1].trackName,'Track 1','Reject duplicate targets without losing old mappings');
const legacy=JSON.parse(String.fromCharCode(...c.getvalueof()));legacy.bindings[0].mappings[0].base=-18;legacy.bindings[1].mappings[0].base=-6;
const reopened=make();reopened.c.parameter('x',.23);reopened.c.parameter('y',.77);reopened.c.setvalueof(JSON.stringify(legacy));reopened.c.init();
assert.equal(reopened.c.state.point[0],.23);assert.equal(reopened.c.state.point[1],.77);assert.equal(reopened.c.state.mappings[0].base,0);assert.equal(reopened.c.state.mappings[4].base,0);
assert(reopened.messages.some(m=>m[0]===1&&m[3]===12));
reopened.messages.length=0;reopened.c.parameter('x',0);assert(Math.abs(reopened.messages.findLast(m=>m[0]===0&&m[1]===0)[2]-120/132)<1e-6,'A full-volume endpoint must be 0 dB');
reopened.c.parameter('x',1);assert(Math.abs(reopened.messages.findLast(m=>m[0]===0&&m[1]===4)[2]-120/132)<1e-6,'B full-volume endpoint must be 0 dB');
c.track(1,3);assert(c.state.mappings[4]);assert.equal(c.state.mappings[5],null,'A volume-only track must work without EQ');
const snapshot=c.state.point.slice();c.parameter('x',NaN);assert.deepEqual(c.state.point,snapshot);c.parameter('x',-10);assert.equal(c.state.point[0],0);c.parameter('x',10);assert.equal(c.state.point[0],1);
const d=fs.readFileSync(path.resolve(__dirname,'../devices/spectra-cube-automation/Spectra Cube Automation.amxd'));
assert.equal(d.readUInt32LE(28),d.length-32);const p=JSON.parse(d.subarray(32)).patcher;
assert.deepEqual(p.parameters.parameterbanks[0].parameters,['Volume shape','X blend','Tone shape','Y tilt','Mid shape','Z mids','Volume curve','-']);
assert.equal(Object.keys(p.parameters.parameterbanks).length,1,'All controls must stay on the front bank');
assert.equal(p.boxes.find(e=>e.box.id==='bank-buttons').box.text,'edit 0 - @buttons 1 "Volume curve" 2 "Low / high curve" 4 "Mid curve"');
assert(p.lines.some(e=>e.patchline.source[0]==='defer'&&e.patchline.destination[0]==='bank-buttons'));
assert(p.lines.some(e=>e.patchline.source[0]==='bank-buttons'&&e.patchline.destination[0]==='banks'));
for(const id of ['volumeCurve','toneCurve','midCurve'])assert.equal(p.boxes.find(e=>e.box.id===id).box.saved_attribute_attributes.valueof.parameter_button_mode,'Cycle');
assert(!p.boxes.some(e=>e.box.id.startsWith('push-track')||e.box.id==='push-refresh'),'Track selectors stay off Push');
for(const id of ['toneCurve','midCurve']){const value=p.boxes.find(e=>e.box.id===id).box.saved_attribute_attributes.valueof;assert.equal(value.parameter_initial[0],0);assert.deepEqual(value.parameter_enum,['L','I','O','S','C','G','H','F']);assert(p.lines.some(e=>e.patchline.source[0]===id+'-message'&&e.patchline.destination[0]==='controller'));}
for(const [index,id]of ['volumeCurve','toneCurve','midCurve'].entries()){const attr=p.boxes.find(e=>e.box.id===id).box.saved_attribute_attributes.valueof;assert.equal(attr.parameter_shortname,['X curve','Y curve','Z curve'][index]);assert(attr.parameter_enum.every(text=>text.length===1),'Push expanded option lists must use one-character codes');}
const forbidden=['record','loop','manual','release','directwrite','capture','stretch'];assert(!p.boxes.some(e=>forbidden.includes(e.box.id)));
const ids=new Set(p.boxes.map(e=>e.box.id));for(const e of p.lines){assert(ids.has(e.patchline.source[0]));assert(ids.has(e.patchline.destination[0]));}
for(const [i,id]of ['x','y','z'].entries()){
 assert(p.lines.some(e=>e.patchline.source[0]==='gesture-axes'&&e.patchline.source[1]===i&&e.patchline.destination[0]===id));
 assert(p.lines.some(e=>e.patchline.source[0]===id&&e.patchline.destination[0]===id+'-message'));
 assert(p.lines.some(e=>e.patchline.source[0]===id+'-message'&&e.patchline.destination[0]==='controller'));
 assert.equal(p.boxes.find(e=>e.box.id===id).box.saved_attribute_attributes.valueof.parameter_invisible,0);
}
console.log('PASS automation controller: shared unity volume endpoints, preserved EQ baselines, no target writes, axis playback, independent mapping persistence/reopen, duplicate guards, volume-only tracks, Push bank and gesture wiring.');
