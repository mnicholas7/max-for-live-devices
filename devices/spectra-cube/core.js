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
