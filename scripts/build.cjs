const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../devices/spectra-cube');
const boxes=[],lines=[],parameters={};
function box(id,maxclass,rect,extra={}){boxes.push({box:{id,maxclass,patching_rect:rect,...extra}});return id;}
function object(id,text,rect,extra={}){return box(id,'newobj',rect,{text,...extra});}
function wire(source,outlet,destination,inlet=0){lines.push({patchline:{source:[source,outlet],destination:[destination,inlet]}});}
function parameter(id,label,rect,min,max,initial,options){
 const attributes={parameter_longname:label,parameter_shortname:label,parameter_type:options?2:0,parameter_mmin:min,parameter_mmax:max,parameter_initial:[initial],parameter_initial_enable:1,parameter_unitstyle:options?0:1};
 if(options)attributes.parameter_enum=options;
 const menuStyle=options?{appearance:0,fontname:'Arial',fontsize:12,fontface:1,activebgcolor:[.055,.075,.1,1],textcolor:[.97,.98,1,1],tricolor:[.97,.98,1,1],bordercolor:[.4,.55,.6,1],focusbordercolor:[.4,.95,.9,1],hltcolor:[.08,.23,.25,1],hlttextcolor:[1,1,1,1]}:{};
 box(id,options?'live.menu':'live.dial',rect,{varname:id,textcolor:[.85,.9,.95,1],...menuStyle,parameter_enable:1,presentation:1,presentation_rect:rect,saved_attribute_attributes:{valueof:attributes}});
 parameters[id]=[label,label,0];
 const prepend=object(id+'-message','prepend parameter '+id,[rect[0],240+rect[1],150,22]);wire(id,0,prepend);wire(prepend,0,'controller');
 box(id+'-label','comment',[rect[0],rect[1]-16,rect[2]+20,16],{text:label,fontsize:10,textcolor:[.85,.9,.95,1],presentation:1,presentation_rect:[rect[0],rect[1]-16,rect[2]+20,16]});
}
function button(id,label,rect,command,toggle=false){
 box(id,'live.text',rect,{varname:id,text:label,texton:label,mode:toggle?1:0,parameter_enable:1,parameter_mappable:0,presentation:1,presentation_rect:rect,saved_attribute_attributes:{valueof:{parameter_longname:label,parameter_shortname:label,parameter_type:2,parameter_enum:['Off','On'],parameter_mmin:0,parameter_mmax:1,parameter_invisible:0}}});
 parameters[id]=[label,label,0];
 let previous=id;
 const message=box(id+'-command',toggle?'newobj':'message',[rect[0],530+rect[1],120,22],{text:toggle?'prepend '+command:command});wire(previous,0,message);wire(message,0,'controller');
}
object('controller','js controller.js',[20,700,130,22],{varname:'controller'});
box('cube','jsui',[0,0,450,169],{filename:'cube-ui.js',jsarguments:['cube-ui.js'],varname:'cube',numinlets:1,numoutlets:1,presentation:1,presentation_rect:[0,0,450,169]});wire('cube',0,'controller');
object('state','pattr cube_state @bindto controller @parameter_enable 1',[20,740,345,22],{saved_attribute_attributes:{valueof:{parameter_longname:'Cube state',parameter_shortname:'State',parameter_type:3,parameter_invisible:1}}});parameters.state=['Cube state','State',0];
object('ready','live.thisdevice',[20,780,105,22]);object('defer','deferlow',[145,780,65,22]);box('init','message',[235,780,45,22],{text:'init'});wire('ready',0,'defer');wire('defer',0,'init');wire('init',0,'controller');
object('midiin','midiin',[20,820,60,22]);object('midiout','midiout',[110,820,60,22]);wire('midiin',0,'midiout');
const volume=['Site original','Linear','Equal power','Soft blend','Sharp cut','Custom'];
const eq=['Linear','Ease in','Ease out','S curve','Custom'];
parameter('volumeCurve','Volume curve',[462,20,128,22],0,5,0,volume);
parameter('toneCurve','Low / high curve',[598,20,128,22],0,4,0,eq);
parameter('midCurve','Mid curve',[734,20,128,22],0,4,0,eq);
parameter('volumeShape','Volume shape',[468,61,50,42],0,1,0);
parameter('toneShape','Tone shape',[602,61,50,42],0,1,.5);
parameter('midShape','Mid shape',[738,61,50,42],0,1,.5);
parameter('toneDepth','Tone sweep',[666,61,50,42],0,1,1);
parameter('midDepth','Mid sweep',[802,61,50,42],0,1,1);
parameter('x','X blend',[465,125,50,42],0,1,.5);
parameter('y','Y tilt',[523,125,50,42],0,1,.5);
parameter('z','Z mids',[581,125,50,42],0,1,.5);
parameter('stretch','Loop stretch',[654,125,60,42],-2,2,0);
parameter('sync','Stretch sync',[731,132,130,22],0,1,1,['Free','Sync powers of 2']);
button('record','REC',[875,8,55,22],'record',true);button('loop','LOOP',[936,8,55,22],'playback',true);button('undo','UNDO',[997,8,55,22],'undo');
button('center','CENTER',[875,37,75,22],'center');button('capture','CAPTURE',[956,37,96,22],'capture');
const names=['A VOL','A LOW','A MID','A HIGH','B VOL','B LOW','B MID','B HIGH'];
for(let index=0;index<8;index++)button('map'+index,'Map '+names[index],[1075+(index%2)*90,60+Math.floor(index/2)*20,85,18],'map '+index);
button('release','RELEASE ALL',[875,145,177,22],'release');
for(const [side,label]of ['Track A / auto-map','Track B / auto-map'].entries()){
 const id='track-'+side,rect=[875,78+side*44,177,22];
 box(id,'umenu',rect,{varname:id,items:['Choose track…'],fontsize:12,textcolor:[.97,.98,1,1],bgcolor:[.055,.075,.1,1],presentation:1,presentation_rect:rect});
 box(id+'-label','comment',[rect[0],rect[1]-16,177,16],{text:label,fontsize:10,textcolor:[.85,.9,.95,1],presentation:1,presentation_rect:[rect[0],rect[1]-16,177,16]});
 object(id+'-command','prepend track '+side,[rect[0],1100,140,22]);wire(id,0,id+'-command');wire(id+'-command',0,'controller');
}
button('refreshtracks','REFRESH TRACKS',[1075,145,177,22],'refreshtracks');
button('resetunity','RESET UNITY',[650,143,200,22],'resetunity');
button('manual','MANUAL / ORIGINALS',[1075,8,177,22],'manual',true);
box('eq-mirror','jsui',[1270,0,408,169],{filename:'eq-ui.js',jsarguments:['eq-ui.js'],varname:'eq-mirror',numinlets:1,numoutlets:1,presentation:1,presentation_rect:[1270,0,408,169]});wire('eq-mirror',0,'controller');
object('values','route 0 1 2 3 4 5 6 7',[360,740,190,22]);object('targets','route 0 1 2 3 4 5 6 7',[360,780,190,22]);wire('controller',0,'values');wire('controller',1,'targets');
for(let index=0;index<8;index++){const id='remote'+index;object(id,'live.remote~ @normalized 0 @smoothing 15',[350+index*140,870,135,22],{saved_object_attributes:{_persistence:1}});wire('values',index,id);wire('targets',index,id,1);}
object('ui-route','route axes manualaxes curve buttons trackmenu trackchoice eqview manualstate depths',[20,910,475,22]);wire('controller',2,'ui-route');wire('ui-route',9,'cube');
object('depth-state','unpack f f',[1000,1180,85,22]);wire('ui-route',8,'depth-state');
for(const [index,id]of ['toneDepth','midDepth'].entries()){object('set-'+id,'prepend set',[1000+index*90,1220,85,22]);wire('depth-state',index,'set-'+id);wire('set-'+id,0,id);}
object('eq-view','prepend eqview',[1000,1140,110,22]);wire('ui-route',6,'eq-view');wire('eq-view',0,'eq-mirror');
object('set-manual','prepend set',[1120,1140,85,22]);wire('ui-route',7,'set-manual');wire('set-manual',0,'manual');
object('track-choice','route 0 1',[720,1100,85,22]);wire('ui-route',5,'track-choice');
for(let side=0;side<2;side++){wire('ui-route',4,'track-'+side);object('set-track-'+side,'prepend set',[820+side*90,1100,85,22]);wire('track-choice',side,'set-track-'+side);wire('set-track-'+side,0,'track-'+side);}
for(const [outlet,prefix]of [[0,'set'],[1,'']]){
 const unpack=object('axes'+outlet,'unpack f f f',[20+outlet*180,950,120,22]);wire('ui-route',outlet,unpack);
 for(const [index,id]of ['x','y','z'].entries()){if(prefix){const set=object('set-'+id,'prepend set',[20+index*80,990,75,22]);wire(unpack,index,set);wire(set,0,id);}else wire(unpack,index,id);}
}
object('curve-route','route volume tone mid',[410,950,150,22]);wire('ui-route',2,'curve-route');
for(const [index,id]of ['volumeCurve','toneCurve','midCurve'].entries()){const set=object('set-'+id,'prepend set',[420+index*90,990,75,22]);wire('curve-route',index,set);wire(set,0,id);}
object('button-state','unpack i i',[720,950,85,22]);wire('ui-route',3,'button-state');
for(const [index,id]of ['record','loop'].entries()){const set=object('set-'+id,'prepend set',[720+index*90,990,75,22]);wire('button-state',index,set);wire(set,0,id);}
const layout={names:['EQ','Curves','Mapping','Loop'],controls:[]};
function place(id,rect,section){const control=boxes.find(entry=>entry.box.id===id).box;control.varname=id;control.presentation_rect=rect;if(section!==undefined){control.hidden=section===0?0:1;layout.controls.push({id,rect,section});}}
place('track-0',[462,24,177,22]);place('track-0-label',[462,8,177,16]);
place('track-1',[462,67,177,22]);place('track-1-label',[462,51,177,16]);
place('manual',[462,94,177,22]);
place('record',[462,122,55,20]);place('loop',[523,122,55,20]);place('undo',[584,122,55,20]);
place('center',[462,147,54,20]);place('capture',[520,147,58,20]);place('release',[582,147,57,20]);
for(const [id,label]of [['center','CENTER'],['capture','CAPTURE'],['release','RELEASE']]){const control=boxes.find(entry=>entry.box.id===id).box;control.text=label;control.texton=label;control.fontsize=9;}
place('eq-mirror',[650,24,408,144],0);
for(const id of ['volumeCurve','toneCurve','midCurve','volumeShape','toneShape','midShape','toneDepth','midDepth']){
 const control=boxes.find(entry=>entry.box.id===id).box,rect=control.presentation_rect;
 const target=[650+rect[0]-462,id.endsWith('Curve')?42:84,rect[2],rect[3]];
 place(id,target,1);place(id+'-label',[target[0],target[1]-16,Math.min(rect[2]+20,1058-target[0]),16],1);
}
for(let index=0;index<8;index++)place('map'+index,[650+(index%2)*208,38+Math.floor(index/2)*25,200,22],2);
place('resetunity',[650,143,200,22],2);place('refreshtracks',[858,143,200,22],2);
for(const id of ['x','y','z','stretch','sync']){
 const control=boxes.find(entry=>entry.box.id===id).box,rect=control.presentation_rect;
 const target=id==='sync'?[650,135,300,22]:[650+rect[0]-462,62,rect[2],rect[3]];
 place(id,target,3);place(id+'-label',[target[0],target[1]-16,rect[2]+20,16],3);
}
for(let index=0;index<4;index++)button('section-'+index,(index===0?'− ':'+ ')+layout.names[index],[650+index*104,0,100,20],'section '+index);
fs.writeFileSync(path.join(root,'layout.js'),'var SpectraLayout='+JSON.stringify(layout)+';\n');
const patcher={fileversion:1,appversion:{major:9,minor:1,revision:5,architecture:'x64',modernui:1},classnamespace:'box',rect:[80,80,1070,600],openinpresentation:1,devicewidth:1070,bgcolor:[.055,.075,.1,1],boxes,lines,parameters,dependency_cache:['core.js','controller.js','cube-ui.js','eq-ui.js','layout.js'].map(name=>({name,bootpath:'.',type:'TEXT',implicit:1})),autosave:0};
const json=Buffer.from(JSON.stringify({patcher},null,2)+'\n');
fs.writeFileSync(path.join(root,'Spectra Cube.maxpat'),json);
const header=Buffer.alloc(32);header.write('ampf');header.writeUInt32LE(4,4);header.write('mmmm',8);header.write('meta',12);header.writeUInt32LE(4,16);header.write('ptch',24);header.writeUInt32LE(json.length,28);
fs.writeFileSync(path.join(root,'Spectra Cube.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.1.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.2.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.3.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.4.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.5.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.6.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.7.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.8.amxd'),Buffer.concat([header,json]));
fs.writeFileSync(path.join(root,'Spectra Cube 0.1.9.amxd'),Buffer.concat([header,json]));
console.log('Built compact MIDI device and editable Max patch; keep the five JS files beside the device.');
