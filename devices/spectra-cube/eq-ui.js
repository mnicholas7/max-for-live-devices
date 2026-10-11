autowatch=0;
inlets=1;
outlets=1;
mgraphics.init();mgraphics.relative_coords=0;mgraphics.autofill=0;
var view={manual:0,strips:[{name:'Track A',values:[]},{name:'Track B',values:[]}]},active=null;
function eqview(json){view=JSON.parse(json);mgraphics.redraw();}
function label(text,x,y,size,color){mgraphics.set_source_rgba(color);mgraphics.select_font_face('Arial');mgraphics.set_font_size(size);mgraphics.move_to(x,y);mgraphics.show_text(String(text));}
function rectangle(x,y,width,height,color){mgraphics.set_source_rgba(color);mgraphics.rectangle(x,y,width,height);mgraphics.fill();}
function paint(){mgraphics.save();mgraphics.scale(1,(box.rect[3]-box.rect[1])/169);drawStrips();mgraphics.restore();}
function drawStrips(){
 rectangle(0,0,408,169,[.055,.075,.1,1]);
 for(var side=0;side<2;side++){
  var left=side*204+8,strip=view.strips[side],accent=side?[1,.68,.3,1]:[.35,.9,.9,1],white=[.94,.97,1,1],dim=[.5,.57,.64,1];
  var mapped=0;for(var lane=0;lane<4;lane++)if(strip.values[lane])mapped++;
  label((side?'B / ':'A / ')+strip.name.substring(0,12)+' · '+(view.manual?'MANUAL ': 'CUBE ')+mapped+'/4',left,14,10,mapped===4?accent:dim);
  for(var lane=0;lane<4;lane++){var value=strip.values[lane],x=left+lane*48;label(['VOL','LOW','MID','HIGH'][lane],x,29,9,value?white:dim);rectangle(x+12,35,18,44,[.12,.18,.23,1]);if(value)rectangle(x+12,79-value.position*44,18,value.position*44,accent);label(value?value.text:'—',x,92,8,value?white:dim);}
  for(var lane=4;lane<6;lane++){var value=strip.values[lane],y=100+(lane-4)*17;label(lane===4?'LOW Hz':'HIGH Hz',left,y+9,9,value?white:dim);rectangle(left+52,y,72,10,[.12,.18,.23,1]);if(value)rectangle(left+52,y,value.position*72,10,accent);label(value?value.text:'—',left+129,y+9,8,value?white:dim);}
  for(var lane=6;lane<9;lane++){var value=strip.values[lane],x=left+(lane-6)*64;rectangle(x,135,60,14,value&&value.position>.5?accent:[.12,.18,.23,1]);label(['LOW ON','MID ON','HI ON'][lane-6],x+4,146,8,value&&value.position>.5?[.04,.07,.09,1]:dim);}
  for(var lane=9;lane<11;lane++){var value=strip.values[lane],x=left+(lane-9)*98;rectangle(x,153,94,14,[.12,.18,.23,1]);label(value?(lane===9?'SLOPE '+value.text:'EQ '+(value.position>.5?'ON':'OFF')):'UNAVAILABLE',x+3,164,8,value?white:dim);}
 }
}
function hit(x,y){var side=Math.floor(x/204),local=x-side*204-8;if(side<0||side>1||local<0||local>192)return null;if(y>=35&&y<=79)return {side:side,lane:Math.floor(local/48),kind:'gain'};if(y>=100&&y<132&&local>=52&&local<=124)return {side:side,lane:y<117?4:5,kind:'frequency'};if(y>=135&&y<=149)return {side:side,lane:6+Math.min(2,Math.floor(local/64)),kind:'button'};if(y>=153&&y<=167)return {side:side,lane:local<98?9:10,kind:'button'};return null;}
function edit(x,y){if(!active)return;var value=view.strips[active.side].values[active.lane];if(!value)return;var position=active.kind==='gain'?Math.max(0,Math.min(1,(79-y)/44)):active.kind==='frequency'?Math.max(0,Math.min(1,(x-active.side*204-60)/72)):value.position>.5?0:1;outlet(0,'eqedit',active.side,active.lane,position);}
function onclick(x,y){y=y*169/(box.rect[3]-box.rect[1]);active=hit(x,y);edit(x,y);if(active&&active.kind==='button')active=null;}
function ondrag(x,y,button){if(!button){active=null;return;}edit(x,y*169/(box.rect[3]-box.rect[1]));}
