autowatch=1;
inlets=1;
outlets=1;
include('core.js');
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
