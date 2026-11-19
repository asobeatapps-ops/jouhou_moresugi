import {drawPerson} from './art.js?v=office-7';
const INK='#365851';
function rr(c,x,y,w,h,r,fill,stroke=null,lw=1.5){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke()}}
function el(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,Math.PI*2);c.fillStyle=fill;c.fill()}
function ln(c,p,color=INK,w=2){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke()}
function pg(c,p,fill,stroke=null){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke()}}
function txt(c,t,x,y,size=12,color=INK,weight=700){c.font=`${weight} ${size}px -apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif`;c.fillStyle=color;c.textAlign='center';c.fillText(t,x,y)}
function grad(c,x,y,w,h,a,b){const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g}
function shadow(c,x,y,w,h){el(c,x,y,w,h,'#34534720')}
function windowArt(c,b){const{x,y,w,h}=b;rr(c,x+5,y+8,w,h,9,'#aab2a044');rr(c,x,y,w,h,8,'#b5c4ac','#839e8d',2);rr(c,x+8,y+8,w-16,h-17,3,grad(c,x,y,0,h,'#9ed1d2','#e4ecd2'));
 c.save();c.beginPath();c.rect(x+10,y+10,w-20,h-20);c.clip();for(let i=0;i<8;i++){const bh=h*(.18+(i*7%5)*.055),bx=x+9+i*w/7;rr(c,bx,y+h-bh,w*.12,bh,1,i%2?'#b4cbb6':'#c5d6bd');for(let j=0;j<3;j++)rr(c,bx+5,y+h-bh+9+j*12,3,5,0,'#dfe9cd')}
 pg(c,[[x+13,y+8],[x+w*.32,y+8],[x+w*.83,y+h],[x+w*.56,y+h]],'#ffffff27');pg(c,[[x+w*.53,y+8],[x+w*.62,y+8],[x+w,y+h*.8],[x+w,y+h]],'#ffffff20');c.restore();
 ln(c,[[x+w/2,y+8],[x+w/2,y+h-8]],'#f3f2df',7);ln(c,[[x+8,y+h*.55],[x+w-8,y+h*.55]],'#f3f2df',6);rr(c,x-8,y+h-4,w+16,11,3,'#d4d7bd','#98af98');rr(c,x+w-26,y+h*.42,5,26,2,'#718e7f');}
function fridgeArt(c,b,open,t){const{x,y,w,h}=b;shadow(c,x+w*.57,y+h+7,w*.66,10);pg(c,[[x+w-10,y+8],[x+w+12,y+20],[x+w+12,y+h-7],[x+w-10,y+h]],'#8fa9a3',INK);rr(c,x,y,w-5,h,10,grad(c,x,y,w,h,'#f4f5e6','#c1d2c3'),'#75988a',2);rr(c,x+5,y+5,w-15,h-11,7,'#eef2df');
 if(open){rr(c,x+9,y+14,w-24,h-28,5,grad(c,x,y,w,h,'#bddad3','#e8f1df'),'#8bb2a3');for(let i=0;i<3;i++){rr(c,x+14,y+h*(.29+i*.22),w-34,6,1,'#e5ede0','#a4c2b1');for(let j=0;j<2;j++){rr(c,x+22+j*(w*.32),y+h*(.18+i*.22),w*.14,h*.105,3,j?'#c4b180':'#a5c5b6','#8fa58e');rr(c,x+24+j*w*.32,y+h*(.18+i*.22)-3,w*.1,5,1,'#e3d8b9')}}
  pg(c,[[x+w-14,y+9],[x+w+21,y+31],[x+w+21,y+h-18],[x+w-14,y+h-5]],'#d7e4cf','#829f8e');ln(c,[[x+w+8,y+h*.29],[x+w+8,y+h*.54]],'#739383',4);
 }else{ln(c,[[x+7,y+h*.30],[x+w-11,y+h*.30]],'#a3b9a6',2);rr(c,x+w-27,y+h*.13,6,h*.12,3,'#7c9d8e');rr(c,x+w-27,y+h*.40,6,h*.23,3,'#7c9d8e');rr(c,x+17,y+22,w*.35,19,2,'#e8d3a3','#c4b68c');txt(c,'COOL',x+17+w*.175,y+35,9,'#9c855c')}
 rr(c,x+10,y+h-4,12,8,2,'#719080');rr(c,x+w-27,y+h-4,12,8,2,'#719080');}
