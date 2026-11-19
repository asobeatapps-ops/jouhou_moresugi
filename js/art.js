const INK='#26494b',SKIN='#eab999';
function rect(c,x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1.6;c.stroke()}}
function ellipse(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill()}
function line(c,points,color,width=2){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke()}
function text(c,t,x,y,size=14,color=INK,weight=700){c.fillStyle=color;c.font=`${weight} ${size}px -apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif`;c.textAlign='center';c.fillText(t,x,y)}
function poly(c,points,color,stroke){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke()}}
function person(c,x,y,s,boss=false,panic=0,t=0,mood=null,groundShadow=true){c.save();c.translate(x,y);c.scale(s,s);const bob=panic?Math.sin(t*7)*2:Math.sin(t*1.5);c.translate(0,bob);
 if(groundShadow)ellipse(c,0,109,36,6,'#2e554727');
 const shirt=c.createLinearGradient(-30,0,35,100);shirt.addColorStop(0,boss?'#c3bba2':'#7ea994');shirt.addColorStop(1,boss?'#9a9685':'#527e73');
 poly(c,[[-23,21],[-34,62],[-24,98],[25,98],[32,54],[21,21]],shirt,INK);
 poly(c,[[-19,26],[-7,36],[0,26],[8,36],[19,26],[6,17],[-6,17]],'#f6f3e5');
 rect(c,-7,9,14,19,4,SKIN);poly(c,[[-6,24],[0,31],[7,24],[5,16],[-5,16]],'#d19a7e');
 if(boss){poly(c,[[0,32],[-5,43],[-1,69],[4,43]],'#4c726d');poly(c,[[-21,25],[-8,33],[-12,54],[-24,34]],'#d8d1be');poly(c,[[20,25],[8,33],[11,53],[25,34]],'#b2ad9b')}
 else{line(c,[[-13,28],[-5,62],[10,62],[15,28]],'#e9dcaa',2);rect(c,-7,54,16,17,2,'#f9f4dc', '#819c8c');rect(c,-3,58,8,4,1,'#ed8c60')}
 // A continuous, warm skin tone replaces the isolated dark cheek patch.
 const face=c.createLinearGradient(-20,-24,20,19);face.addColorStop(0,'#f2c9ad');face.addColorStop(1,'#ebbb9e');
 ellipse(c,0,-11,23,29,INK);ellipse(c,-22,-4,4,7,SKIN);ellipse(c,22,-4,4,7,SKIN);ellipse(c,0,-6,21,27,face);
 poly(c,[[-22,-14],[-20,-32],[-9,-39],[9,-40],[24,-29],[22,-10],[12,-20],[3,-23],[-10,-13]],boss?'#4c4d49':'#263e45');line(c,[[-13,-31],[-2,-34],[13,-30]],boss?'#818278':'#596d6b',2.4);
 const emotion=mood||(panic>=2?'panic':panic?'worried':'smile');
 const joyful=['happy','smile','confident'].includes(emotion),startled=['surprised','shocked','panic'].includes(emotion),worried=emotion==='worried'||emotion==='panic';
 const blink=Math.sin(t*.85)>.997;
 if(worried){line(c,[[-15,-11],[-5,-15]],INK,1.6);line(c,[[6,-15],[16,-11]],INK,1.6)}
 else if(startled){line(c,[[-15,-15],[-5,-17]],INK,1.6);line(c,[[6,-17],[16,-15]],INK,1.6)}
 else if(joyful){line(c,[[-14,-11],[-9,-13],[-4,-11]],INK,1.5);line(c,[[5,-11],[10,-13],[15,-11]],INK,1.5)}
 else{line(c,[[-14,-10],[-5,-10]],INK,1.5);line(c,[[6,-10],[15,-10]],INK,1.5)}
 if(emotion==='happy'||blink){line(c,[[-13,-2],[-9,-5],[-5,-2]],INK,1.7);line(c,[[6,-2],[10,-5],[14,-2]],INK,1.7)}
 else{const wide=startled?5:3.6;for(const x of[-8,10]){ellipse(c,x,-3,3.5,wide,'#fffdf2');ellipse(c,x,-2,1.8,startled?2.2:2.8,INK);ellipse(c,x-.5,-3.3,.8,1,'#ffffff')}}
 line(c,[[1,0],[-1,5],[2,6]],'#bd947e',.9);
 if(emotion==='happy'){ellipse(c,1,13,7,5,'#975f50');line(c,[[-3,11],[5,11]],'#fff6e8',2)}
 else if(emotion==='shocked'||emotion==='panic'){ellipse(c,1,14,5,7,'#975f50');ellipse(c,1,17,3,2,'#d7937b')}
 else if(emotion==='surprised'){ellipse(c,1,13,3.3,4.5,'#975f50')}
 else if(emotion==='talk'){ellipse(c,1,13,5,3+Math.sin(t*8)*1.5,'#975f50')}
 else if(worried)line(c,[[-5,15],[0,12],[6,15]],'#975f50',1.5);
 else if(emotion==='attentive')line(c,[[-4,13],[5,13]],'#975f50',1.4);
 else line(c,[[-5,11],[-1,14],[3,14],[7,10]],'#975f50',1.5);
 // Sweat stays outside the face, and only appears when the office is in trouble.
 if(worried||emotion==='shocked')poly(c,[[28,-22],[24,-12],[28,-10],[31,-13]],'#9ecbd2');
 if(emotion==='happy'){line(c,[[29,-26],[29,-18]],'#dba052',1.5);line(c,[[25,-22],[33,-22]],'#dba052',1.5)}
 if(boss){rect(c,-16,-8,13,10,3,'#ffffff10',INK);rect(c,4,-8,13,10,3,'#ffffff10',INK);line(c,[[-3,-4],[4,-4]],INK,1);poly(c,[[-36,49],[-19,54],[-10,79],[-27,76]],'#aaa693',INK);rect(c,-22,56,38,35,3,'#274b4e',INK);rect(c,-17,60,28,24,1,'#74988b');ellipse(c,14,77,5,6,SKIN)}else{poly(c,[[-27,29],[-40,41],[-38,77],[-12,78],[-11,68],[-27,65]],'#77a28d',INK);ellipse(c,-9,73,7,5,SKIN);poly(c,[[25,30],[36,49],[31,74],[11,77],[10,67],[23,63]],'#648e7e',INK);ellipse(c,9,72,7,5,SKIN)}
 c.restore()}
