// Optional actions share the question token, so old releases never answer a new task.
export function bindExtraActions({engine,extraBtn,mailCard,trashTarget}){
 const cleanups=[],cancellations=[];
 const listen=(el,event,fn)=>{el.addEventListener(event,fn);cleanups.push(()=>el.removeEventListener(event,fn))};
 const allowed=()=>engine.mode==='question'&&!engine.paused&&!engine.endId&&!!engine.question?.extra;
 const act=token=>engine.takeAction(engine.question?.extra?.id,performance.now(),token);
 const inside=(p,r,pad=0)=>p.x>=r.left-pad&&p.x<=r.right+pad&&p.y>=r.top-pad&&p.y<=r.bottom+pad;
 for(const button of[extraBtn,trashTarget]){
  let pointer=null,key=null,lastPhysical=-Infinity;
  const cancel=()=>{const old=pointer;pointer=null;key=null;if(old){try{button.releasePointerCapture(old.id)}catch{}}button.classList.remove('pressing')};
  cancellations.push(cancel);
  listen(button,'pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();lastPhysical=performance.now();if(!allowed()||pointer)return;pointer={id:e.pointerId,token:engine.token};try{button.setPointerCapture(e.pointerId)}catch{}button.classList.add('pressing')});
  listen(button,'pointerup',e=>{e.preventDefault();lastPhysical=performance.now();if(pointer?.id!==e.pointerId)return;const old=pointer;pointer=null;button.classList.remove('pressing');if(inside({x:e.clientX,y:e.clientY},button.getBoundingClientRect()))act(old.token)});
  for(const event of['pointercancel','lostpointercapture'])listen(button,event,e=>{if(pointer?.id===e.pointerId)cancel()});
  listen(button,'keydown',e=>{if(![' ','Enter'].includes(e.key))return;e.preventDefault();lastPhysical=performance.now();if(!e.repeat&&key===null&&allowed())key=engine.token});
  listen(button,'keyup',e=>{if(![' ','Enter'].includes(e.key))return;e.preventDefault();lastPhysical=performance.now();const token=key;key=null;if(token!==null)act(token)});
  listen(button,'click',e=>{e.preventDefault();if(e.detail===0&&performance.now()-lastPhysical>300&&allowed())act(engine.token)});
  listen(button,'contextmenu',e=>e.preventDefault());listen(button,'blur',cancel);
 }
 let drag=null;
 const clearDrag=()=>{const old=drag;drag=null;mailCard.style.transform='';mailCard.classList.remove('dragging');trashTarget.classList.remove('drop-ready');if(old){try{mailCard.releasePointerCapture(old.id)}catch{}}};
 cancellations.push(clearDrag);
 listen(mailCard,'pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();if(drag||!allowed()||engine.question.extra.kind!=='skill')return;drag={id:e.pointerId,token:engine.token,x:e.clientX,y:e.clientY};try{mailCard.setPointerCapture(e.pointerId)}catch{}mailCard.classList.add('dragging')});
 listen(mailCard,'pointermove',e=>{if(drag?.id!==e.pointerId)return;e.preventDefault();const dx=e.clientX-drag.x,dy=e.clientY-drag.y;mailCard.style.transform=`translate(${dx}px,${dy}px) rotate(${Math.max(-12,Math.min(12,dx/10))}deg)`;trashTarget.classList.toggle('drop-ready',inside({x:e.clientX,y:e.clientY},trashTarget.getBoundingClientRect(),12))});
 listen(mailCard,'pointerup',e=>{if(drag?.id!==e.pointerId)return;e.preventDefault();const old=drag,far=Math.hypot(e.clientX-old.x,e.clientY-old.y)>=24,hit=inside({x:e.clientX,y:e.clientY},trashTarget.getBoundingClientRect(),12);clearDrag();if(far&&hit)act(old.token)});
 for(const event of['pointercancel','lostpointercapture'])listen(mailCard,event,e=>{if(drag?.id===e.pointerId)clearDrag()});
 listen(mailCard,'contextmenu',e=>e.preventDefault());
 return{cancel(){for(const cancel of cancellations)cancel()},destroy(){this.cancel();for(const remove of cleanups)remove()}};
}
