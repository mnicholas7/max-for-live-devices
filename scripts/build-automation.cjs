const fs=require('node:fs'),path=require('node:path');
const source=path.resolve(__dirname,'../devices/spectra-cube');
const root=path.resolve(__dirname,'../devices/spectra-cube-automation');
fs.mkdirSync(root,{recursive:true});
const controller='spectra-cube-automation-controller-0.1.6.js',ui='spectra-cube-automation-ui-0.1.6.js';
fs.writeFileSync(path.join(root,controller),fs.readFileSync(path.join(source,'core.js'),'utf8')+'\n'+fs.readFileSync(path.join(source,'automation-controller.js'),'utf8').replace("include('core.js');",''));
fs.writeFileSync(path.join(root,ui),fs.readFileSync(path.join(source,'core.js'),'utf8')+'\n'+fs.readFileSync(path.join(source,'automation-ui.js'),'utf8').replace("include('core.js');",''));
const boxes=[],lines=[],parameters={};
function box(id,maxclass,rect,extra={}){boxes.push({box:{id,maxclass,patching_rect:rect,...extra}});}
function obj(id,text,rect,extra={}){box(id,'newobj',rect,{text,...extra});}
function wire(a,out,b,input=0){lines.push({patchline:{source:[a,out],destination:[b,input]}});}
function comment(id,text,rect){box(id,'comment',rect,{text,fontsize:11,textcolor:[.85,.9,.95,1],presentation:1,presentation_rect:rect});}
obj('controller','js '+controller,[20,250,280,22],{varname:'controller',numinlets:1,numoutlets:3});
box('cube','jsui',[0,0,450,169],{filename:ui,jsarguments:[ui],numinlets:1,numoutlets:1,presentation:1,presentation_rect:[0,0,450,169]});
// A mouse gesture must go through the same Live parameters used by Push and automation.
obj('gesture','route point custom',[20,290,90,22]);obj('gesture-axes','unpack f f f',[20,330,120,22]);wire('cube',0,'gesture');wire('gesture',0,'gesture-axes');obj('custom-message','prepend custom',[20,350,120,22]);wire('gesture',1,'custom-message');wire('custom-message',0,'controller');
for(const [index,id]of ['x','y','z'].entries()){
 const label=['X blend','Y tilt','Z mids'][index],rect=[465+index*60,119,50,42];
 box(id,'live.dial',rect,{varname:id,parameter_enable:1,presentation:1,presentation_rect:rect,textcolor:[.85,.9,.95,1],saved_attribute_attributes:{valueof:{parameter_longname:label,parameter_shortname:label,parameter_type:0,parameter_mmin:0,parameter_mmax:1,parameter_initial:[.5],parameter_initial_enable:1,parameter_unitstyle:1,parameter_invisible:0}}});
 parameters[id]=[label,label,0];obj(id+'-message','prepend parameter '+id,[240+index*160,290,150,22]);wire(id,0,id+'-message');wire(id+'-message',0,'controller');wire('gesture-axes',index,id);
}
obj('banks','live.banks',[600,250,80,22]);parameters.parameterbanks={0:{index:0,name:'Cube',parameters:['Volume shape','X blend','Tone shape','Y tilt','Mid shape','Z mids','Volume curve','-']}};
// Assign native parameter buttons after Live has initialized the device.
box('bank-buttons','message',[600,280,530,22],{text:'edit 0 - @buttons 1 "Volume curve" 2 "Low / high curve" 4 "Mid curve"'});wire('defer',0,'bank-buttons');wire('bank-buttons',0,'banks');
obj('state','pattr automation_bindings @bindto controller @parameter_enable 1',[20,370,400,22],{saved_attribute_attributes:{valueof:{parameter_longname:'Track bindings',parameter_shortname:'Bindings',parameter_type:3,parameter_invisible:1}}});parameters.state=['Track bindings','Bindings',0];
// Compact enum text fits Push's button display; numeric curve identities stay unchanged.
const volume=['Site original','Linear','Equal power','Soft blend','Sharp cut','Custom'],eq=['Linear','Ease in','Ease out','S curve','Custom','Gentle sweep','Center hold','Fast center'];
const pushVolume=['O','L','E','B','K','C'],pushEq=['L','I','O','S','C','G','H','F'];
for(const [index,axis]of ['volume','tone','mid'].entries()){
 const id=axis+'Curve',label=['Volume curve','Low / high curve','Mid curve'][index],rect=[462+index*136,20,128,22],options=index?eq:volume,shortLabel=['X curve','Y curve','Z curve'][index];
 box(id,'live.menu',[462+index*136,780,128,22],{varname:id,parameter_enable:1,presentation:0,appearance:0,fontsize:11,textcolor:[.97,.98,1,1],activebgcolor:[.055,.075,.1,1],saved_attribute_attributes:{valueof:{parameter_longname:label,parameter_shortname:shortLabel,parameter_type:2,parameter_enum:index?pushEq:pushVolume,parameter_button_mode:'Cycle',parameter_mmin:0,parameter_mmax:options.length-1,parameter_initial:[index?0:2],parameter_initial_enable:1}}});parameters[id]=[label,shortLabel,0];
 box(id+'-gui','umenu',rect,{items:options.flatMap((text,i)=>i?[',',text]:[text]),presentation:1,presentation_rect:rect,fontsize:11});
 wire(id+'-gui',0,id);obj(id+'-gui-set','prepend set',[462+index*136,810,100,22]);wire(id,0,id+'-gui-set');wire(id+'-gui-set',0,id+'-gui');box(id+'-gui-init','message',[462+index*136,840,60,22],{text:'bang'});wire('defer',0,id+'-gui-init');wire(id+'-gui-init',0,id);
 comment(id+'-label',label,[rect[0],3,128,16]);obj(id+'-message','prepend parameter '+id,[460+index*170,700,160,22]);wire(id,0,id+'-message');wire(id+'-message',0,'controller');
 const shape=axis+'Shape',shapeLabel=['Volume shape','Tone shape','Mid shape'][index],shapeRect=[462+index*136,63,50,42];
 box(shape,'live.dial',shapeRect,{varname:shape,parameter_enable:1,presentation:1,presentation_rect:shapeRect,textcolor:[.85,.9,.95,1],saved_attribute_attributes:{valueof:{parameter_longname:shapeLabel,parameter_shortname:shapeLabel,parameter_type:0,parameter_mmin:0,parameter_mmax:1,parameter_initial:[index?.5:0],parameter_initial_enable:1,parameter_unitstyle:1}}});parameters[shape]=[shapeLabel,shapeLabel,0];
 obj(shape+'-message','prepend parameter '+shape,[460+index*170,740,160,22]);wire(shape,0,shape+'-message');wire(shape+'-message',0,'controller');
}
comment('title','SPECTRA CUBE · AUTOMATION 0.1.6',[880,3,290,20]);
comment('help','Push: curve buttons · shape / axis pairs',[880,147,290,20]);
comment('status','Choose tracks A and B',[214,148,660,20]);
for(let side=0;side<2;side++){
 const id='track-'+side,rect=[880,42+side*44,270,22];
 box(id,'umenu',rect,{varname:id,items:['Choose track…'],presentation:1,presentation_rect:rect,fontsize:12,textcolor:[.97,.98,1,1],bgcolor:[.055,.075,.1,1]});
 comment(id+'-label','Track '+(side?'B':'A'),[880,rect[1]-16,270,16]);
 obj(id+'-message','prepend track '+side,[500,330+side*40,120,22]);wire(id,0,id+'-message');wire(id+'-message',0,'controller');

}
box('refresh','textbutton',[880,113,90,18],{text:'Refresh tracks',fontsize:10,presentation:1,presentation_rect:[880,113,90,18]});box('refresh-message','message',[650,330,90,22],{text:'refreshtracks'});wire('refresh',0,'refresh-message');wire('refresh-message',0,'controller');
obj('ready','live.thisdevice',[20,410,100,22]);obj('defer','deferlow',[130,410,65,22]);box('init','message',[200,410,45,22],{text:'init'});wire('ready',0,'defer');wire('defer',0,'init');wire('init',0,'controller');
obj('ui-route','route axes status trackmenu trackchoice apiready curveview curve',[20,450,340,22]);wire('controller',2,'ui-route');obj('axes-ui','prepend axes',[20,490,100,22]);wire('ui-route',0,'axes-ui');wire('axes-ui',0,'cube');obj('status-ui','prepend set',[130,490,100,22]);wire('ui-route',1,'status-ui');wire('status-ui',0,'status');
obj('curves-ui','prepend curveview',[20,510,130,22]);wire('ui-route',5,'curves-ui');wire('curves-ui',0,'cube');obj('curve-select','route volume tone mid',[650,490,150,22]);wire('ui-route',6,'curve-select');for(const [i,axis]of ['volume','tone','mid'].entries()){obj(axis+'-set','prepend set',[650+i*110,530,100,22]);wire('curve-select',i,axis+'-set');wire(axis+'-set',0,axis+'Curve');wire(axis+'-set',0,axis+'Curve-gui');}
obj('choice-route','route 0 1',[450,450,85,22]);wire('ui-route',3,'choice-route');
for(let side=0;side<2;side++){wire('ui-route',2,'track-'+side);obj('set-track-'+side,'prepend set',[450+side*110,490,100,22]);wire('choice-route',side,'set-track-'+side);wire('set-track-'+side,0,'track-'+side);}
obj('values','route 0 1 2 3 4 5 6 7',[20,530,200,22]);obj('targets','route 0 1 2 3 4 5 6 7',[250,530,200,22]);wire('controller',0,'values');wire('controller',1,'targets');
for(let i=0;i<8;i++){obj('remote-'+i,'live.remote~ @normalized 0 @smoothing 15',[20+i*150,610,140,22]);obj('gate-'+i,'gate 1 0',[20+i*150,570,70,22]);wire('values',i,'remote-'+i);wire('targets',i,'gate-'+i,1);wire('ui-route',4,'gate-'+i);wire('gate-'+i,0,'remote-'+i,1);}
obj('midiin','midiin',[20,650,60,22]);obj('midiout','midiout',[100,650,60,22]);wire('midiin',0,'midiout');
const patcher={fileversion:1,appversion:{major:9,minor:1,revision:5,architecture:'x64',modernui:1},classnamespace:'box',rect:[80,80,1170,600],devicewidth:1170,openinpresentation:1,bgcolor:[.055,.075,.1,1],boxes,lines,parameters,dependency_cache:[controller,ui].map(name=>({name,bootpath:'.',type:'TEXT',implicit:1})),autosave:0};
function writeDevice(name,patch){const json=Buffer.from(JSON.stringify({patcher:patch},null,2)+'\n'),header=Buffer.alloc(32);header.write('ampf');header.writeUInt32LE(4,4);header.write('mmmm',8);header.write('meta',12);header.writeUInt32LE(4,16);header.write('ptch',24);header.writeUInt32LE(json.length,28);fs.writeFileSync(path.join(root,name+'.amxd'),Buffer.concat([header,json]));return json;}
fs.writeFileSync(path.join(root,'Spectra Cube Automation.maxpat'),writeDevice('Spectra Cube Automation',patcher));
const local=JSON.parse(JSON.stringify(patcher));for(const entry of local.boxes){const b=entry.box;if(b.id==='controller')b.text='js '+JSON.stringify(path.join(root,controller));if(b.id==='cube'){b.filename=path.join(root,ui);b.jsarguments=[b.filename];}}
writeDevice('Spectra Cube Automation Local',local);
console.log('Built Spectra Cube Automation: native Live X/Y/Z automation, saved Push bank, no internal recorder or modes.');
