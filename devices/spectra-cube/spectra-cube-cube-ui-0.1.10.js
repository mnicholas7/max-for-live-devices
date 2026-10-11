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

autowatch=0;
inlets=1;
outlets=1;
mgraphics.init();mgraphics.relative_coords=0;mgraphics.autofill=0;
var view={point:[.5,.5,.5],phase:0,recording:false,playing:false,length:0,volumeCurve:0,volumeShape:0,toneCurve:0,toneShape:.5,midCurve:0,midShape:.5,customVolume:[[1,1,.5,0,0],[0,0,.5,1,1]],customTone:[0,.25,.5,.75,1],customMid:[0,.25,.5,.75,1]},lastMouse=null,graph=-1,notice='Choose tracks A and B / one EQ Three on each';
function viewstate(json){view=JSON.parse(json);mgraphics.redraw();}
function status(text){notice=String(text);mgraphics.redraw();}
function axes(){var values=arrayfromargs(arguments);view.point=values;mgraphics.redraw();}
function project(point){return [16+point[0]*136+point[2]*40,142-point[1]*104-point[2]*32];}
function line(start,end,color){mgraphics.set_source_rgba(color);mgraphics.move_to(start);mgraphics.line_to(end);mgraphics.stroke();}
function label(text,x,y,size,color){mgraphics.set_source_rgba(color);mgraphics.select_font_face('Menlo');mgraphics.set_font_size(size);mgraphics.move_to(x,y);mgraphics.show_text(text);}
function paint(){
 mgraphics.set_source_rgba(.055,.075,.10,1);mgraphics.rectangle(0,0,450,169);mgraphics.fill();mgraphics.set_line_width(1);
 var teal=[.35,.85,.87,.6],amber=[1,.7,.3,1],white=[.83,.9,.94,1];
 for(var depth=0;depth<=1;depth++)for(var axis=0;axis<2;axis++)for(var edge=0;edge<=1;edge++){var start=axis===0?[0,edge,depth]:[edge,0,depth],end=axis===0?[1,edge,depth]:[edge,1,depth];line(project(start),project(end),teal);}
 for(var corner=0;corner<4;corner++)line(project([corner%2,Math.floor(corner/2),0]),project([corner%2,Math.floor(corner/2),1]),teal);
 var point=project(view.point);line(project([0,view.point[1],view.point[2]]),point,amber);line(project([view.point[0],0,view.point[2]]),point,amber);mgraphics.set_source_rgba(view.recording?[1,.25,.3,1]:amber);mgraphics.ellipse(point[0]-5,point[1]-5,10,10);mgraphics.fill();
 label('XYZ / ALT = DEPTH',12,14,10,white);label(view.recording?'RECORDING':view.playing?'LOOP '+view.length+'b':'SPECTRA CUBE',12,163,10,amber);
 var titles=['VOLUME A / B','LOW + HIGH','MID DEPTH'];
 for(var row=0;row<3;row++){
  var top=18+row*46;label(titles[row],214,top-3,9,white);
  mgraphics.set_source_rgba(.1,.15,.2,1);mgraphics.rectangle(214,top,210,30);mgraphics.fill();
  for(var side=0;side<(row===0?2:1);side++)for(var step=1;step<=80;step++){
   var previous=(step-1)/80,current=step/80,mode=row===0?view.volumeCurve:row===1?view.toneCurve:view.midCurve,amount=row===0?view.volumeShape:row===1?view.toneShape:view.midShape,table=row===0?view.customVolume:row===1?view.customTone:view.customMid;
   var before=row===0?SpectraCube.faders(previous,mode,amount,table)[side]:SpectraCube.shape(previous,mode,amount,table),after=row===0?SpectraCube.faders(current,mode,amount,table)[side]:SpectraCube.shape(current,mode,amount,table);
   line([214+previous*210,top+30-before*30],[214+current*210,top+30-after*30],side?teal:amber);
  }
  line([214+view.point[row]*210,top],[214+view.point[row]*210,top+30],[1,1,1,.45]);
 }
 label(notice.substring(0,67),214,163,8,white);
}
function editGraph(x,y,shift){var top=18+graph*46,index=Math.round(SpectraCube.clamp((x-214)/210,0,1)*4),value=SpectraCube.clamp(1-(y-top)/30,0,1);outlet(0,'custom',graph===0?'volume':graph===1?'tone':'mid',shift?1:0,index,value);}
function onclick(x,y,button,mod1,shift,caps,opt){lastMouse=[x,y];graph=x>=214&&x<=424?Math.floor((y-18)/46):-1;if(graph<0||graph>2)graph=-1;outlet(0,'touch',1);if(graph>=0)editGraph(x,y,shift);else if(!opt){var z=view.point[2];outlet(0,'point',SpectraCube.clamp((x-16-z*40)/136,0,1),SpectraCube.clamp((142-y-z*32)/104,0,1),z);}}
function ondrag(x,y,button,mod1,shift,caps,opt){if(!button){lastMouse=null;graph=-1;outlet(0,'touch',0);return;}if(!lastMouse)return;if(graph>=0)editGraph(x,y,shift);else{var dx=x-lastMouse[0],dy=y-lastMouse[1],point=view.point.slice();if(opt)point[2]=SpectraCube.clamp(point[2]+(dx*40-dy*32)/(40*40+32*32),0,1);else{point[0]=SpectraCube.clamp(point[0]+dx/136,0,1);point[1]=SpectraCube.clamp(point[1]-dy/104,0,1);}outlet(0,'point',point);}lastMouse=[x,y];}
function ondblclick(){outlet(0,'center');}
