(function(root){
function clamp(value,min,max){return Math.max(min,Math.min(max,value));}
function copy(value){return JSON.parse(JSON.stringify(value));}
function interpolate(points,phase){
 var before=points[0],after=points[points.length-1];
 for(var index=1;index<points.length;index++){if(points[index][0]>=phase){before=points[index-1];after=points[index];break;}}
 var amount=after[0]===before[0]?0:clamp((phase-before[0])/(after[0]-before[0]),0,1);
 return [before[1]+(after[1]-before[1])*amount,before[2]+(after[2]-before[2])*amount,before[3]+(after[3]-before[3])*amount];
}
function tableValue(table,position){var scaled=clamp(position,0,1)*(table.length-1),index=Math.floor(scaled);return table[index]+((table[index+1]===undefined?table[index]:table[index+1])-table[index])*(scaled-index);}
function shape(position,mode,amount,custom){
 position=clamp(position,0,1);amount=clamp(amount,0,1);
 if(mode===4)return tableValue(custom,position);
 if(mode===1)return Math.pow(position,1+amount*4);
 if(mode===2)return 1-Math.pow(1-position,1+amount*4);
 if(mode===3){var exponent=1+amount*8,left=Math.pow(position,exponent),right=Math.pow(1-position,exponent);return left/(left+right);}
 return position;
}
function faders(position,mode,amount,custom){
 position=clamp(position,0,1);amount=clamp(amount,0,1);
 if(mode===5)return [tableValue(custom[0],position),tableValue(custom[1],position)];
 if(mode===0)return [Math.min(1,2*(1-position)),Math.min(1,2*position)];
 if(mode===2)return [Math.cos(position*Math.PI/2),Math.sin(position*Math.PI/2)];
 if(mode===3){var exponent=.2+amount*.8;return [Math.pow(1-position,exponent),Math.pow(position,exponent)];}
 if(mode===4){var width=.5*(1-amount)+.01,blend=clamp((position-.5)/(2*width)+.5,0,1);return [1-blend,blend];}
 var shaped=shape(position,1,amount,[0,1]);return [1-shaped,shaped];
}
function defaults(){return {point:[.5,.5,.5],volumeCurve:0,volumeShape:0,toneCurve:0,toneShape:.5,midCurve:0,midShape:.5,toneDepth:12,midDepth:12,djSweep:1,stretch:0,sync:1,manual:0,uiSection:0,eqTargets:[null,null],customVolume:[[1,1,.5,0,0],[0,0,.5,1,1]],customTone:[0,.25,.5,.75,1],customMid:[0,.25,.5,.75,1],take:null,mappings:[null,null,null,null,null,null,null,null]};}
function mix(state){
 var gain=faders(state.point[0],state.volumeCurve,state.volumeShape,state.customVolume),tone=(shape(state.point[1],state.toneCurve,state.toneShape,state.customTone)-.5)*2*state.toneDepth,mid=(shape(state.point[2],state.midCurve,state.midShape,state.customMid)-.5)*2*state.midDepth;
 return [gain[0],tone,mid,-tone,gain[1],-tone,-mid,tone];
}
function Loop(){this.take=null;this.previous=null;this.recording=false;this.playing=false;this.elapsed=0;this.phase=0;this.points=[];this.length=1;}
Loop.prototype.start=function(point){this.previous=copy(this.take);this.recording=true;this.playing=false;this.elapsed=0;this.points=[[0].concat(point)];};
Loop.prototype.tick=function(delta,stretch,sync,point){
 if(!isFinite(delta)||delta<0)return null;
 if(this.recording){this.elapsed+=delta;var last=this.points[this.points.length-1];if(this.points.length<36000&&this.elapsed>last[0]+1/96)this.points.push([this.elapsed].concat(point));return null;}
 if(!this.playing||!this.take)return null;
 var factor=Math.pow(2,clamp(stretch,-2,2));if(sync)factor=Math.pow(2,Math.round(clamp(stretch,-2,2)));
 this.phase=(this.phase+delta/(this.take.length*factor))%1;
 return interpolate(this.take.points,this.phase*this.take.length);
};
Loop.prototype.stop=function(point){
 if(!this.recording)return false;
 this.recording=false;var measured=Math.max(1/96,this.elapsed),length=Math.max(1,Math.round(measured)),points=this.points.map(function(entry){return [entry[0]*length/measured,entry[1],entry[2],entry[3]];});
 points.push([length].concat(point));this.take={length:length,points:points};this.phase=0;this.playing=true;return true;
};
Loop.prototype.undo=function(){this.take=copy(this.previous);this.previous=null;this.recording=false;this.playing=!!this.take;this.phase=0;};
function rawForDb(table,db){
 if(db<=table[0][1])return table[0][0];
 for(var index=1;index<table.length;index++){if(table[index][1]>=db){var before=table[index-1],after=table[index],amount=(db-before[1])/(after[1]-before[1]);return before[0]+amount*(after[0]-before[0]);}}
 return table[table.length-1][0];
}
function eqRaw(mapping,amount){var blend=clamp(amount/12,-1,1),base=rawForDb(mapping.table,mapping.base),edge=mapping.table[blend<0?0:mapping.table.length-1][0];return base+(edge-base)*Math.abs(blend);}
var api={clamp:clamp,copy:copy,shape:shape,faders:faders,defaults:defaults,mix:mix,Loop:Loop,rawForDb:rawForDb,eqRaw:eqRaw,interpolate:interpolate};
if(typeof module!=='undefined')module.exports=api;else root.SpectraCube=api;
})(this);