function buttonArt(c,b,loose,t){const{x,y,w,h}=b;rr(c,x+3,y+6,w,h,12,'#43595030');rr(c,x,y,w,h,11,grad(c,x,y,w,h,'#efe9d9','#b8bda9'),'#7e9789',2);for(const dx of[10,w-10])for(const dy of[10,h-10]){el(c,x+dx,y+dy,2,2,'#a6aa96');ln(c,[[x+dx-1,y+dy],[x+dx+1,y+dy]],'#697e70',1)}
 const wiggle=loose?Math.sin(t*10)*2:0;c.save();c.translate(x+w*.5+wiggle,y+h*.51);el(c,0,7,w*.33,h*.30,'#8d6652');el(c,0,1,w*.33,h*.30,'#b96f55');el(c,0,-4,w*.29,h*.27,grad(c,-w*.25,-h*.2,w*.6,h*.6,'#f6a075','#d87858'));el(c,-w*.07,-h*.14,w*.17,h*.04,'#ffd0a777');txt(c,'!',0,h*.065,26,'#803f35',900);c.restore();}
function pcArt(c,b,portal,locked,small=false){const{x,y,w,h}=b;shadow(c,x+w*.49,y+h,w*.56,7);pg(c,[[x+w*.03,y+5],[x+w*.96,y],[x+w,y+h*.64],[x+w*.07,y+h*.68]],'#365b57','#244943');pg(c,[[x+w*.085,y+13],[x+w*.91,y+8],[x+w*.94,y+h*.58],[x+w*.12,y+h*.61]],portal?'#34364f':grad(c,x,y,w,h,'#97c9c0','#73aea7'));
 pg(c,[[x+w*.09,y+14],[x+w*.32,y+12],[x+w*.68,y+h*.59],[x+w*.12,y+h*.61]],'#e7f3df22');
 if(portal){for(let i=0;i<5;i++){c.strokeStyle=i%2?'#aaa7d8':'#718b9a';c.lineWidth=3;c.beginPath();c.ellipse(x+w*.52,y+h*.32,w*(.08+i*.046),h*(.055+i*.03),-.3,.3,Math.PI*1.95);c.stroke()}el(c,x+w*.52,y+h*.32,w*.08,h*.055,'#1d2933')}
 else if(locked){rr(c,x+w*.38,y+h*.25,w*.26,h*.2,4,'#e1e9cb');c.strokeStyle='#e1e9cb';c.lineWidth=4;c.beginPath();c.arc(x+w*.51,y+h*.25,w*.09,Math.PI,0);c.stroke();el(c,x+w*.51,y+h*.34,2,3,'#668c7c')}
 else{rr(c,x+w*.19,y+h*.19,w*.18,h*.15,3,'#f7e4b8');ln(c,[[x+w*.2,y+h*.205],[x+w*.28,y+h*.265],[x+w*.36,y+h*.205]],'#b49668',1.5);rr(c,x+w*.44,y+h*.17,w*.18,h*.16,3,'#cce5ca');rr(c,x+w*.69,y+h*.16,w*.15,h*.16,3,'#c5bfdf');ln(c,[[x+w*.20,y+h*.43],[x+w*.72,y+h*.41]],'#d9ecdb',3);ln(c,[[x+w*.21,y+h*.5],[x+w*.54,y+h*.49]],'#d9ecdb',2)}
 el(c,x+w*.52,y+h*.64,2,1.5,'#a4dcb1');pg(c,[[x+w*.43,y+h*.67],[x+w*.58,y+h*.66],[x+w*.63,y+h*.90],[x+w*.37,y+h*.92]],'#759a89');pg(c,[[x+w*.32,y+h*.91],[x+w*.68,y+h*.89],[x+w*.75,y+h*.98],[x+w*.26,y+h]],'#adc1a8','#749384');}
