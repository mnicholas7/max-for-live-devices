const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const core=require('../devices/spectra-cube/core.js');
const near=(actual,expected)=>assert(Math.abs(actual-expected)<1e-8,actual+' != '+expected);
const state=core.defaults();state.toneDepth=6;state.midDepth=6;core.mix(state).forEach((value,index)=>near(value,[1,0,0,0,1,0,0,0][index]));
state.point=[0,1,1];assert.deepEqual(core.mix(state),[1,6,6,-6,0,-6,-6,6]);
state.point=[1,0,0];assert.deepEqual(core.mix(state),[0,-6,-6,6,1,6,6,-6]);
for(let mode=0;mode<6;mode++)for(let step=0;step<=100;step++){const result=core.faders(step/100,mode,.6,state.customVolume);assert(result.every(value=>Number.isFinite(value)&&value>=0&&value<=1));if(mode===2)near(result[0]**2+result[1]**2,1);}
for(let mode=0;mode<5;mode++)for(let step=0;step<=100;step++){const value=core.shape(step/100,mode,.8,state.customTone);assert(value>=0&&value<=1);near(core.shape(.5,3,.8,state.customTone),.5);}
const loop=new core.Loop();loop.start([0,0,0]);loop.tick(1.4,0,false,[1,1,1]);loop.stop([1,1,1]);assert.equal(loop.take.length,1);near(loop.take.points.at(-1)[0],1);
loop.phase=0;near(loop.tick(.25,0,false,[0,0,0])[0],.25);
loop.phase=0;near(loop.tick(.25,-1,false,[0,0,0])[0],.5);
loop.phase=0;near(loop.tick(.25,1,false,[0,0,0])[0],.125);
const phase=loop.phase;loop.tick(0,2,true,[0,0,0]);near(loop.phase,phase);
loop.start([.5,.5,.5]);loop.tick(4.2,0,false,[.3,.2,.1]);loop.stop([.3,.2,.1]);assert.equal(loop.take.length,4);loop.undo();assert.equal(loop.take.length,1);
near(core.rawForDb([[0,-120],[.5,-6],[1,6]],0),.75);
const device=fs.readFileSync(path.resolve(__dirname,'../devices/spectra-cube/Spectra Cube.amxd'));assert.equal(device.toString('ascii',0,4),'ampf');assert.equal(device.toString('ascii',8,12),'mmmm');assert.equal(device.readUInt32LE(28),device.length-32);
const patch=JSON.parse(device.subarray(32)).patcher;const ids=new Set(patch.boxes.map(entry=>entry.box.id));for(const entry of patch.lines){assert(ids.has(entry.patchline.source[0]));assert(ids.has(entry.patchline.destination[0]));}
assert(patch.boxes.some(entry=>entry.box.text==='live.banks'));
const pushBank=patch.parameters.parameterbanks[0];
assert.equal(pushBank.name,'Cube');
assert.deepEqual(pushBank.parameters,['X blend','Y tilt','Z mids','-','-','-','-','-']);
for(const [index,id]of ['x','y','z'].entries()){
 const dial=patch.boxes.find(entry=>entry.box.id===id).box;
 assert.equal(dial.parameter_enable,1);
 assert.equal(dial.saved_attribute_attributes.valueof.parameter_longname,pushBank.parameters[index]);
 assert(patch.lines.some(entry=>entry.patchline.source[0]===id&&entry.patchline.destination[0]===id+'-message'));
 assert(patch.lines.some(entry=>entry.patchline.source[0]===id+'-message'&&entry.patchline.destination[0]==='controller'));
}
const luminance=color=>color.slice(0,3).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4).reduce((total,value,index)=>total+value*[.2126,.7152,.0722][index],0);
const contrast=(foreground,background)=>(luminance(foreground)+.05)/(luminance(background)+.05);
const menus=patch.boxes.map(entry=>entry.box).filter(control=>control.maxclass==='live.menu');
assert.equal(menus.length,4);
for(const menu of menus){assert(menu.fontsize>=12);assert.equal(menu.fontface,1);assert(menu.presentation_rect[3]>=22);assert(contrast(menu.textcolor,menu.activebgcolor)>=7);assert(contrast(menu.hlttextcolor,menu.hltcolor)>=7);}
for(const id of ['map0','map1','map2','map3','map4','map5','map6','map7','undo','capture','center','release']){
 assert(patch.lines.some(entry=>entry.patchline.source[0]===id&&entry.patchline.destination[0]===id+'-command'));
 const control=patch.boxes.find(entry=>entry.box.id===id).box;
 assert.equal(control.mode,0);assert.equal(control.parameter_enable,1);assert.equal(control.saved_attribute_attributes.valueof.parameter_invisible,0);
}
assert.equal(patch.boxes.filter(entry=>entry.box.text?.startsWith('live.remote~')).length,8);
assert(patch.lines.some(entry=>entry.patchline.source[0]==='midiin'&&entry.patchline.destination[0]==='midiout'));
const messages=[];
const context=vm.createContext({SpectraCube:core,include(){},notifyclients(){},outlet(...values){messages.push(values);}});
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../devices/spectra-cube/controller.js'),'utf8'),context);
context.record(1);assert(messages.some(values=>values[1]==='buttons'&&values[2]===1&&values[3]===0));
context.loop.tick(3.4,0,false,[.1,.2,.3]);context.record(0);assert.equal(context.loop.take.length,3);
assert(messages.some(values=>values[1]==='buttons'&&values[2]===0&&values[3]===1));
context.parameter('x',.2);context.parameter('toneCurve',3);
const saved=context.serializeState();context.center();context.setvalueof(saved);
near(context.state.point[0],.2);assert.equal(context.state.toneCurve,3);assert.equal(context.loop.take.length,3);assert.equal(context.loop.playing,false);
context.custom('tone',0,2,.75);assert.equal(context.state.toneCurve,4);near(context.state.customTone[2],.75);
context.ready=true;context.state.mappings[0]={base:0,table:[[0,-120],[.5,-6],[1,6]]};context.point(.5,.5,.5);
const remoteValue=messages.filter(values=>values[0]===0&&values[1]===0).at(-1);near(remoteValue[2],.75);
context.release();assert(context.state.mappings.every(value=>value===null));assert.equal(context.loop.playing,false);
const targets={
 10:{path:'live_set tracks 0 mixer_device volume',name:'Track Volume',quantized:0},
 11:{path:'live_set tracks 1 mixer_device volume',name:'Track Volume',quantized:0},
 20:{path:'live_set tracks 4 devices 0 parameters 3',name:'Map A VOL',quantized:1},
 21:{path:'live_set tracks 0 devices 0 parameters 0',name:'Device On',quantized:1}
};
context.LiveAPI=function(callback,target){
 this.id=Number(String(target).replace('id ',''))||99;
 const description=targets[this.id];
 this.type=description?'DeviceParameter':'Device';
 this.path='"'+(description?description.path:target==='this_device'?'live_set tracks 4 devices 0':String(target))+'"';
 this.get=name=>name==='name'?description.name:name==='is_quantized'?description.quantized:name==='value'?.75:name==='min'?0:1;
 this.call=(name,raw)=>(-120+raw*126)+' dB';
};
context.Task=function(callback){this.schedule=()=>{this.scheduled=callback;};this.cancel=()=>{this.scheduled=null;};};
context.ready=true;
context.map(0);assert.equal(context.pendingMap,0);assert.equal(context.state.mappings[0],null);
context.selectionChanged(['selected_parameter','id',20]);assert.equal(context.mappingTask,null);
context.selectionChanged(['selected_parameter','id',0]);assert.equal(context.pendingMap,0);
context.selectionChanged(['selected_parameter','id',10]);assert.equal(context.state.mappings[0],null);
context.mappingTask.scheduled();assert.equal(context.state.mappings[0].id,10);assert.equal(context.pendingMap,-1);
context.map(4);context.selectionChanged(['selected_parameter','id',11]);context.mappingTask.scheduled();assert.equal(context.state.mappings[4].id,11);
context.map(1);context.selectionChanged(['selected_parameter','id',10]);context.mappingTask.scheduled();assert.equal(context.pendingMap,1);assert.equal(context.state.mappings[1],null);
context.selectionChanged(['selected_parameter','id',21]);context.mappingTask.scheduled();assert.equal(context.pendingMap,1);assert.equal(context.state.mappings[1],null);
context.map(1);assert.equal(context.pendingMap,-1);
context.map(2);context.selectionChanged(['selected_parameter','id',11]);context.release();assert.equal(context.pendingMap,-1);assert.equal(context.mappingTask.scheduled,null);
const autoTargets={};
for(let side=0;side<3;side++){
 const trackId=100+side,eqId=200+side,volumeId=300+side;
 autoTargets[trackId]={type:'Track',path:'live_set tracks '+side,name:'Track '+side,has_audio_output:1,devices:['id',eqId],mixer_device:['id',500+side]};
 autoTargets[500+side]={type:'MixerDevice',path:'live_set tracks '+side+' mixer_device',volume:['id',volumeId]};
 autoTargets[eqId]={type:'Device',path:'live_set tracks '+side+' devices 0',class_name:'FilterEQ3',name:'Renamed EQ',parameters:[]};
 autoTargets[volumeId]={type:'DeviceParameter',path:'live_set tracks '+side+' mixer_device volume',name:'Track Volume',value:.75,min:0,max:1,is_quantized:0};
 for(let lane=0;lane<3;lane++){const gainId=400+side*10+lane;autoTargets[eqId].parameters.push('id',gainId);autoTargets[gainId]={type:'DeviceParameter',path:'live_set tracks '+side+' devices 0 parameters '+lane,name:'Renamed Gain',original_name:['GainLo','GainMid','GainHi'][lane],value:.75,min:0,max:1,is_quantized:0};}
 for(const [lane,name]of ['FreqLo','FreqHi','LowOn','MidOn','HighOn','Slope','Device On'].entries()){const id=600+side*10+lane;autoTargets[eqId].parameters.push('id',id);autoTargets[id]={type:'DeviceParameter',path:'live_set tracks '+side+' devices 0 parameters '+(lane+3),original_name:name,value:lane<2?1000:1,min:lane<2?50:0,max:lane<2?10000:1,is_quantized:lane<2?0:1};}
}
context.LiveAPI=function(callback,target){
 const id=String(target).startsWith('id ')?Number(String(target).slice(3)):Number(Object.keys(autoTargets).find(id=>autoTargets[id].path===target));
 const entry=autoTargets[id];if(!entry)throw new Error('Missing mock '+target);
 this.id=id;Object.defineProperty(this,'path',{get:()=>'"'+entry.path+'"'});this.type=entry.type;this.get=name=>entry[name];this.call=(name,raw)=>(-120+raw*126)+' dB';this.set=(name,value)=>{entry[name]=value;};
};
context.song={get:name=>name==='tracks'?['id',100,'id',101,'id',102]:[]};
context.refreshtracks();assert.deepEqual(Array.from(context.trackIds),[100,101,102]);
context.track(0,1);assert.deepEqual(Array.from(context.state.mappings.slice(0,4),mapping=>mapping.id),[300,400,401,402]);
context.track(1,2);assert.deepEqual(Array.from(context.state.mappings.slice(4),mapping=>mapping.id),[301,410,411,412]);
const beforeAuto=context.serializeState();context.track(1,1);assert.equal(context.serializeState(),beforeAuto);
autoTargets[102].devices=[];context.track(0,3);assert.equal(context.serializeState(),beforeAuto);
autoTargets[102].devices=['id',200,'id',201];context.track(0,3);assert.equal(context.serializeState(),beforeAuto);
autoTargets[300].value=.1;context.track(0,1);assert.equal(context.serializeState(),beforeAuto);
assert.equal(context.state.mappings[0].path,'live_set tracks 0 mixer_device volume');
context.restoreMappings();assert.equal(context.serializeState(),beforeAuto);
context.state.mappings[0].path='"'+context.state.mappings[0].path+'"';context.restoreMappings();assert.equal(context.serializeState(),beforeAuto);
const mixerChild=autoTargets[101].mixer_device;autoTargets[101].mixer_device=['id',0];context.track(1,2);assert.equal(context.serializeState(),beforeAuto);autoTargets[101].mixer_device=mixerChild;
context.mirror();
let mirrored=JSON.parse(messages.filter(values=>values[1]==='eqview').at(-1)[2]);
assert.equal(mirrored.strips[0].values.length,11);near(mirrored.strips[0].values[0].raw,120/126);assert.equal(mirrored.strips[0].values[4].raw,1000);
autoTargets[400].value=.9;context.mirror();mirrored=JSON.parse(messages.filter(values=>values[1]==='eqview').at(-1)[2]);assert.equal(mirrored.strips[0].values[1].raw,.9);
context.eqedit(0,4,.5);near(autoTargets[600].value,5025);
context.eqedit(0,6,0);assert.equal(autoTargets[602].value,0);
context.eqedit(0,9,0);assert.equal(autoTargets[605].value,0);
context.point(.5,.5,.5);const trimOffset=core.mix(context.state)[1];context.eqedit(0,1,.95);near(context.state.mappings[1].base,-.3-trimOffset);near(autoTargets[400].value,.9);
const startManual=messages.length;context.manual(1);assert.equal(context.state.manual,1);assert.equal(messages.slice(startManual).filter(values=>values[0]===1&&values[3]===0).length,8);
const startManualPoint=messages.length;context.point(.7,.8,.9);assert(!messages.slice(startManualPoint).some(values=>values[0]===0));
context.eqedit(0,1,.8);near(autoTargets[400].value,.8);context.mirror();mirrored=JSON.parse(messages.filter(values=>values[1]==='eqview').at(-1)[2]);assert.equal(mirrored.strips[0].values[1].raw,.8);
context.manual(0);assert.equal(context.state.manual,0);near(context.state.mappings[1].base,-19.2);
const savedPath=autoTargets[600].path;autoTargets[600].path='live_set tracks 7 devices 0 parameters 3';context.eqedit(0,4,1);near(autoTargets[600].value,5025);autoTargets[600].path=savedPath;
const beforeRefresh=context.serializeState(),nativeOutlet=context.outlet;
context.outlet=(...values)=>{messages.push(values);if(values[1]==='trackmenu'&&values[2]==='clear'){context.track(0,0);context.track(1,0);}if(values[1]==='trackchoice')context.track(values[2],0);};
context.refreshtracks();assert.equal(context.serializeState(),beforeRefresh);assert.equal(context.menuBusy,false);
context.outlet=nativeOutlet;const beforeSelectMessages=messages.length;context.track(0,1);assert(!messages.slice(beforeSelectMessages).some(values=>values[1]==='trackmenu'));
context.state.djSweep=0;context.state.toneCurve=0;context.state.midCurve=0;context.state.toneDepth=3;context.state.midDepth=3;
for(const index of [1,2,3,5,6,7])context.state.mappings[index].base=0;
const expectedIds=Array.from(context.state.mappings,mapping=>mapping.id);
const gainOutput=index=>messages.filter(values=>values[0]===0&&values[1]===index).at(-1)[2];
context.point(.5,1,.5);
for(const [index,db]of [[1,3],[3,-3],[5,-3],[7,3],[2,0],[6,0]])near(gainOutput(index),core.rawForDb(context.state.mappings[index].table,db));
context.point(.5,.5,1);
for(const [index,db]of [[2,3],[6,-3],[1,0],[3,0],[5,0],[7,0]])near(gainOutput(index),core.rawForDb(context.state.mappings[index].table,db));
for(let frame=0;frame<60;frame++){context.point(.5,frame%2,1-frame%2);context.mirror();assert.deepEqual(Array.from(context.state.mappings,mapping=>mapping.id),expectedIds);}
assert.equal(patch.boxes.find(entry=>entry.box.id==='state').box.saved_attribute_attributes.valueof.parameter_invisible,1);
context.resetunity();assert.equal(context.state.djSweep,1);assert.equal(context.state.manual,0);assert.equal(context.loop.playing,false);
for(const mapping of context.state.mappings){near(mapping.base,0);near(autoTargets[mapping.id].value,120/126);}
for(const id of [602,603,604,612,613,614])assert.equal(autoTargets[id].value,1);
assert.deepEqual(Array.from(context.state.point),[.5,.5,.5]);
context.point(.5,1,1);
for(const index of [1,2,7])near(gainOutput(index),1);
for(const index of [3,5,6])near(gainOutput(index),0);
context.point(.5,0,0);
for(const index of [1,2,7])near(gainOutput(index),0);
for(const index of [3,5,6])near(gainOutput(index),1);
context.point(.5,.5,.5);for(const index of [1,2,3,5,6,7])near(gainOutput(index),120/126);
context.parameter('toneDepth',.5);near(context.state.toneDepth,6);context.point(.5,0,.5);near(gainOutput(1),60/126);
context.eqedit(0,1,.4);near(gainOutput(1),.4);
context.manual(1);context.resetunity();assert.equal(context.state.manual,0);
context.record(1);const beforeRecordReset=context.serializeState();context.resetunity();assert.equal(context.serializeState(),beforeRecordReset);context.track(0,3);assert.equal(context.serializeState(),beforeRecordReset);context.record(0);
const stalePath=autoTargets[400].path;autoTargets[400].path='live_set tracks 8 devices 0 parameters 0';const beforeStaleReset=context.serializeState();context.resetunity();assert.equal(context.serializeState(),beforeStaleReset);autoTargets[400].path=stalePath;
const legacy=JSON.parse(context.serializeState());delete legacy.djSweep;context.setvalueof(JSON.stringify(legacy));assert.equal(context.state.djSweep,0);
const nonlinear={base:0,table:[[0,-120],[.3,-24],[.7,0],[1,6]]};near(core.eqRaw(nonlinear,-12),0);near(core.eqRaw(nonlinear,12),1);near(core.eqRaw(nonlinear,-6),.35);near(core.eqRaw(nonlinear,0),.7);
assert(patch.lines.some(entry=>entry.patchline.source[0]==='resetunity'&&entry.patchline.destination[0]==='resetunity-command'));
context.track(0,0);assert(context.state.mappings.slice(0,4).every(mapping=>mapping===null));assert(context.state.mappings.slice(4).every(mapping=>mapping!==null));
assert.equal(context.state.eqTargets[0],null);
assert(patch.lines.some(entry=>entry.patchline.source[0]==='eq-mirror'&&entry.patchline.destination[0]==='controller'));
assert(patch.lines.some(entry=>entry.patchline.source[0]==='set-manual'&&entry.patchline.destination[0]==='manual'));
const uiMessages=[],uiDraws=[];
const graphics=new Proxy({init(){},redraw(){}},{get(target,key){return key in target?target[key]:(...values)=>uiDraws.push([key,...values]);}});
const uiContext=vm.createContext({include(){},box:{rect:[0,0,408,169]},mgraphics:graphics,outlet(...values){uiMessages.push(values);}});
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../devices/spectra-cube/eq-ui.js'),'utf8'),uiContext);
uiContext.eqview(JSON.stringify(mirrored));uiContext.paint();assert(uiDraws.some(values=>values[0]==='show_text'&&values[1]==='LOW ON'));
uiContext.onclick(21,57);assert.deepEqual(uiMessages.at(-1),[0,'eqedit',0,0,.5]);
uiContext.ondrag(21,35,1);assert.deepEqual(uiMessages.at(-1),[0,'eqedit',0,0,1]);
uiContext.ondrag(21,35,0);assert.equal(uiContext.active,null);
uiContext.onclick(61,105);assert.deepEqual(uiMessages.at(-1),[0,'eqedit',0,4,1/72]);
uiContext.onclick(213,140);assert.deepEqual(uiMessages.at(-1),[0,'eqedit',1,6,0]);assert.equal(uiContext.active,null);
uiContext.box.rect=[0,0,408,144];uiContext.onclick(21,57*144/169);assert.deepEqual(uiMessages.at(-1),[0,'eqedit',0,0,.5]);uiContext.paint();assert(uiDraws.some(values=>values[0]==='scale'&&values[2]===144/169));
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../devices/spectra-cube/layout.js'),'utf8'),context);
const layoutMessages=[];context.patcher={message(...values){layoutMessages.push(values);}};
const soundState=()=>JSON.stringify({...JSON.parse(context.serializeState()),uiSection:0});
const beforeSections=soundState();
for(let panel=0;panel<4;panel++){
 context.state.uiSection=4;layoutMessages.length=0;context.section(panel);assert.equal(context.state.uiSection,panel);assert.equal(soundState(),beforeSections);
 for(const control of context.SpectraLayout.controls){assert(layoutMessages.some(values=>values[2]===control.id&&values[3]==='hidden'&&values[4]===(control.section===panel?0:1)));assert(control.rect[0]>=650);assert(control.rect[0]+control.rect[2]<=1070);assert(control.rect[1]>=24);assert(control.rect[1]+control.rect[3]<=169);}
 context.section(panel);assert.equal(context.state.uiSection,4);assert.equal(soundState(),beforeSections);
}
context.section(0);const sectionSave=context.serializeState();context.section(1);context.setvalueof(sectionSave);assert.equal(context.state.uiSection,0);
assert.equal(patch.devicewidth,1070);
assert.deepEqual(patch.boxes.find(entry=>entry.box.id==='eq-mirror').box.presentation_rect,[650,24,408,144]);
for(const entry of patch.boxes.filter(entry=>entry.box.presentation)){const rect=entry.box.presentation_rect;assert(rect[0]>=0&&rect[1]>=0&&rect[0]+rect[2]<=1070&&rect[1]+rect[3]<=169,entry.box.id+' exceeds device bounds');}
assert(patch.lines.some(entry=>entry.patchline.source[0]==='track-0'&&entry.patchline.destination[0]==='track-0-command'));
assert(patch.lines.some(entry=>entry.patchline.source[0]==='track-1'&&entry.patchline.destination[0]==='track-1-command'));
assert(patch.lines.some(entry=>entry.patchline.source[0]==='button-state'&&entry.patchline.destination[0]==='set-loop'));
console.log('PASS: mixer math, mapping, EQ readbacks and edits, gesture loops, compact section layout/persistence, scaled pointer input, ownership and patch wiring');