var SpectraLayout={"names":["EQ","Curves","Mapping","Loop"],"controls":[{"id":"eq-mirror","rect":[650,24,408,144],"section":0},{"id":"volumeCurve","rect":[650,42,128,22],"section":1},{"id":"volumeCurve-label","rect":[650,26,148,16],"section":1},{"id":"toneCurve","rect":[786,42,128,22],"section":1},{"id":"toneCurve-label","rect":[786,26,148,16],"section":1},{"id":"midCurve","rect":[922,42,128,22],"section":1},{"id":"midCurve-label","rect":[922,26,136,16],"section":1},{"id":"volumeShape","rect":[656,84,50,42],"section":1},{"id":"volumeShape-label","rect":[656,68,70,16],"section":1},{"id":"toneShape","rect":[790,84,50,42],"section":1},{"id":"toneShape-label","rect":[790,68,70,16],"section":1},{"id":"midShape","rect":[926,84,50,42],"section":1},{"id":"midShape-label","rect":[926,68,70,16],"section":1},{"id":"toneDepth","rect":[854,84,50,42],"section":1},{"id":"toneDepth-label","rect":[854,68,70,16],"section":1},{"id":"midDepth","rect":[990,84,50,42],"section":1},{"id":"midDepth-label","rect":[990,68,68,16],"section":1},{"id":"map0","rect":[650,38,200,22],"section":2},{"id":"map1","rect":[858,38,200,22],"section":2},{"id":"map2","rect":[650,63,200,22],"section":2},{"id":"map3","rect":[858,63,200,22],"section":2},{"id":"map4","rect":[650,88,200,22],"section":2},{"id":"map5","rect":[858,88,200,22],"section":2},{"id":"map6","rect":[650,113,200,22],"section":2},{"id":"map7","rect":[858,113,200,22],"section":2},{"id":"resetunity","rect":[650,143,200,22],"section":2},{"id":"refreshtracks","rect":[858,143,200,22],"section":2},{"id":"x","rect":[653,62,50,42],"section":3},{"id":"x-label","rect":[653,46,70,16],"section":3},{"id":"y","rect":[711,62,50,42],"section":3},{"id":"y-label","rect":[711,46,70,16],"section":3},{"id":"z","rect":[769,62,50,42],"section":3},{"id":"z-label","rect":[769,46,70,16],"section":3},{"id":"stretch","rect":[842,62,60,42],"section":3},{"id":"stretch-label","rect":[842,46,80,16],"section":3},{"id":"sync","rect":[650,135,300,22],"section":3},{"id":"sync-label","rect":[650,119,150,16],"section":3}]};