function filesArt(c,b,open=false){const{x,y,w,h}=b;shadow(c,x+w*.51,y+h*.90,w*.58,6);c.save();c.translate(x+w*.5,y+h*.5);c.rotate(-.10);rr(c,-w*.45,-h*.42,w*.89,h*.80,4,'#ede5cf','#b1b399');for(let i=0;i<3;i++)ln(c,[[-w*.31,-h*.20+i*10],[w*.25,-h*.20+i*10]],'#a7bca3',1.4);pg(c,[[-w*.52,-h*.18],[-w*.33,-h*.18],[-w*.25,-h*.34],[w*.48,-h*.34],[w*.53,h*.42],[-w*.49,h*.48]],open?'#ca8e6c':'#d9a17b','#a47255');rr(c,-w*.25,-h*.08,w*.56,h*.28,2,'#f5e5c4');txt(c,'ひみつ',w*.03,h*.10,13,'#a4664e');c.restore();}
function catArt(c,b,t,excited=false){const{x,y,w,h}=b;shadow(c,x+w*.5,y+h*.94,w*.54,6);const tail=Math.sin(t*(excited?7:2))*7;c.save();c.translate(x,y);ln(c,[[w*.28,h*.76],[w*.10,h*.61],[w*.08,h*.32+tail],[w*.16,h*.23+tail]],'#c9a06c',w*.12);el(c,w*.49,h*.72,w*.31,h*.23,'#d6ad79');el(c,w*.56,h*.77,w*.23,h*.17,'#efd0a0');pg(c,[[w*.52,h*.42],[w*.49,h*.07],[w*.68,h*.20],[w*.88,h*.09],[w*.86,h*.48]],'#d2a16d',INK);pg(c,[[w*.54,h*.14],[w*.56,h*.31],[w*.65,h*.24]],'#dba08c');pg(c,[[w*.84,h*.16],[w*.82,h*.32],[w*.73,h*.24]],'#dba08c');el(c,w*.69,h*.43,w*.21,h*.25,'#e6bd86');ln(c,[[w*.56,h*.40],[w*.63,h*.43]],'#775944',2);ln(c,[[w*.75,h*.43],[w*.82,h*.39]],'#775944',2);pg(c,[[w*.67,h*.49],[w*.73,h*.49],[w*.70,h*.55]],'#a9745c');for(let i=0;i<2;i++){ln(c,[[w*.57,h*(.53+i*.08)],[w*.42,h*(.51+i*.11)]],'#8f7055',1);ln(c,[[w*.81,h*(.53+i*.08)],[w*.96,h*(.51+i*.11)]],'#8f7055',1)}el(c,w*.49,h*.91,w*.12,h*.055,'#f1d7ad');el(c,w*.76,h*.90,w*.11,h*.055,'#f1d7ad');c.restore();}
function trashArt(c,b){const{x,y,w,h}=b;shadow(c,x+w*.5,y+h,w*.62,9);pg(c,[[x+w*.05,y+14],[x+w*.95,y+14],[x+w*.82,y+h-6],[x+w*.18,y+h-6]],grad(c,x,y,w,h,'#bed0c2','#87a897'),'#608576');el(c,x+w*.5,y+h-6,w*.32,7,'#8dab9b');for(let i=0;i<5;i++)ln(c,[[x+w*(.21+i*.14),y+27],[x+w*(.27+i*.11),y+h-13]],'#d6e3d1',3);el(c,x+w*.5,y+15,w*.48,13,'#dce4d2');el(c,x+w*.5,y+15,w*.38,8,'#6e8e7f');pg(c,[[x+w*.26,y+12],[x+w*.29,y-7],[x+w*.48,y-2],[x+w*.60,y+11]],'#f1e8ce','#bac5ac');ln(c,[[x+w*.34,y-1],[x+w*.46,y+3]],'#b8bda6',1)}
function character(c,b,boss,t,mood){const scale=b.h/220,x=b.x+b.w/2,y=b.y+40*scale;shadow(c,x,b.y+b.h,44*scale,8*scale);c.save();c.translate(x,y);c.scale(scale,scale);pg(c,[[-24,90],[-3,90],[-6,166],[-23,166]],boss?'#747b70':'#5c7872',INK);pg(c,[[2,90],[24,90],[27,166],[9,166]],boss?'#858a7a':'#6c8980',INK);el(c,-16,169,17,6,'#3d5750');el(c,20,169,17,6,'#3d5750');c.restore();drawPerson(c,x,y,scale,boss,mood==='panic'?2:0,t,mood,false)}
function drawerArt(c,b,open){const{x,y,w,h}=b;rr(c,x,y,w,h,4,'#ab916d','#8b795f');rr(c,x+5,y+5,w-10,h-10,3,grad(c,x,y,w,h,'#dbc29b','#c4a57f'),'#a48d6a');if(open){pg(c,[[x+5,y+5],[x+w-5,y+5],[x+w+13,y+26],[x+18,y+26]],'#7c846b');rr(c,x+13,y+22,w-5,h-9,3,'#d9bd91','#977c5a');ln(c,[[x+28,y+15],[x+w-16,y+15]],'#e9e4ce',9)}rr(c,x+w*.36,y+h*.36,w*.28,6,3,'#8c8b6b');el(c,x+w*.5,y+h*.62,3,3,'#7b8164')}
function plant(c,x,y,k){shadow(c,x,y+55*k,30*k,7*k);rr(c,x-20*k,y,40*k,50*k,4,grad(c,x,y,40*k,50*k,'#d7b391','#b38d6d'),'#a48163');ln(c,[[x,y+3*k],[x,y-65*k]],'#6c8e6a',5*k);for(let i=0;i<6;i++){c.save();c.translate(x,y-(12+i*8)*k);c.rotate((i%2?1:-1)*.75);el(c,(i%2?1:-1)*17*k,-2*k,24*k,8*k,i%2?'#8cb489':'#a2bf94');c.restore()}}
export class OfficeArt{
 constructor(canvas){this.canvas=canvas;this.c=canvas.getContext('2d');this.width=0;this.height=0;this.dpr=0}
 draw(layout,state={},time=0,options={}){
  const c=this.c,dpr=Math.min(devicePixelRatio||1,2),{w,h,k,boxes:b,desk}=layout;
  if(this.width!==layout.width||this.height!==layout.height||dpr!==this.dpr){this.width=layout.width;this.height=layout.height;this.dpr=dpr;this.canvas.width=Math.round(layout.width*dpr);this.canvas.height=Math.round(layout.height*dpr)}
  c.setTransform(dpr*layout.scale,0,0,dpr*layout.scale,0,0);c.clearRect(0,0,w,h);
  const floor=h*.49;c.fillStyle=grad(c,0,0,w,floor,'#edf0de','#d9e1cb');c.fillRect(0,0,w,floor);c.fillStyle=grad(c,0,floor,w,h-floor,'#d7c7aa','#c5b496');c.fillRect(0,floor,w,h-floor);
  for(let i=0;i<11;i++){const y=floor+(h-floor)*(i/10)**1.45;ln(c,[[0,y],[w,y]],'#b9aa8c55',1)}for(let i=-4;i<12;i++)ln(c,[[w*.45+(i-3)*75,floor],[i*w/7,h]],'#a9957655',1);
  rr(c,0,floor-7,w,13,0,'#d8d9c0');ln(c,[[0,floor+6],[w,floor+6]],'#aebaa0',2);
  pg(c,[[b.window.x+30,b.window.y+b.window.h],[b.window.x+b.window.w-10,b.window.y+b.window.h],[w*.82,h*.89],[w*.32,h*.90]],'#fff9d826');
  windowArt(c,b.window);fridgeArt(c,b.fridge,state.doorOpen,time);if(!state.loose)buttonArt(c,b.button,state.buttonTaps>0,time);else{rr(c,b.button.x,b.button.y,b.button.w,b.button.h,10,'#adb39c','#7e9789');el(c,b.button.x+b.button.w/2,b.button.y+b.button.h/2,b.button.w*.29,b.button.h*.28,'#667d6b')}
  const posterX=layout.wide?470:405,posterY=80*k;rr(c,posterX,posterY,120*k,119*k,5,'#b2c3a6','#95ab91');rr(c,posterX+7*k,posterY+7*k,106*k,105*k,2,'#e7e6ce');rr(c,posterX+24*k,posterY+23*k,44*k,54*k,1,'#f6eccd','#ccc5a6');ln(c,[[posterX+32*k,posterY+36*k],[posterX+60*k,posterY+36*k]],'#b1b6a0',2);ln(c,[[posterX+32*k,posterY+47*k],[posterX+57*k,posterY+47*k]],'#b1b6a0',2);
  plant(c,layout.wide?70:40,floor+40*k,k);
  const dy=desk.y,dx=desk.x,dw=desk.w,dd=desk.depth;shadow(c,dx+dw*.54,dy+dd+142*k,dw*.58,32*k);
  for(const x of[dx+35*k,dx+dw-25*k])pg(c,[[x,dy+dd-10*k],[x+14*k,dy+dd-10*k],[x+18*k,dy+dd+155*k],[x+2*k,dy+dd+155*k]],'#8c8068',INK);
  character(c,b.boss,true,time,options.bossMood||'smile');
  pg(c,[[dx,dy],[dx+dw-33*k,dy-22*k],[dx+dw,dy+dd-22*k],[dx+18*k,dy+dd]],grad(c,dx,dy,dw,dd,'#d9bb8f','#c0a078'),'#a68c67');
  pg(c,[[dx+18*k,dy+dd],[dx+dw,dy+dd-22*k],[dx+dw,dy+dd-6*k],[dx+18*k,dy+dd+16*k]],'#b59770','#9e835f');ln(c,[[dx+22*k,dy+dd-5*k],[dx+dw-5*k,dy+dd-27*k]],'#ebd3a455',2);
  drawerArt(c,b.drawer,state.drawerOpen);
  if(options.drag?.source!=='pc')pcArt(c,b.pc,state.portalOpen,state.lockTaps>0);
  const kbX=b.pc.x+b.pc.w*.61,kbY=desk.y+13*k;pg(c,[[kbX,kbY],[kbX+116*k,kbY-7*k],[kbX+135*k,kbY+15*k],[kbX+13*k,kbY+24*k]],'#e8e4ce','#a6b199');for(let i=0;i<7;i++)ln(c,[[kbX+(13+i*15)*k,kbY+2*k],[kbX+(22+i*15)*k,kbY+16*k]],'#b1baa3',1.5);
  const cupX=desk.x+desk.w*.48,cupY=desk.y-16*k;shadow(c,cupX,cupY+39*k,22*k,4*k);rr(c,cupX-13*k,cupY,26*k,38*k,7,'#e8d9b6','#b3a489');el(c,cupX,cupY,12*k,4*k,'#b09974');ln(c,[[cupX+12*k,cupY+7*k],[cupX+20*k,cupY+10*k],[cupX+20*k,cupY+22*k],[cupX+12*k,cupY+24*k]],'#c4b292',3*k);
  if(options.drag?.source!=='files')filesArt(c,b.files,state.folderOpen);
  trashArt(c,b.trash);if(options.drag?.source!=='cat')catArt(c,b.cat,time,options.selected==='cat');character(c,b.self,false,time,options.playerMood||'attentive');
  if(state.loose&&b.looseButton){const body=state.loose,box=b.looseButton,cx=box.x+box.w/2,cy=box.y+box.h/2,r=box.w/2;shadow(c,cx,h-6,r*.9,5*k);c.save();c.translate(cx,cy);c.rotate(body.angle);el(c,0,3,r,r,'#985843');el(c,0,-2,r*.92,r*.92,grad(c,-r,-r,r*2,r*2,'#ffb280','#db7653'));el(c,-r*.2,-r*.5,r*.38,r*.13,'#ffdbb388');txt(c,'!',0,r*.28,r*1.1,'#793c31',900);c.restore()}
  const targets=options.drag?state.targetsFor(options.drag.source):[];
  for(const [id,box]of Object.entries(layout.hits)){
   const active=options.selected===id||targets.includes(id)||id==='self'&&state.trueEligible;
   if(active){c.save();c.shadowColor=targets.includes(id)?'#76b58b99':'#d6b76d66';c.shadowBlur=12;rr(c,box.x-6,box.y-6,box.w+12,box.h+12,12,'#fff9df08',targets.includes(id)?'#80ad83':id==='self'&&state.trueEligible?'#d7b468':'#dcbe7b',2.2);c.restore()}

  }
  if(options.drag){const source=b[options.drag.source];if(source&&['pc','files','cat','button'].includes(options.drag.source)){const moved={...source,x:options.drag.point.x-source.w/2,y:options.drag.point.y-source.h/2};shadow(c,options.drag.point.x,options.drag.point.y+source.h/2+18*k,source.w*.6,9*k);if(options.drag.source==='pc')pcArt(c,moved,state.portalOpen,state.lockTaps>0);if(options.drag.source==='files')filesArt(c,moved,true);if(options.drag.source==='cat')catArt(c,moved,time,true);if(options.drag.source==='button'){ln(c,[[source.x+source.w/2,source.y+source.h/2],[options.drag.point.x,options.drag.point.y]],'#ac8c61',3);buttonArt(c,moved,true,time)}}}
 }
}