function monitor(c,x,y,s=1,broken=false){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,0,46,43,5,'#193d4220');poly(c,[[-44,-30],[42,-35],[46,24],[-40,29]],'#294f51');poly(c,[[-38,-24],[36,-28],[39,18],[-34,22]],broken?'#ce8771':'#83b9b2');poly(c,[[-38,-24],[-15,-26],[14,20],[-34,22]],'#c6e3d22d');line(c,[[-27,-12],[17,-15]],'#e1f2de',3);line(c,[[-26,-2],[3,-4]],'#d0e5cc',2);line(c,[[-25,8],[23,5]],'#bfdac4',2);poly(c,[[-6,27],[4,26],[6,42],[-15,44]],'#537471');rect(c,-25,42,40,5,2,'#325958');if(broken)line(c,[[12,-26],[0,-8],[15,0],[4,20]],'#5e3c36',2);c.restore()}
function paper(c,x,y,angle=0,color='#fbf7e7',s=1){c.save();c.translate(x,y);c.rotate(angle);c.scale(s,s);rect(c,-11,-15,22,30,2,color,'#6f8b7d');line(c,[[-6,-7],[6,-7]],'#9cae96',1.5);line(c,[[-6,-1],[6,-1]],'#9cae96',1.5);line(c,[[-6,5],[2,5]],'#9cae96',1.5);c.restore()}
function globe(c,x,y,r){ellipse(c,x,y,r,r,'#82bdb4');c.save();c.beginPath();c.arc(x,y,r-1,0,Math.PI*2);c.clip();poly(c,[[x-r,y-r/4],[x-r/2,y-r/2],[x,y-r/3],[x+r/5,y],[x-r/5,y+r/4],[x-r/3,y+r*.8]],'#c5d1a2');poly(c,[[x+r*.5,y-r],[x+r*.2,y-r*.3],[x+r*.7,y+r*.3],[x+r,y+r*.15],[x+r,y-r]],'#cad5ac');ellipse(c,x-r*.3,y-r*.4,r*.7,r*.18,'#f7fff02a');c.restore();c.strokeStyle='#436d69';c.lineWidth=2;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();c.beginPath();c.ellipse(x,y,r*.5,r,0,0,Math.PI*2);c.strokeStyle='#436d6955';c.stroke();line(c,[[x-r,y],[x+r,y]],'#436d6955',1)}
function office(c,t,miss=0,emotions={}){
 const wall=c.createLinearGradient(0,0,0,260);wall.addColorStop(0,'#e3ecdf');wall.addColorStop(1,'#f0edda');c.fillStyle=wall;c.fillRect(0,0,540,260);
 rect(c,38,12,204,130,4,'#9eb9ac','#769a8c');rect(c,44,18,192,116,2,'#d2e8dc');const sky=c.createLinearGradient(0,20,0,130);sky.addColorStop(0,'#a8d0cb');sky.addColorStop(1,'#e1edd6');rect(c,48,22,184,108,0,sky);for(let i=0;i<6;i++){const h=20+(i*23)%47;rect(c,49+i*32,130-h,22,h,0,i%2?'#bdd3c0':'#c8dac5')};line(c,[[140,20],[140,134]],'#f5f3df',6);line(c,[[44,84],[234,84]],'#f5f3df',5);poly(c,[[46,19],[108,19],[181,134],[122,134]],'#ffffff26');rect(c,29,138,224,9,2,'#aabca0');
 rect(c,374,34,106,81,5,'#b1c5af','#8fa58e');rect(c,380,40,94,69,2,'#e9e9d4');paper(c,398,64,-.08,'#f6edd0',.65);paper(c,435,65,.12,'#f2d4b8',.7);rect(c,388,89,65,6,1,'#b9c9ac');
 rect(c,435,160,63,69,3,'#aec0a4','#789480');for(let i=0;i<3;i++){rect(c,441,166+i*19,51,15,2,'#d6ddc3','#95ab90');rect(c,462,171+i*19,10,3,1,'#87a18b')}
 poly(c,[[0,222],[540,222],[540,260],[0,260]],'#c5d1b5');line(c,[[0,222],[540,222]],'#a7b89e',2);line(c,[[270,222],[220,260]],'#acbda133',1);line(c,[[120,222],[0,260]],'#acbda133',1);
 // Plant and side table give the room depth without external image assets.
 rect(c,18,179,32,47,3,'#bd9771','#9f825e');line(c,[[34,186],[34,129]],'#557e61',4);for(let i=0;i<6;i++){c.save();c.translate(33,141+i*7);c.rotate((i%2?1:-1)*.8);ellipse(c,i%2?11:-11,-3,17,6,i%2?'#649b78':'#7eab7c');c.restore()}
 rect(c,285,142,59,72,11,'#7d9c8a','#5c8276');rect(c,309,209,10,22,3,'#658477');line(c,[[291,233],[337,233]],'#51786f',3);
 person(c,209,144,.98,false,miss,t,emotions.player);person(c,358,126,1.05,true,miss,t,emotions.boss);
 poly(c,[[91,190],[303,181],[331,204],[107,215]],'#d1b28d','#a68865');poly(c,[[107,215],[331,204],[330,215],[107,226]],'#b7966c');poly(c,[[117,224],[127,223],[123,260],[114,260]],'#8d8268');poly(c,[[311,216],[320,215],[325,260],[317,260]],'#887d65');monitor(c,150,162,.8,miss>=2);poly(c,[[204,194],[252,190],[264,199],[213,204]],'#d1d9c2','#98ad94');for(let i=0;i<5;i++)line(c,[[213+i*8,195],[217+i*8,200]],'#a1b39c',1);rect(c,267,172,14,23,4,'#efe6c9','#b4af91');ellipse(c,274,172,6,2,'#977b5c');paper(c,128,203,-.1,'#f5efd7',.6);
 if(miss>0){for(let i=0;i<6+miss*3;i++){const a=t*.4+i*2.4;paper(c,270+Math.cos(a)*((i*39)%230),50+((i*33+t*33)%150),a*.3,'#faf3df',.45)}text(c,'!',405,70+Math.sin(t*4)*3,29,'#c65543')}
 if(miss>=2){for(let i=0;i<5;i++)ellipse(c,188+Math.sin(i+t)*10,139-i*10-((t*10)%20),9+i*2,8,'#687c7345');line(c,[[491,127],[479,143],[491,147],[481,161]],'#df8959',3);rect(c,371,38,112,78,4,'#b8513920');text(c,'SYSTEM ERROR',427,83,11,'#a94a3c')}
}
export class Art{
 constructor(canvas){this.canvas=canvas;this.c=canvas.getContext('2d');this.w=0;this.h=0;this.dpr=0}
 prepare(cover=false){const r=this.canvas.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,2);if(r.width<1||r.height<1)return false;if(this.w!==r.width||this.h!==r.height||this.dpr!==d){this.w=r.width;this.h=r.height;this.dpr=d;this.canvas.width=Math.round(r.width*d);this.canvas.height=Math.round(r.height*d)}const c=this.c;c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,this.w,this.h);c.save();if(cover){const scale=Math.max(this.w/540,this.h/260);c.translate((this.w-540*scale)/2,(this.h-260*scale)/2);c.scale(scale,scale)}else c.scale(this.w/540,this.h/260);return true}
 office(t,miss=0,emotions={}){if(!this.prepare(true))return;office(this.c,t,miss,emotions);this.c.restore()}
 ending(end,t,reduced=false){if(!this.prepare())return;const c=this.c,p=reduced?1:Math.min(1,t/2.8),motion=reduced?0:t;const x=270,y=124;const col=end.color;
 c.fillStyle='#e5e9dc';c.fillRect(0,0,540,260);for(let i=0;i<18;i++){c.fillStyle='#9aaf9322';c.fillRect((i*83)%540,(i*47)%250,2,2)}
 c.save();c.globalAlpha=.11;office(c,0,0);c.restore();
 if(end.scene==='complete'){
  person(c,x-53,y+1,1.05,false,0,motion,'happy');person(c,x+66,y-7,1.05,true,0,motion,'smile');
  ellipse(c,x,y-77,24,24,'#8abda3');text(c,'✓',x,y-69,28,'#fff9e5');
  for(let i=0;i<18;i++){const xx=45+(i*61)%455,yy=22+((i*23+motion*22)%190);c.save();c.translate(xx,yy);c.rotate(i+motion*.5);rect(c,-3,-3,7,4,1,['#8abda3','#edb478','#d2b4ce'][i%3]);c.restore()}
 }
 else if(end.scene==='button-window'){globe(c,x+85,y+25,46);const px=x-110+p*150,py=y+25-Math.sin(p*Math.PI)*75;c.save();c.translate(px,py);c.rotate(motion*3);ellipse(c,0,0,35,35,'#d77853');ellipse(c,-3,-5,29,29,'#f1a375');text(c,'!',0,11,34,'#783e32');c.restore();for(let i=0;i<6;i++)text(c,'✦',55+i*75,40+(i%3)*75,15,col);text(c,'SPACE NEIGHBORHOOD',x,237,12)}
 else if(end.scene==='button-trash'){poly(c,[[x-53,y-17],[x+53,y-17],[x+40,y+79],[x-40,y+79]],'#9ebaa4',INK);ellipse(c,x,y-17,53,13,'#5e8171');ellipse(c,x,y-43,27,27,'#ed956b');text(c,'!',x,y-33,30,'#7e4338');poly(c,[[x-45,y-60],[x-52,y-92],[x-19,y-76],[x,y-104],[x+19,y-76],[x+52,y-92],[x+45,y-60]],'#dfbe72',INK);text(c,'NEW CEO',x,y+43,18,'#294e44');for(let i=0;i<6;i++)paper(c,65+i*81,40+((i*53+motion*25)%175),i*.4,'#eee6cf',.5)}
 else if(end.scene==='world'){globe(c,x,y,66);for(let i=0;i<9;i++){let a=i*.7+motion*.5;paper(c,x+Math.cos(a)*135*p,y+Math.sin(a)*88*p,a*.3,'#f8ead4',.65)}text(c,'PUBLIC',x,y+4,20,'#274c4a');}
 else if(end.scene==='sleep'){person(c,x,y-8,1.35,false,0,0);rect(c,x-70,y+91,140,9,3,'#bea383');for(let i=0;i<3;i++)text(c,'Z',x+45+i*20,y-35-i*22-Math.sin(motion+i)*4,14+i*4,'#9e8a62');}
 else if(end.scene==='send'){for(let i=0;i<12;i++){let f=((motion*.55+i*.083)%1);const px=60+f*420,py=40+((i*57)%160);poly(c,[[px-25,py-9],[px+20,py],[px-10,py+17],[px-8,py+2]],i%2?col:'#f7efd8',INK);line(c,[[px-45,py],[px-32,py]],'#a9bda2',2)}}
 else if(end.scene==='freeze'){monitor(c,x,y+5,1.9);for(let i=0;i<9;i++){const xx=80+(i*51)%400,yy=40+(i*37)%170;c.save();c.translate(xx,yy);c.rotate(i+motion*.05);for(let j=0;j<3;j++){c.rotate(Math.PI/3);line(c,[[-15,0],[15,0]],'#89a8c3',2)}c.restore()}text(c,'APPROVAL REQUIRED',x,234,11,'#637f9f')}
 else if(end.scene==='shield'){poly(c,[[x,y-83],[x+70,y-58],[x+59,y+22],[x,y+83],[x-59,y+22],[x-70,y-58]],col,INK);poly(c,[[x,y-61],[x+49,y-43],[x+41,y+10],[x,y+57],[x-41,y+10],[x-49,y-43]],'#e9e7ca');line(c,[[x-22,y],[x-4,y+20],[x+30,y-25]],'#6b8c6e',9);for(let i=0;i<10;i++)rect(c,i*60,239,35,8,0,i%2?'#6d7b62':'#d2bd6e')}
 else if(end.scene==='ai'){rect(c,x-65,y-45+20*(1-p),130,102,18,col,INK);rect(c,x-49,y-29,98,52,10,'#24454b');ellipse(c,x-25,y-3,8,11,'#a7e2cf');ellipse(c,x+25,y-3,8,11,'#a7e2cf');line(c,[[x-15,y+37],[x+15,y+37]],'#3c5e64',3);line(c,[[x,y-45],[x,y-63]],INK,3);ellipse(c,x,y-67,6,6,'#e9ae72');poly(c,[[x-41,y-79],[x-45,y-108],[x-17,y-91],[x,y-115],[x+17,y-91],[x+45,y-108],[x+41,y-79]],'#e0bd74',INK);text(c,'CEO',x,222,20)}
 else if(end.scene==='cat'){poly(c,[[x-58,y-22],[x-64,y-93],[x-15,y-61],[x+19,y-61],[x+63,y-93],[x+58,y-15]],'#d3a66d',INK);ellipse(c,x,y,65,60,'#e7bd85');poly(c,[[x-51,y-65],[x-49,y-43],[x-29,y-47]],'#d7917f');poly(c,[[x+51,y-65],[x+49,y-43],[x+29,y-47]],'#d7917f');line(c,[[x-33,y-9],[x-19,y-4]],INK,3);line(c,[[x+19,y-4],[x+33,y-9]],INK,3);poly(c,[[x-5,y+8],[x+5,y+8],[x,y+15]],'#bd7463');for(let i=0;i<3;i++){line(c,[[x-28,y+12+i*7],[x-76,y+6+i*13]],INK,1.5);line(c,[[x+28,y+12+i*7],[x+76,y+6+i*13]],INK,1.5)}rect(c,x-87,y+61,174,30,3,'#324f50');text(c,'C H I E F   N Y A N',x,y+81,13,'#f6edda')}
 else if(end.scene==='vanish'){const s=1-p*.92;c.save();c.translate(x,y);c.scale(s,s);rect(c,-65,-80,130,150,5,col,INK);for(let i=0;i<12;i++)rect(c,-49+(i%3)*37,-64+Math.floor(i/3)*32,22,20,1,'#f4ebd6');c.restore();for(let i=0;i<22;i++){const a=i*2.3,r=30+p*130;rect(c,x+Math.cos(a)*r,y+Math.sin(a)*r*.7,3+(i%4),3+(i%4),0,col)}text(c,'404',x,234,18,'#9b6064')}
 else if(end.scene==='earth'){globe(c,x,y,72);c.strokeStyle='#eaf1cb';c.lineWidth=5;c.beginPath();c.arc(x,y,90,-Math.PI/2,-Math.PI/2+p*Math.PI*2);c.stroke();text(c,'INITIALIZING '+Math.floor(p*100)+'%',x,240,11);if(p>.9){c.save();c.globalAlpha=(p-.9)*5;ellipse(c,x,y,74,74,'#f8f8e0');c.restore()}}
 else if(end.scene==='lock'){for(let i=0;i<8;i++)rect(c,38+i*66,0,6,260,0,'#8aa69b77');c.lineWidth=15;c.strokeStyle='#416967';c.beginPath();c.arc(x,y-14,44,Math.PI,0);c.lineTo(x+44,y+24);c.stroke();rect(c,x-67,y-6,134,93,12,col,INK);ellipse(c,x,y+28,10,10,INK);rect(c,x-4,y+29,8,22,2,INK);text(c,'NO ONE GETS IN.',x,240,11)}
 else if(end.scene==='loop'){for(let i=0;i<3;i++){c.save();c.translate(x,y);c.rotate(motion*(i%2?-1:1)+i);c.strokeStyle=i%2?col:'#a4b6a0';c.lineWidth=4;c.beginPath();c.arc(0,0,43+i*22,.2,Math.PI*1.7);c.stroke();c.restore()}text(c,'99.999%',x,y+5,22);text(c,'VERIFYING…',x,241,11)}
 else if(end.scene==='blast'){for(let i=0;i<3;i++){const r=25+((motion*.7+i*.33)%1)*110;c.strokeStyle=col;c.globalAlpha=1-r/150;c.lineWidth=5;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke()}c.globalAlpha=1;const pts=[];for(let i=0;i<20;i++){const a=i*Math.PI/10,r=i%2?38:80+Math.sin(motion*5)*4;pts.push([x+Math.cos(a)*r,y+Math.sin(a)*r])}poly(c,pts,'#eeb16c',INK);text(c,'!!',x,y+15,50,'#7c4d31')}
 else if(end.scene==='secret'){rect(c,x-74,y-25,70,21,5,'#cb9d66',INK);rect(c,x-78,y-10,156,85,6,'#dab17a',INK);for(let i=0;i<5;i++)paper(c,x+(i-2)*35*p,y-26-p*25+Math.sin(i+motion)*6,(i-2)*.15,'#fff1e3',1);text(c,'TOP SECRET',x,y+46,14,'#97614f');text(c,'♡',x-105,y-55,25,col);text(c,'♡',x+105,y-35,20,col)}
 else if(end.scene==='hole'){for(let i=8;i>0;i--){c.save();c.translate(x,y);c.rotate(motion*.25+i*.25);c.strokeStyle=i%2?col:'#77829d';c.lineWidth=4;c.beginPath();c.ellipse(0,0,18+i*12,10+i*6,0,.3,Math.PI*1.95);c.stroke();c.restore()}ellipse(c,x,y,33,23,'#273741');for(let i=0;i<6;i++){const f=((motion*.35+i*.16)%1),a=i+motion,r=150*(1-f);paper(c,x+Math.cos(a)*r,y+Math.sin(a)*r*.65,a,'#eee9db',Math.max(.1,1-f))}}
 else if(end.scene==='truth'){for(let i=0;i<30;i++)text(c,(i*117).toString(2).padStart(8,'0'),24+(i%10)*55,26+Math.floor(i/10)*100,8,'#77968966');c.save();c.globalAlpha=.5;ellipse(c,x,y,98,98,col);c.restore();person(c,x,y+6,1.25,false,0,0);for(let i=0;i<4;i++){const yy=46+i*46;line(c,[[x-80,yy],[x+80,yy]],'#f7f4e970',2)}rect(c,x-41,y+63,82,27,3,'#26484b');text(c,'YOU',x,y+82,18,'#f8efd4')}
 text(c,end.id?String(end.id).padStart(2,'0'):'✓',35,35,12,'#678578');c.restore();
 }
}

export {person as drawPerson};
