// A bounded, fixed-step toy body. Coordinates use a 720-unit-wide room.
export class ButtonPhysics{
 constructor(x,y,r=32){Object.assign(this,{x,y,r,vx:0,vy:0,angle:0,held:true,armed:false,accumulator:0,path:[]})}
 bounds(w,h){this.w=w;this.h=h;this.x=Math.max(this.r,Math.min(w-this.r,this.x));this.y=Math.max(this.r,Math.min(h-this.r,this.y))}
 hold(x,y){this.held=true;this.vx=this.vy=0;this.x=x;this.y=y;this.bounds(this.w,this.h)}
 release(vx=0,vy=0){this.held=false;this.armed=true;this.vx=Math.max(-1300,Math.min(1300,vx));this.vy=Math.max(-1300,Math.min(1300,vy));this.accumulator=0}
 step(dt){this.path=[];if(this.held)return;this.accumulator+=Math.max(0,Math.min(.08,dt));const d=1/120;while(this.accumulator>=d){this.accumulator-=d;const from={x:this.x,y:this.y};this.vy+=950*d;this.x+=this.vx*d;this.y+=this.vy*d;
  if(this.x<this.r){this.x=this.r;this.vx=Math.abs(this.vx)*.55}if(this.x>this.w-this.r){this.x=this.w-this.r;this.vx=-Math.abs(this.vx)*.55}
  if(this.y<this.r){this.y=this.r;this.vy=Math.abs(this.vy)*.45}if(this.y>=this.h-this.r){this.y=this.h-this.r;this.vy=Math.abs(this.vy)>45?-Math.abs(this.vy)*.38:0;this.vx*=Math.exp(-2.2*d);if(Math.abs(this.vx)<2)this.vx=0}
  this.angle+=this.vx/this.r*d;this.path.push([from,{x:this.x,y:this.y}]);
 }}
}
export function crossesRect(a,b,r){let lo=0,hi=1;for(const axis of['x','y']){const delta=b[axis]-a[axis],min=r[axis],max=min+r[axis==='x'?'w':'h'];if(Math.abs(delta)<1e-9){if(a[axis]<min||a[axis]>max)return false}else{let t0=(min-a[axis])/delta,t1=(max-a[axis])/delta;if(t0>t1)[t0,t1]=[t1,t0];lo=Math.max(lo,t0);hi=Math.min(hi,t1);if(lo>hi)return false}}return true}
