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
outlets=1;

mgraphics.init();mgraphics.relative_coords=0;mgraphics.autofill=0;
var point=[.5,.5,.5],lastMouse=null,graph=-1,notice='Choose tracks A and B',curves=SpectraCube.defaults(),graphs=[];curves.volumeCurve=2;
// Only schedule while a point changes. Display work is capped at 20 fps;
// automation and target values remain immediate and keep their full precision.
var redrawTask=null,redrawPending=false;
function requestRedraw(){if(redrawPending)return;if(!redrawTask)redrawTask=new Task(flushRedraw,this);redrawPending=true;redrawTask.schedule(50);}
function flushRedraw(){redrawPending=false;mgraphics.redraw();}
function axes(){var next=arrayfromargs(arguments);if(next[0]===point[0]&&next[1]===point[1]&&next[2]===point[2])return;point=next;requestRedraw();}
function cacheGraphs(){graphs=[];for(var row=0;row<3;row++){var values=[];for(var n=0;n<=40;n++){var p=n/40;values.push(row===0?SpectraCube.faders(p,curves.volumeCurve,curves.volumeShape,curves.customVolume):[SpectraCube.shape(p,row===1?curves.toneCurve:curves.midCurve,row===1?curves.toneShape:curves.midShape,row===1?curves.customTone:curves.customMid)]);}graphs.push(values);}}
function curveview(json){curves=JSON.parse(json);cacheGraphs();requestRedraw();}
cacheGraphs();
function status(text){notice=String(text);}
function freebang(){if(redrawTask)redrawTask.cancel();redrawPending=false;}
function project(p){return [18+p[0]*136+p[2]*40,142-p[1]*104-p[2]*32];}
function line(a,b,color){mgraphics.set_source_rgba(color);mgraphics.move_to(a);mgraphics.line_to(b);mgraphics.stroke();}
function paint(){
 mgraphics.set_source_rgba(.055,.075,.10,1);mgraphics.rectangle(0,0,450,169);mgraphics.fill();mgraphics.set_line_width(1);
 var teal=[.35,.85,.87,.6],amber=[1,.7,.3,1];
 for(var z=0;z<=1;z++)for(var axis=0;axis<2;axis++)for(var edge=0;edge<=1;edge++)line(project(axis===0?[0,edge,z]:[edge,0,z]),project(axis===0?[1,edge,z]:[edge,1,z]),teal);
 for(var i=0;i<4;i++)line(project([i%2,Math.floor(i/2),0]),project([i%2,Math.floor(i/2),1]),teal);
 var p=project(point);line(project([0,point[1],point[2]]),p,amber);line(project([point[0],0,point[2]]),p,amber);mgraphics.set_source_rgba(amber);mgraphics.ellipse(p[0]-5,p[1]-5,10,10);mgraphics.fill();
 mgraphics.select_font_face('Menlo');mgraphics.set_font_size(10);mgraphics.move_to(12,14);mgraphics.show_text('XYZ / ALT = DEPTH');
 var titles=['VOLUME A / B','LOW + HIGH','MID DEPTH'];
 for(var row=0;row<3;row++){var top=18+row*46;mgraphics.set_source_rgba(.83,.9,.94,1);mgraphics.set_font_size(9);mgraphics.move_to(214,top-3);mgraphics.show_text(titles[row]);mgraphics.set_source_rgba(.1,.15,.2,1);mgraphics.rectangle(214,top,210,30);mgraphics.fill();
  for(var side=0;side<(row===0?2:1);side++){mgraphics.set_source_rgba(side?teal:amber);mgraphics.move_to(214,top+30-graphs[row][0][side]*30);for(var n=1;n<=40;n++)mgraphics.line_to(214+n*210/40,top+30-graphs[row][n][side]*30);mgraphics.stroke();}
  line([214+point[row]*210,top],[214+point[row]*210,top+30],[1,1,1,.45]);
 }
}
function clamp(v){return Math.max(0,Math.min(1,v));}
function editGraph(x,y,shift){var row=graph,top=18+row*46,index=Math.round(clamp((x-214)/210)*4),value=clamp(1-(y-top)/30);outlet(0,'custom',row===0?'volume':row===1?'tone':'mid',shift?1:0,index,value);}
function onclick(x,y,button,mod1,shift,caps,opt){lastMouse=[x,y];graph=x>=214&&x<=424?Math.floor((y-18)/46):-1;if(graph<0||graph>2)graph=-1;if(graph>=0){editGraph(x,y,shift);return;}if(!opt)outlet(0,'point',clamp((x-18-point[2]*40)/136),clamp((142-y-point[2]*32)/104),point[2]);}
function ondrag(x,y,button,mod1,shift,caps,opt){if(!button){lastMouse=null;graph=-1;return;}if(!lastMouse)return;if(graph>=0){editGraph(x,y,shift);lastMouse=[x,y];return;}var p=point.slice(),dx=x-lastMouse[0],dy=y-lastMouse[1];if(opt)p[2]=clamp(p[2]+(dx*40-dy*32)/(40*40+32*32));else{p[0]=clamp(p[0]+dx/136);p[1]=clamp(p[1]-dy/104);}outlet(0,'point',p);lastMouse=[x,y];}
function ondblclick(x,y){if(x<214)outlet(0,'point',.5,.5,.5);}
