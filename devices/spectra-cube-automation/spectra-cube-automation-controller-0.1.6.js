// SPDX-License-Identifier: GPL-3.0-only
// Copyright (C) 2026 Michael Nicholas
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
 if(mode===5)return .5+(position-.5)*(1-.8*amount);
 if(mode===6){var d=position-.5,hold=.02+.28*amount;return Math.abs(d)<=hold?.5:.5+(d<0?-1:1)*(Math.abs(d)-hold)*.5/(.5-hold);}
 if(mode===7){var d=(position-.5)*2;return .5+(d<0?-1:1)*Math.pow(Math.abs(d),1-.75*amount)*.5;}
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

// SPDX-License-Identifier: GPL-3.0-only
// Copyright (C) 2026 Michael Nicholas
autowatch=0;
inlets=1;
outlets=3;

// Live owns X/Y/Z. Only the target bindings are stored in this script's pattr.
var state=SpectraCube.defaults(),ready=false,song=null,retry=null,trackIds=[],menuBusy=false;
state.volumeCurve=2; // Equal power: smooth sine/cosine crossfade.
var bindings=[null,null],apis=[],lastOutput=[];
function status(text){outlet(2,'status',text);}
function display(){outlet(2,'axes',state.point);}
function displaycurves(){outlet(2,'curveview',JSON.stringify({volumeCurve:state.volumeCurve,volumeShape:state.volumeShape,toneCurve:state.toneCurve,toneShape:state.toneShape,midCurve:state.midCurve,midShape:state.midShape,customVolume:state.customVolume,customTone:state.customTone,customMid:state.customMid}));}
function idsFrom(values){var ids=[];for(var i=0;i<values.length;i++)if(values[i]==='id'&&Number(values[i+1])>0)ids.push(Number(values[++i]));return ids;}
function apiPath(api){return String(api.path).replace(/^"|"$/g,'');}
function childApi(parent,child){var ids=idsFrom(parent.get(child));if(!ids.length)throw new Error('Missing '+child);return new LiveAPI(null,'id '+ids[0]);}
function parseDb(api,raw){var text=String(api.call('str_for_value',raw));if(/inf|∞/i.test(text))return -120;if(!/dB/i.test(text))throw new Error('Expected a dB gain');var value=parseFloat(text.replace(',','.'));if(!isFinite(value))throw new Error('Unreadable gain');return value;}
function prepareMapping(api,unityVolume){
 if(!Number(api.id)||api.type!=='DeviceParameter'||Number(api.get('is_quantized')))throw new Error('Missing continuous gain');
 if(!Number(api.get('is_enabled')))throw new Error('Gain is already controlled elsewhere');
 var min=Number(api.get('min')),max=Number(api.get('max')),table=[];
 for(var i=0;i<=64;i++){var raw=min+(max-min)*i/64,db=parseDb(api,raw);if(i&&db<table[i-1][1])throw new Error('Unsupported gain scale');table.push([raw,db]);}
 return {id:Number(api.id),path:apiPath(api),name:String(api.get('name')),base:unityVolume?0:parseDb(api,Number(api.get('value'))),table:table};
}
function emit(axis){
 if(ready){var mix=SpectraCube.mix(state);for(var i=0;i<8;i++){
  var lane=i%4;
  if(axis!==undefined&&!(axis===0?lane===0:axis===1?lane===1||lane===3:lane===2))continue;
  var mapping=state.mappings[i];if(!mapping||!apis[i])continue;
  var raw=i%4===0?SpectraCube.rawForDb(mapping.table,mix[i]<=0?-120:mapping.base+20*Math.log(mix[i])/Math.LN10):SpectraCube.eqRaw(mapping,mix[i]);
  if(lastOutput[i]===raw)continue;lastOutput[i]=raw;
  outlet(0,i,raw);
 }}
 display();
}
function parameter(name,value){
 value=Number(value);if(!isFinite(value))return;var i={x:0,y:1,z:2}[name];
 if(i!==undefined){value=SpectraCube.clamp(value,0,1);if(state.point[i]===value)return;state.point[i]=value;emit(i);return;}
 var axis={volumeCurve:0,volumeShape:0,toneCurve:1,toneShape:1,midCurve:2,midShape:2}[name];if(axis===undefined)return;
 value=/Curve$/.test(name)?Math.round(SpectraCube.clamp(value,0,name==='volumeCurve'?5:7)):SpectraCube.clamp(value,0,1);
 if(state[name]===value)return;state[name]=value;displaycurves();emit(axis);
}
function custom(axis,side,index,value){
 var lane={volume:0,tone:1,mid:2}[axis];side=Number(side);index=Number(index);value=Number(value);
 if(lane===undefined||index!==Math.floor(index)||index<0||index>4||!isFinite(value)||(axis==='volume'&&side!==0&&side!==1))return;
 var table=axis==='volume'?state.customVolume[side]:state[axis==='tone'?'customTone':'customMid'];table[index]=SpectraCube.clamp(value,0,1);
 state[axis+'Curve']=axis==='volume'?5:4;outlet(2,'curve',axis,state[axis+'Curve']);displaycurves();emit(lane);notifyclients();
}
function refreshtracks(){
 if(!ready)return;menuBusy=true;
 try{trackIds=[];outlet(2,'trackmenu','clear');outlet(2,'trackmenu','append','Choose track…');
 var ids=idsFrom(song.get('tracks')).concat(idsFrom(song.get('return_tracks')));
 for(var i=0;i<ids.length;i++){var api=new LiveAPI(null,'id '+ids[i]);if(!Number(api.get('has_audio_output')))continue;trackIds.push(ids[i]);outlet(2,'trackmenu','append',String(api.get('name')));}
 updatechoices();}finally{menuBusy=false;}
}
function updatechoices(){
 for(var side=0;side<2;side++){var choice=0,binding=bindings[side];
  for(var i=0;binding&&i<trackIds.length;i++){var api=new LiveAPI(null,'id '+trackIds[i]);if(apiPath(api)===binding.trackPath&&String(api.get('name'))===binding.trackName)choice=i+1;}
  outlet(2,'trackchoice',side,choice);
 }
}
function disconnect(side){for(var lane=0;lane<4;lane++){var i=side*4+lane;outlet(1,i,'id',0);state.mappings[i]=null;apis[i]=null;lastOutput[i]=undefined;}}
function track(side,choice){
 side=Number(side);choice=Number(choice);if(!ready||menuBusy||(side!==0&&side!==1)||!isFinite(choice)||choice<0||choice!==Math.floor(choice))return;
 try{
  if(choice===0){disconnect(side);bindings[side]=null;notifyclients();updatechoices();status('Choose a track to connect');return;}
  if(!trackIds[choice-1])throw new Error('Refresh the track list');
  var target=new LiveAPI(null,'id '+trackIds[choice-1]),trackPath=apiPath(target),trackName=String(target.get('name'));
  if(bindings[1-side]&&bindings[1-side].trackPath===trackPath)throw new Error('Choose different tracks for A and B');
  if(bindings[side]&&bindings[side].trackPath===trackPath&&bindings[side].trackName===trackName){status('Track already connected');return;}
  var selected=[childApi(childApi(target,'mixer_device'),'volume'),null,null,null],eqs=[],deviceIds=idsFrom(target.get('devices'));
  for(var i=0;i<deviceIds.length;i++){var device=new LiveAPI(null,'id '+deviceIds[i]);if(String(device.get('class_name'))==='FilterEQ3')eqs.push(device);}
  if(eqs.length>1)throw new Error('Use one EQ Three directly on the track');
  if(eqs.length===1){var params=idsFrom(eqs[0].get('parameters'));
   for(var i=0;i<params.length;i++){var api=new LiveAPI(null,'id '+params[i]),name=String(api.get('original_name')).toLowerCase().replace(/[^a-z]/g,''),lane=name==='gainlo'||name==='lowgain'?1:name==='gainmid'||name==='midgain'?2:name==='gainhi'||name==='highgain'?3:0;if(lane)selected[lane]=api;}
   if(!selected[1]||!selected[2]||!selected[3])throw new Error('Cannot identify EQ Three gains');
  }
  var mapped=selected.map(function(api,lane){return api?prepareMapping(api,lane===0):null;});
  disconnect(side);bindings[side]={trackId:Number(target.id),trackPath:trackPath,trackName:trackName,mappings:mapped};
  for(var lane=0;lane<4;lane++){var i=side*4+lane;state.mappings[i]=mapped[lane];apis[i]=selected[lane];}
  // Both volume endpoints are unity; apply current axes without resetting automation.
  emit();for(var lane=0;lane<4;lane++)if(mapped[lane])outlet(1,side*4+lane,'id',mapped[lane].id);
  notifyclients();status((side?'B':'A')+': '+trackName+(eqs.length?' / volume + EQ':' / volume; add EQ Three for Y/Z'));
 }catch(error){status(error.message);}
 menuBusy=true;try{updatechoices();}finally{menuBusy=false;}
}
function restoreMappings(){
 if(!ready)return;
 for(var side=0;side<2;side++){
  disconnect(side);var binding=bindings[side];if(!binding)continue;
  try{
   var target=new LiveAPI(null,'id '+binding.trackId);
   if(!Number(target.id)||apiPath(target)!==binding.trackPath||String(target.get('name'))!==binding.trackName)target=new LiveAPI(null,binding.trackPath);
   if(!Number(target.id)||String(target.get('name'))!==binding.trackName)throw new Error('Saved track unavailable; choose it again');
   binding.trackId=Number(target.id);
   for(var lane=0;lane<4;lane++){var mapping=binding.mappings[lane];if(!mapping)continue;var api=new LiveAPI(null,'id '+mapping.id);
    if(!Number(api.id)||apiPath(api)!==mapping.path)api=new LiveAPI(null,mapping.path);
    if(!Number(api.id)||api.type!=='DeviceParameter'||apiPath(api)!==mapping.path||String(api.get('name'))!==mapping.name)throw new Error('Saved gain unavailable; choose the track again');
    if(lane===0)mapping.base=0; // Migrate saved volume bindings to the shared 0 dB endpoint.
    mapping.id=Number(api.id);state.mappings[side*4+lane]=mapping;apis[side*4+lane]=api;
   }
   emit();for(var lane=0;lane<4;lane++)if(state.mappings[side*4+lane])outlet(1,side*4+lane,'id',state.mappings[side*4+lane].id);
  }catch(error){disconnect(side);status(error.message);}
 }
 emit();if(trackIds.length){menuBusy=true;try{updatechoices();}finally{menuBusy=false;}}
}
function getvalueof(){var json=JSON.stringify({bindings:bindings,customVolume:state.customVolume,customTone:state.customTone,customMid:state.customMid}),bytes=[];for(var i=0;i<json.length;i++)bytes.push(json.charCodeAt(i));return bytes;}
function setvalueof(value){
 try{var values=arguments.length>1?arrayfromargs(arguments):value,json=Object.prototype.toString.call(values)==='[object Array]'?values.map(function(v){return String.fromCharCode(Number(v));}).join(''):String(values),saved=JSON.parse(json);
 if(!saved.bindings||saved.bindings.length!==2)throw new Error('Invalid mappings');bindings=saved.bindings;
 function validTable(v){return Array.isArray(v)&&v.length===5&&v.every(function(n){return typeof n==='number'&&isFinite(n)&&n>=0&&n<=1;});}
 if(validTable(saved.customTone))state.customTone=saved.customTone;if(validTable(saved.customMid))state.customMid=saved.customMid;
 if(Array.isArray(saved.customVolume)&&saved.customVolume.length===2&&validTable(saved.customVolume[0])&&validTable(saved.customVolume[1]))state.customVolume=saved.customVolume;
 displaycurves();if(ready)restoreMappings();
 }catch(error){status('Mapping restore: '+error.message);}
}
function init(){
 if(ready)return;
 try{song=new LiveAPI(null,'live_set');if(!Number(song.id))throw new Error('Live not ready');ready=true;if(retry)retry.cancel();outlet(2,'apiready',1);restoreMappings();refreshtracks();status('Record X/Y/Z with Live Automation Arm + Record');}
 catch(error){ready=false;outlet(2,'apiready',0);status('Waiting for Live');if(retry)retry.cancel();retry=new Task(init,this);retry.schedule(1000);}
}
function freebang(){if(retry)retry.cancel();for(var side=0;side<2;side++)disconnect(side);ready=false;}
function loadbang(){display();displaycurves();}