autowatch=0;
inlets=1;
outlets=3;
var state=SpectraCube.defaults(),loop=new SpectraCube.Loop(),ready=false,lastTime=0,song=null,playing=null,tempo=null,apis=[],task=null,dragging=false;
var names=['A VOL','A LOW','A MID','A HIGH','B VOL','B LOW','B MID','B HIGH'];
var selectionObserver=null,mappingTask=null,pendingMap=-1,selectedTarget=0;
var trackIds=[],menuBusy=false;
var directWrite=false;
var writeLast=[];
var writeTask=null,writePending=[],writeScheduled=false,writeFlushing=false;
function cancelwrites(){if(writeTask)writeTask.cancel();writePending=[];writeScheduled=false;}
function queuewrite(index,raw){
 var mapping=state.mappings[index],minimum=mapping.table[0][0],maximum=mapping.table[mapping.table.length-1][0];
 writePending[index]={id:mapping.id,raw:raw,tolerance:Math.max(0.000001,Math.abs(maximum-minimum)*0.001)};
 if(!writeScheduled&&!writeFlushing){if(!writeTask)writeTask=new Task(flushwrites,this);writeScheduled=true;writeTask.schedule(100);}
}
function flushwrites(){
 writeScheduled=false;
 if(writeFlushing)return;
 var pending=writePending;writePending=[];
 if(!directWrite||!ready||state.manual)return;
 writeFlushing=true;
 try{for(var index=0;index<8;index++){var desired=pending[index],mapping=state.mappings[index],api=apis[index];if(!desired||!mapping||mapping.id!==desired.id)continue;if(writeLast[index]&&writeLast[index].id===desired.id&&Math.abs(writeLast[index].raw-desired.raw)<=desired.tolerance)continue;if(!checkedApi(api,mapping.path)||!Number(api.get('is_enabled')))throw new Error('Target unavailable or controlled elsewhere');api.set('value',desired.raw);writeLast[index]={id:desired.id,raw:desired.raw};}}
 catch(error){state.manual=1;cancelwrites();loop.playing=false;if(task)task.cancel();mirror();status('WRITE PAUSED / '+error.message);}
 writeFlushing=false;
 if(writePending.length&&directWrite&&ready&&!state.manual){writeScheduled=true;writeTask.schedule(100);}
}
function directwrite(value){
 cancelwrites();
 writeLast=[];
 directWrite=!!Number(value);
 for(var index=0;index<8;index++){outlet(1,index,'id',0);if(!directWrite&&ready&&!state.manual&&state.mappings[index]&&checkedApi(apis[index],state.mappings[index].path))outlet(1,index,'id',state.mappings[index].id);}
 if(this.patcher)this.patcher.message('script','send','directwrite','set',Number(directWrite));
 status(directWrite?'WRITE TEST / event-driven direct control; MANUAL stops writes and polling for native playback':'REMOTE / smooth cube control; target automation disabled');
}
function applylayout(){
 if(typeof SpectraLayout==='undefined'||!this.patcher)return;
 for(var index=0;index<SpectraLayout.controls.length;index++){var control=SpectraLayout.controls[index];this.patcher.message('script','sendbox',control.id,'hidden',control.section===state.uiSection?0:1);this.patcher.message('script','sendbox',control.id,'presentation_rect',control.rect[0],control.rect[1],control.rect[2],control.rect[3]);}
 for(var index=0;index<4;index++){this.patcher.message('script','send','section-'+index,'text',(state.uiSection===index?'− ':'+ ')+SpectraLayout.names[index]);this.patcher.message('script','send','section-'+index,'bgcolor',state.uiSection===index ? .12 : .055,state.uiSection===index ? .32 : .075,state.uiSection===index ? .34 : .1,1);}
}
function section(value){value=Number(value);if(value<0||value>3||value!==Math.floor(value))return;state.uiSection=state.uiSection===value?4:value;applylayout();save();}
var eqApis=[[],[]],mirrorTicks=0;
var eqKeys=['freqLow','freqHigh','lowOn','midOn','highOn','slope','deviceOn'];
function checkedApi(api,path){return api&&Number(api.id)>0&&api.type==='DeviceParameter'&&apiPath(api)===path.replace(/^"|"$/g,'');}
function discoverEq(device){
 var result={},ids=idsFrom(device.get('parameters'));
 for(var index=0;index<ids.length;index++){var api=new LiveAPI(null,'id '+ids[index]),name=String(api.get('original_name')).toLowerCase().replace(/[^a-z]/g,'');var key=name==='freqlo'||name==='freqlow'||name==='freqlowcrossover'?'freqLow':name==='freqhi'||name==='freqhigh'||name==='freqhicrossover'?'freqHigh':name==='lowon'||name==='loon'||name==='low'?'lowOn':name==='midon'||name==='mid'?'midOn':name==='highon'||name==='hion'||name==='high'?'highOn':name==='slope'?'slope':name==='deviceon'?'deviceOn':null;if(key)result[key]={id:Number(api.id),path:apiPath(api)};}
 return result;
}
function restoreEqApis(){
 eqApis=[[],[]];
 for(var side=0;side<2;side++){var targets=state.eqTargets[side];if(!targets)continue;for(var index=0;index<eqKeys.length;index++){var target=targets[eqKeys[index]];if(!target)continue;try{var api=new LiveAPI(null,'id '+target.id);if(!checkedApi(api,target.path))api=new LiveAPI(null,target.path.replace(/^"|"$/g,''));if(checkedApi(api,target.path)){target.id=Number(api.id);eqApis[side][index]=api;}}catch(error){}}}
 mirror();
}
function mirror(){
 var strips=[];
 for(var side=0;side<2;side++){var values=[];for(var lane=0;lane<11;lane++){var mapping=lane<4?state.mappings[side*4+lane]:state.eqTargets[side]&&state.eqTargets[side][eqKeys[lane-4]],api=lane<4?apis[side*4+lane]:eqApis[side][lane-4];try{if(!mapping||!checkedApi(api,mapping.path))throw new Error('Unmapped');var raw=Number(api.get('value')),min=Number(api.get('min')),max=Number(api.get('max'));values.push({raw:raw,min:min,max:max,position:max>min?(raw-min)/(max-min):0,text:String(api.call('str_for_value',raw)),quantized:Number(api.get('is_quantized'))});}catch(error){values.push(null);}}
 strips.push({name:state.eqTargets[side]?state.eqTargets[side].name:(side?'Track B':'Track A'),values:values});}
 outlet(2,'eqview',JSON.stringify({manual:state.manual,strips:strips}));outlet(2,'manualstate',state.manual);
}
function manual(value){
 cancelwrites();
 var next=Number(!!Number(value));if(next===state.manual)return;state.manual=next;
 if(next){loop.playing=false;if(task)task.cancel();if(selectionObserver)selectionObserver.property='';}else if(ready){if(selectionObserver)selectionObserver.property='selected_parameter';lastTime=Date.now();if(task)task.repeat();}
 for(var index=0;index<8;index++){outlet(1,index,'id',0);if(!next&&state.mappings[index]&&checkedApi(apis[index],state.mappings[index].path)){state.mappings[index].base=parseDb(apis[index],Number(apis[index].get('value')));if(!directWrite)outlet(1,index,'id',state.mappings[index].id);}}
 emit();mirror();save();status(next?'MANUAL / originals editable; cube gains disconnected':'CUBE / manual gains captured as new baselines');
}
function eqedit(side,lane,position){
 side=Number(side);lane=Number(lane);position=Number(position);if((side!==0&&side!==1)||lane<0||lane>10||lane!==Math.floor(lane)||!isFinite(position))return;
 var index=side*4+lane,mapping=lane<4?state.mappings[index]:state.eqTargets[side]&&state.eqTargets[side][eqKeys[lane-4]],api=lane<4?apis[index]:eqApis[side][lane-4];
 try{
  if(!mapping||!checkedApi(api,mapping.path))throw new Error('Target unavailable; select the track again');
  var min=Number(api.get('min')),max=Number(api.get('max')),raw=min+SpectraCube.clamp(position,0,1)*(max-min);if(Number(api.get('is_quantized')))raw=Math.round(raw);
  if(lane<4&&!state.manual){var values=SpectraCube.mix(state),desired=parseDb(api,raw),amount=values[index];if(lane===0&&amount<=.00001)throw new Error('Move X away from mute before trimming volume');if(lane!==0&&state.djSweep){var blend=SpectraCube.clamp(amount/12,-1,1),edge=mapping.table[blend<0?0:mapping.table.length-1][0];if(Math.abs(blend)>=.99999)throw new Error('Move Y/Z away from the endpoint before trimming EQ');mapping.base=parseDb(api,SpectraCube.clamp((raw-edge*Math.abs(blend))/(1-Math.abs(blend)),min,max));}else mapping.base=lane===0?desired-20*Math.log(amount)/Math.LN10:desired-amount;mapping.base=SpectraCube.clamp(mapping.base,mapping.table[0][1],mapping.table[mapping.table.length-1][1]);emit();save();}
  else api.set('value',raw);
  mirror();
 }catch(error){status('EQ: '+error.message);}
}
function apiPath(api){return String(api.path).replace(/^"|"$/g,'');}
function childApi(parent,child){var ids=idsFrom(parent.get(child));if(!ids.length)throw new Error('Missing '+child+' on '+apiPath(parent));return new LiveAPI(null,'id '+ids[0]);}
function idsFrom(values){var result=[];for(var index=0;index<values.length;index++)if(values[index]==='id'&&Number(values[index+1])>0)result.push(Number(values[++index]));return result;}
function refreshtracks(){
 if(!ready||menuBusy)return;
 menuBusy=true;
 try{
 trackIds=[];outlet(2,'trackmenu','clear');outlet(2,'trackmenu','append','Choose track…');
 var ids=idsFrom(song.get('tracks')).concat(idsFrom(song.get('return_tracks')));
 for(var index=0;index<ids.length;index++){var trackApi=new LiveAPI(null,'id '+ids[index]);if(!Number(trackApi.get('has_audio_output')))continue;trackIds.push(ids[index]);outlet(2,'trackmenu','append',String(trackApi.get('name')));}
 updateTrackChoices();
 }finally{menuBusy=false;}
}
function updateTrackChoices(){
 var busy=menuBusy;menuBusy=true;
 try{for(var side=0;side<2;side++){var mapped=state.mappings[side*4],choice=0;for(var index=0;index<trackIds.length;index++){var trackApi=new LiveAPI(null,'id '+trackIds[index]);if(mapped&&mapped.path.replace(/^"|"$/g,'')===apiPath(trackApi)+' mixer_device volume')choice=index+1;}outlet(2,'trackchoice',side,choice);}}finally{menuBusy=busy;}
}
function prepareMapping(selected){
 if(!selected.id||selected.type!=='DeviceParameter')throw new Error('Target parameter is missing');
 if(Number(selected.get('is_quantized')))throw new Error('Map a continuous dB gain, not a switch');
 var min=Number(selected.get('min')),max=Number(selected.get('max')),base=parseDb(selected,Number(selected.get('value'))),table=[];
 for(var sample=0;sample<=64;sample++){var raw=min+(max-min)*sample/64,db=parseDb(selected,raw);if(sample&&db<table[sample-1][1])throw new Error('Gain scale must increase');table.push([raw,db]);}
 if(table[64][1]<=table[0][1])throw new Error('Gain scale is constant');
 var existing=null;for(var index=0;index<8;index++)if(state.mappings[index]&&state.mappings[index].id===Number(selected.id))existing=state.mappings[index];
 return {id:Number(selected.id),path:apiPath(selected),name:String(selected.get('name')),base:existing?existing.base:base,table:table};
}
function track(side,choice){
 side=Number(side);choice=Number(choice);if(!ready||menuBusy||side!==0&&side!==1||!isFinite(choice)||choice<0||choice!==Math.floor(choice))return;
 pendingMap=-1;if(mappingTask)mappingTask.cancel();
 if(choice>0&&loop.recording)return status('Stop recording before choosing a track');
 var offset=side*4;
 if(choice===0){for(var lane=0;lane<4;lane++){outlet(1,offset+lane,'id',0);state.mappings[offset+lane]=null;apis[offset+lane]=null;}state.eqTargets[side]=null;eqApis[side]=[];emit();mirror();save();return;}
 try{
  if(!trackIds[choice-1])throw new Error('Refresh the track list');
  var target=new LiveAPI(null,'id '+trackIds[choice-1]),devices=idsFrom(target.get('devices')),eqs=[];
  for(var index=0;index<devices.length;index++){var device=new LiveAPI(null,'id '+devices[index]);if(String(device.get('class_name'))==='FilterEQ3')eqs.push(device);}
  if(eqs.length!==1)throw new Error(eqs.length?'Multiple EQ Threes: use manual Map buttons':'Add one EQ Three directly to this track');
  var gainIds=[0,0,0],parameters=idsFrom(eqs[0].get('parameters'));
  for(var index=0;index<parameters.length;index++){var parameterApi=new LiveAPI(null,'id '+parameters[index]),name=String(parameterApi.get('original_name')).toLowerCase().replace(/[^a-z]/g,'');var lane=name==='gainlo'||name==='lowgain'?0:name==='gainmid'||name==='midgain'?1:name==='gainhi'||name==='highgain'?2:-1;if(lane>=0)gainIds[lane]=parameters[index];}
  if(!gainIds[0]||!gainIds[1]||!gainIds[2])throw new Error('Cannot identify EQ Three gain controls; use manual Map');
  var selected=[childApi(childApi(target,'mixer_device'),'volume')],prepared=[];
  for(var lane=0;lane<3;lane++)selected.push(new LiveAPI(null,'id '+gainIds[lane]));
  for(var lane=0;lane<4;lane++){prepared.push(prepareMapping(selected[lane]));for(var other=0;other<8;other++)if(Math.floor(other/4)!==side&&state.mappings[other]&&state.mappings[other].id===prepared[lane].id)throw new Error('A and B must use different tracks');}
  var eqTargets=discoverEq(eqs[0]);eqTargets.name=String(target.get('name'));
  for(var lane=0;lane<4;lane++){outlet(1,offset+lane,'id',0);state.mappings[offset+lane]=prepared[lane];apis[offset+lane]=selected[lane];if(!state.manual&&!directWrite)outlet(1,offset+lane,'id',prepared[lane].id);}
  state.eqTargets[side]=eqTargets;restoreEqApis();
  if(resetunity())status((side?'B':'A')+' / '+String(target.get('name'))+' / mapped at unity; full DJ sweep');
 }catch(error){status('TRACK: '+error.message);}
 updateTrackChoices();
}
function status(text){outlet(2,'status',text);}
function serializeState(){state.take=loop.take;return JSON.stringify(state);}
function getvalueof(){var json=serializeState(),bytes=[];for(var index=0;index<json.length;index++)bytes.push(json.charCodeAt(index));return bytes;}
function setvalueof(value){try{var values=arguments.length>1?arrayfromargs(arguments):value,json=Object.prototype.toString.call(values)==='[object Array]'?values.map(function(code){return String.fromCharCode(Number(code));}).join(''):String(values),restored=JSON.parse(json),fresh=SpectraCube.defaults();if(restored.djSweep===undefined)fresh.djSweep=0;for(var key in fresh)if(restored[key]!==undefined)fresh[key]=restored[key];state=fresh;loop.take=state.take;loop.playing=false;if(ready)restoreMappings();applylayout();display();}catch(error){status('State restore failed: '+error.message);}}
function save(){if(!dragging)notifyclients();}
function display(){outlet(2,'buttons',Number(loop.recording),Number(loop.playing));outlet(2,'viewstate',JSON.stringify({point:state.point,phase:loop.phase,recording:loop.recording,playing:loop.playing,length:loop.take?loop.take.length:0,volumeCurve:state.volumeCurve,volumeShape:state.volumeShape,toneCurve:state.toneCurve,toneShape:state.toneShape,midCurve:state.midCurve,midShape:state.midShape,customVolume:state.customVolume,customTone:state.customTone,customMid:state.customMid}));}
function emit(){
 var values=SpectraCube.mix(state);
 for(var index=0;index<8;index++){var mapping=state.mappings[index];if(!ready||!mapping||state.manual)continue;var db=index%4===0?(values[index]<=0?-120:mapping.base+20*Math.log(values[index])/Math.LN10):mapping.base+values[index],raw=index%4!==0&&state.djSweep?SpectraCube.eqRaw(mapping,values[index]):SpectraCube.rawForDb(mapping.table,SpectraCube.clamp(db,index%4===0?-120:-12,index%4===0?mapping.base:12));if(directWrite)queuewrite(index,raw);else outlet(0,index,raw);}
 display();
}
function parameter(name,value){
 if(name==='x'||name==='y'||name==='z'){state.point[{x:0,y:1,z:2}[name]]=SpectraCube.clamp(Number(value),0,1);}
 else if(name==='toneDepth'||name==='midDepth')state[name]=SpectraCube.clamp(Number(value),0,1)*12;
 else if(name in state&&typeof state[name]==='number')state[name]=Number(value);
 emit();save();
}
function point(x,y,z){state.point=[SpectraCube.clamp(x,0,1),SpectraCube.clamp(y,0,1),SpectraCube.clamp(z,0,1)];outlet(2,'manualaxes',state.point);emit();save();}
function touch(value){dragging=!!value;if(!dragging)save();}
function center(){point(.5,.5,.5);}
function record(value){if(value){loop.start(state.point);status('REC / transport runs or stopped tempo clock');}else{loop.stop(state.point);status('LOOP / '+(loop.take?loop.take.length:0)+' beats');}display();save();}
function playback(value){loop.playing=!!value&&!loop.recording&&!!loop.take;display();}
function undo(){loop.undo();display();save();}
function custom(axis,side,index,value){var table=axis==='volume'?state.customVolume[side]:axis==='tone'?state.customTone:state.customMid;table[index]=SpectraCube.clamp(value,0,1);state[axis==='volume'?'volumeCurve':axis==='tone'?'toneCurve':'midCurve']=axis==='volume'?5:4;outlet(2,'curve',axis,axis==='volume'?5:4);emit();save();}
function parseDb(api,raw){var text=String(api.call('str_for_value',raw));if(/inf|∞/i.test(text))return -120;if(!/dB/i.test(text))throw new Error('Use a volume or EQ gain displaying dB');var value=parseFloat(text.replace(',','.'));if(!isFinite(value))throw new Error('Unreadable dB scale');return value;}
function map(index){
 if(!ready)return status('Open this device inside Live first');
 index=Number(index);
 if(index<0||index>=8||index!==Math.floor(index))return;
 if(mappingTask)mappingTask.cancel();
 pendingMap=pendingMap===index?-1:index;selectedTarget=0;
 status(pendingMap<0?'Mapping cancelled':'MAP '+names[index]+' / now click the target fader or EQ gain');
}
function selectionChanged(values){
 if(pendingMap<0||values[0]!=='selected_parameter')return;
 var target=Number(values[values.length-1]);
 if(!target)return;
 try{
  var selected=new LiveAPI(null,'id '+target),own=new LiveAPI(null,'this_device');
  if(selected.type!=='DeviceParameter'||apiPath(selected).indexOf(apiPath(own)+' ')===0)return;
  selectedTarget=target;
  if(mappingTask)mappingTask.cancel();
  mappingTask=new Task(bindSelected,this);mappingTask.schedule(1);
 }catch(error){status('MAP: '+error.message);}
}
function bindSelected(){
 if(pendingMap<0||!selectedTarget)return;
 var index=pendingMap;
 try{
  var selected=new LiveAPI(null,'id '+selectedTarget);if(!selected.id||selected.type!=='DeviceParameter')throw new Error('Click the target knob in Live first');
  var own=new LiveAPI(null,'this_device');if(apiPath(selected).indexOf(apiPath(own)+' ')===0)throw new Error('Cannot map this controller to itself');
  for(var other=0;other<8;other++)if(other!==index&&state.mappings[other]&&state.mappings[other].id===Number(selected.id))throw new Error('That parameter is already mapped in this cube');
  var prepared=prepareMapping(selected);
  outlet(1,index,'id',0);
  state.mappings[index]=prepared;apis[index]=selected;
  pendingMap=-1;selectedTarget=0;
  if(!state.manual&&!directWrite)outlet(1,index,'id',Number(selected.id));status(names[index]+' / '+state.mappings[index].name);emit();save();
 }catch(error){status('MAP: '+error.message);}
}
function restoreMappings(){
 if(!ready)return;
 for(var index=0;index<8;index++){outlet(1,index,'id',0);var mapping=state.mappings[index];if(!mapping)continue;try{var api=new LiveAPI(null,'id '+mapping.id);if(!checkedApi(api,mapping.path))api=new LiveAPI(null,mapping.path.replace(/^"|"$/g,''));if(!checkedApi(api,mapping.path))throw new Error('Target moved or missing');mapping.id=Number(api.id);mapping.path=apiPath(api);apis[index]=api;if(!state.manual&&!directWrite)outlet(1,index,'id',api.id);}catch(error){apis[index]=null;status(names[index]+' unavailable / saved binding retained');}}
 restoreEqApis();
 if(trackIds.length)updateTrackChoices();
 emit();
}
function release(){pendingMap=-1;selectedTarget=0;if(mappingTask)mappingTask.cancel();for(var index=0;index<8;index++)outlet(1,index,'id',0);state.mappings=[null,null,null,null,null,null,null,null];state.eqTargets=[null,null];apis=[];eqApis=[[],[]];loop.playing=false;display();mirror();status('Released all targets / original Live automation restored');save();}
function capture(){
 if(loop.recording)return status('Stop recording before capturing');
 for(var index=0;index<8;index++)if(state.mappings[index]&&apis[index]){outlet(1,index,'id',0);state.mappings[index].base=parseDb(apis[index],Number(apis[index].get('value')));if(!state.manual&&!directWrite)outlet(1,index,'id',state.mappings[index].id);}
 center();status('Captured underlying Live gains / centered cube');
}
function resetunity(){
 if(loop.recording){status('Stop recording before resetting unity');return false;}
 var targets=[];
 try{
  for(var index=0;index<8;index++){var mapping=state.mappings[index];if(!mapping)continue;if(!checkedApi(apis[index],mapping.path))throw new Error('Target unavailable; select tracks again');if(mapping.table[0][1]>0||mapping.table[mapping.table.length-1][1]<0)throw new Error('Target cannot reach 0 dB');targets.push({index:index,api:apis[index],mapping:mapping,raw:SpectraCube.rawForDb(mapping.table,0)});}
  if(!targets.length)throw new Error('Choose tracks first');
  loop.playing=false;state.manual=0;state.djSweep=1;state.volumeCurve=0;state.toneCurve=0;state.midCurve=0;state.toneDepth=12;state.midDepth=12;state.point=[.5,.5,.5];
  for(var index=0;index<targets.length;index++)outlet(1,targets[index].index,'id',0);
  try{for(var index=0;index<targets.length;index++){var target=targets[index];target.api.set('value',target.raw);target.mapping.base=0;}for(var side=0;side<2;side++)for(var lane=2;lane<5;lane++){var api=eqApis[side][lane],binding=state.eqTargets[side]&&state.eqTargets[side][eqKeys[lane]];if(binding&&checkedApi(api,binding.path))api.set('value',Number(api.get('max')));}}
  finally{for(var index=0;index<targets.length;index++){if(!directWrite){outlet(0,targets[index].index,targets[index].raw);outlet(1,targets[index].index,'id',targets[index].mapping.id);}}}
  outlet(2,'manualaxes',state.point);outlet(2,'curve','volume',0);outlet(2,'curve','tone',0);outlet(2,'curve','mid',0);outlet(2,'depths',1,1);emit();mirror();save();status('UNITY / both volumes and EQ gains 0 dB; bands on; loop paused');return true;
 }catch(error){save();status('UNITY: '+error.message);return false;}
}
function tick(){
 if(state.manual||(directWrite&&!loop.playing&&!loop.recording)){lastTime=Date.now();return;}
 try{
 var now=Date.now(),gap=lastTime?now-lastTime:0;lastTime=now;if(gap>2000||!song||!Number(song.id))throw new Error('Wake or Live connection reset');var delta=Math.max(0,Math.min(.25,gap/1000));
 var bpm=tempo?Number(tempo.get('tempo')):120,isPlaying=playing?Number(playing.get('is_playing')):0;
 if(!isFinite(bpm)||bpm<=0)throw new Error('Tempo unavailable');
 var next=loop.tick((loop.recording||isPlaying)?delta*bpm/60:0,state.stretch,state.sync,state.point);
 if(next&&!dragging){state.point=next;outlet(2,'axes',next);emit();}else display();
 if(!directWrite&&++mirrorTicks%3===0)mirror();
 }catch(error){ready=false;outlet(2,'apiready',0);status('Live connection interrupted / retrying without resetting gains');if(task)task.cancel();task=new Task(init,this);task.schedule(1000);}
}
function init(){
 if(ready)return;try{song=new LiveAPI(null,'live_set');if(!Number(song.id))throw new Error('Live Set not ready');playing=song;tempo=song;ready=true;outlet(2,'apiready',1);restoreMappings();refreshtracks();if(selectionObserver)selectionObserver.property='';selectionObserver=new LiveAPI(selectionChanged,'live_set view');selectionObserver.property='selected_parameter';if(task)task.cancel();task=new Task(tick,this);task.interval=33;lastTime=Date.now();task.repeat();status('Live connected / saved targets restored where available');}catch(error){ready=false;outlet(2,'apiready',0);status('Waiting for Live API / saved targets retained');if(task)task.cancel();task=new Task(init,this);task.schedule(1000);}
}
function freebang(){cancelwrites();pendingMap=-1;if(task)task.cancel();if(mappingTask)mappingTask.cancel();if(selectionObserver)selectionObserver.property='';if(ready)for(var index=0;index<8;index++)outlet(1,index,'id',0);ready=false;}
function loadbang(){applylayout();display();}
