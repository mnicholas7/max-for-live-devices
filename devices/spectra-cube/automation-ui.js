// SPDX-License-Identifier: GPL-3.0-only
// Copyright (C) 2026 Michael Nicholas
autowatch=0;
inlets=1;
outlets=1;
include('core.js');
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
