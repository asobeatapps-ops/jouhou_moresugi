import {OBJECT_BY_ID} from './data.js?v=office-6';
import {hitObject,toWorld} from './office-layout.js?v=office-6';
export function bindOfficeInput({root,canvas,engine,getLayout,onPreview=()=>{},onSelect=()=>{},onHover=()=>{}}){
 let active=null,key=null,carry=null,lastPhysical=-Infinity;const off=[];
 const listen=(el,event,fn)=>{el.addEventListener(event,fn);off.push(()=>el.removeEventListener(event,fn))};
 const control=target=>{const b=target.closest?.('[data-object],[data-action]');return b&&root.contains(b)?b:null};
 const idOf=b=>b.dataset.object||b.dataset.action;
 const point=e=>toWorld(getLayout(),canvas.getBoundingClientRect(),e.clientX,e.clientY);
 const center=id=>{const b=getLayout().boxes[id];return{x:b.x+b.w/2,y:b.y+b.h/2}};
 const preview=(source,delta,origin=null)=>{const p=origin||center(source),layout=getLayout(),v={x:p.x+delta.x,y:p.y+delta.y};if(source==='looseButton')engine.moveLoose(v,performance.now());onPreview({source,point:v,delta,over:hitObject(layout,v,source)})};
 function cancel(){const old=active;active=null;key=null;carry=null;engine.cancelPress();onPreview(null);for(const b of root.querySelectorAll('.pressing,.dragging'))b.classList.remove('pressing','dragging');if(old){try{old.button.releasePointerCapture(old.pointerId)}catch{}}}
 listen(root,'pointerdown',e=>{
  const b=control(e.target);if(!b||b.disabled||e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();lastPhysical=performance.now();if(active)return;if(carry)cancel();const id=idOf(b),token=engine.token;
  if(!engine.beginPress(id,performance.now(),e.pointerId,token))return;
  active={id,token,pointerId:e.pointerId,button:b,start:point(e),client:{x:e.clientX,y:e.clientY},dragging:false,origin:OBJECT_BY_ID[id]?center(id):point(e)};b.classList.add('pressing');onSelect(id);try{b.setPointerCapture(e.pointerId)}catch{}
 });
 listen(root,'pointermove',e=>{
  if(!active||active.pointerId!==e.pointerId){const b=control(e.target);onHover(b? idOf(b):null);return}
  e.preventDefault();const p=point(e),delta={x:p.x-active.start.x,y:p.y-active.start.y},distance=Math.hypot(e.clientX-active.client.x,e.clientY-active.client.y);
  if(!active.dragging&&distance>=8){if(!engine.movePress(e.pointerId,active.token)){cancel();return}active.id=engine.press.id;active.dragging=true;active.button.classList.add('dragging');active.button.classList.remove('pressing')}
  if(active.dragging)preview(active.id,delta,active.origin);
 });
 listen(root,'pointerup',e=>{
  if(!active||active.pointerId!==e.pointerId)return;e.preventDefault();lastPhysical=performance.now();const old=active;active=null;old.button.classList.remove('pressing','dragging');onPreview(null);
  if(old.dragging){const p=point(e),delta={x:p.x-old.start.x,y:p.y-old.start.y};const a=old.origin,v={x:a.x+delta.x,y:a.y+delta.y};engine.drop(old.id,hitObject(getLayout(),v,old.id),performance.now(),e.pointerId,old.token,delta)}
  else{const r=old.button.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)engine.release(performance.now(),e.pointerId,old.token);else engine.cancelPress()}
 });
 for(const event of['pointercancel','lostpointercapture'])listen(root,event,e=>{if(active?.pointerId===e.pointerId)cancel()});
 listen(root,'pointerleave',()=>{if(!active)onHover(null)});
 listen(root,'contextmenu',e=>{if(control(e.target))e.preventDefault()});
 listen(root,'click',e=>{const b=control(e.target);if(!b)return;e.preventDefault();if(e.detail===0&&performance.now()-lastPhysical>300&&!active&&!key&&!carry){onSelect(idOf(b));engine.tap(idOf(b),performance.now(),engine.token)}});
 listen(root,'keydown',e=>{
  const b=control(e.target);if(!b)return;const id=idOf(b);
  if(e.key==='Escape'){e.preventDefault();cancel();engine.closePanel();return}
  if((e.key==='p'||e.key==='P')&&OBJECT_BY_ID[id]?.draggable){e.preventDefault();if(e.repeat)return;cancel();const token=engine.token;if(engine.beginPress(id,performance.now(),'keyboard-carry',token)&&engine.movePress('keyboard-carry',token)){carry={source:engine.press.id,token,delta:{x:0,y:0}};preview(carry.source,carry.delta);onSelect(id);engine.notice('持ち上げました。Tabで置き先を選び、Enterで置く。Escで戻せます。',id)}return}
  if(carry&&e.key==='Tab'){e.preventDefault();const ids=engine.targetsFor(carry.source),choices=ids.length?ids:[carry.source],i=choices.indexOf(id),next=choices[(i+(e.shiftKey?-1:1)+choices.length)%choices.length];root.querySelector(`[data-object="${next}"]`)?.focus({preventScroll:true});return}
  if(carry&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();carry.delta.x+=e.key==='ArrowLeft'?-50:e.key==='ArrowRight'?50:0;carry.delta.y+=e.key==='ArrowUp'?-50:e.key==='ArrowDown'?50:0;preview(carry.source,carry.delta);return}
  if(![' ','Enter'].includes(e.key))return;e.preventDefault();lastPhysical=performance.now();if(e.repeat)return;
  if(carry){const old=carry;carry=null;onPreview(null);engine.drop(old.source,OBJECT_BY_ID[id]?id:null,performance.now(),'keyboard-carry',old.token,old.delta);return}
  if(key||active)return;const token=engine.token;if(engine.beginPress(id,performance.now(),'keyboard',token)){key={id,token,button:b};b.classList.add('pressing');onSelect(id)}
 });
 listen(root,'keyup',e=>{if(![' ','Enter'].includes(e.key))return;e.preventDefault();lastPhysical=performance.now();const old=key;key=null;if(old){old.button.classList.remove('pressing');engine.release(performance.now(),'keyboard',old.token)}});
 listen(root,'focusin',e=>{const b=control(e.target);if(!b)return;const id=idOf(b);onSelect(id);if(carry&&OBJECT_BY_ID[id]){const a=center(carry.source),p=center(id);carry.delta={x:p.x-a.x,y:p.y-a.y};preview(carry.source,carry.delta)}});
 listen(root,'focusout',()=>{if(key&&!carry)cancel()});
 return{cancel,destroy(){cancel();for(const remove of off)remove()}};
}
