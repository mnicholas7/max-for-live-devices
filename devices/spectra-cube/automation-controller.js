// SPDX-License-Identifier: GPL-3.0-only
// Copyright (C) 2026 Michael Nicholas
autowatch=0;
inlets=1;
outlets=3;
include('core.js');
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
