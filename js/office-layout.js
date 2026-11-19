export function makeLayout(width,height,loose=null){
 const wide=width>=700,w=wide?1100:720,h=w*height/width,k=Math.min(1,h/(wide?780:1100)),deskY=h*.60;
 const boxes=wide?{
  window:{x:65,y:48*k,w:335*k,h:235*k},fridge:{x:900,y:h*.60-260*k,w:132*k,h:260*k},
  button:{x:740,y:65,w:105*k,h:105*k},boss:{x:710,y:deskY-210*k,w:120*k,h:210*k},
  pc:{x:245,y:deskY-180*k,w:185*k,h:180*k},files:{x:535,y:deskY-35*k,w:128*k,h:78*k},
  drawer:{x:507,y:deskY+64*k,w:150*k,h:94*k},cat:{x:150,y:h*.94-105*k,w:165*k,h:105*k},
  trash:{x:915,y:h*.95-136*k,w:108*k,h:136*k},self:{x:707,y:Math.max(deskY+185*k,h*.76),w:120*k,h:190*k}
 }:{
  window:{x:55,y:63*k,w:310,h:245*k},fridge:{x:568,y:h*.61-265*k,w:118*k,h:265*k},
  button:{x:545,y:92*k,w:100*k,h:100*k},boss:{x:424,y:deskY-210*k,w:118*k,h:210*k},
  pc:{x:142,y:deskY-180*k,w:185*k,h:180*k},files:{x:425,y:deskY-35*k,w:126*k,h:78*k},
  drawer:{x:345,y:deskY+64*k,w:148*k,h:94*k},cat:{x:88,y:h*.94-105*k,w:160*k,h:105*k},
  trash:{x:568,y:h*.95-136*k,w:108*k,h:136*k},self:{x:306,y:Math.max(deskY+185*k,h*.78),w:120*k,h:190*k}
 };
 boxes.self.y=Math.min(boxes.self.y,h-boxes.self.h-25*k);
 if(loose){const q=w/720,r=loose.r*q;boxes.looseButton={x:loose.x*q-r,y:loose.y*q-r,w:r*2,h:r*2}}
 const desk={x:wide?190:78,y:deskY,w:wide?610:552,depth:72*k,k};
 const hits=Object.fromEntries(Object.entries(boxes).filter(([id])=>!(loose&&id==='button')).map(([id,b])=>[id,{...b,h:id==='boss'?b.h*.76:b.h}]));
 return{w,h,k,wide,boxes,hits,desk,scale:width/w,width,height};
}
export function hitObject(layout,point,exclude=null,pad=10){
 const order=['looseButton','button','files','drawer','pc','cat','self','trash','boss','fridge','window'];
 return order.find(id=>{if(id===exclude)return false;const b=layout.hits[id];return b&& point.x>=b.x-pad&&point.x<=b.x+b.w+pad&&point.y>=b.y-pad&&point.y<=b.y+b.h+pad})||null;
}
export function toWorld(layout,rect,clientX,clientY){return{x:(clientX-rect.left)/layout.scale,y:(clientY-rect.top)/layout.scale}}
