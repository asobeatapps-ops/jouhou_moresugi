import {QUESTIONS,BY_ID,ROUTES,FIRST_CHAT,RETRY_CHAT,ROUND_SIZE,EXTRA_ACTIONS} from './data.js?v=chaos-4';
export const pointsFor=combo=>100*Math.min(5,Math.ceil(combo/5));
export function normalEnding(danger,missed,safePress){
 if(danger===3)return 1;if(missed===3)return safePress?5:2;if(danger===2)return 3;return 4;
}
const shuffle=(list,rng)=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
export class QuestionDeck{
 constructor(playNumber,rng=Math.random){this.rng=rng;this.route=ROUTES[(playNumber-1)%9];this.bags={};const majority=playNumber%2===0;this.kinds=(rng()<.5?[majority,majority,!majority,majority]:[majority,!majority,majority,majority]).reverse();this.extra=EXTRA_ACTIONS[(playNumber-1)%EXTRA_ACTIONS.length];this.reservedId=this.extra[this.kinds.at(-2)?'safeId':'dangerId'];this.last=[];this.lastKind=null;this.streak=0}
 next(n){if(n===ROUND_SIZE)return BY_ID[this.route.at(-1)];if(n===ROUND_SIZE-1&&this.route.length===2)return BY_ID[this.route[0]];
  if(!this.kinds.length)this.kinds=shuffle([true,true,false,false],this.rng);
  if(this.streak>=2&&this.kinds.at(-1)===this.lastKind){const i=this.kinds.findIndex(x=>x!==this.lastKind);if(i>=0)[this.kinds[i],this.kinds[this.kinds.length-1]]=[this.kinds.at(-1),this.kinds[i]];else this.kinds.push(!this.lastKind)}
  const safe=this.kinds.pop();this.streak=safe===this.lastKind?this.streak+1:1;this.lastKind=safe;
  let q;
  if(n===2){q=Object.freeze({...BY_ID[this.reservedId],...(safe&&this.extra.safeText?{text:this.extra.safeText}:{}),extra:this.extra})}
  else{
   if(!this.bags[safe]?.length)this.bags[safe]=shuffle(QUESTIONS.filter(q=>q.id.startsWith(safe?'S-':'D-')&&q.id!==this.reservedId),this.rng);
   const bag=this.bags[safe];let i=bag.findIndex(q=>!this.last.includes(q.id));if(i<0)i=0;q=bag.splice(i,1)[0];
  }
  this.last.push(q.id);if(this.last.length>8)this.last.shift();return q;
 }
}
export class GameEngine{
 constructor({onEvent=()=>{},rng=Math.random}={}){this.onEvent=onEvent;this.rng=rng;this.mode='idle';this.token=0;this.serial=0;this.paused=false;this.endId=null;this.cancelInput()}
 emit(type,data={}){this.onEvent({type,...data})}
 start({playNumber=1,discovered=[]}={},now=0){
  this.serial++;this.token++;this.score=0;this.combo=0;this.maxCombo=0;this.mistakes=0;this.danger=0;this.missed=0;this.safePress=0;this.questionNo=0;this.answered=0;this.endId=null;this.endEvents=0;this.paused=false;this.question=null;this.flags={};this.actionTaken=false;this.activeAction=null;this.trueEligible=Array.from({length:14},(_,i)=>i+1).every(id=>discovered.includes(id));
  this.deck=new QuestionDeck(playNumber,this.rng);this.mode='intro';this.introLines=playNumber===1?FIRST_CHAT:RETRY_CHAT;this.introIndex=0;this.phaseStarted=now;this.deadline=now+2000;this.cancelInput();this.emit('intro',{first:playNumber===1});this.emitChat();
 }
 emitChat(){this.emit('chat',{line:this.introLines[this.introIndex],index:this.introIndex,total:this.introLines.length})}
 advanceIntro(now,index=this.introIndex,serial=this.serial){if(this.mode!=='intro'||this.paused||index!==this.introIndex||serial!==this.serial)return false;this.introIndex++;if(this.introIndex>=this.introLines.length)this.nextQuestion(now);else{this.phaseStarted=now;this.deadline=now+2000;this.emitChat()}return true}
 nextQuestion(now){if(this.answered>=ROUND_SIZE){this.finish('complete',now);return}this.token++;this.cancelInput();this.activeAction=null;this.questionNo++;this.question=this.deck.next(this.questionNo);this.mode='question';this.phaseStarted=now;this.deadline=null;this.emit('question',{question:this.question,number:this.questionNo,token:this.token})}
 tick(now){
  if(this.paused)return;
  if(this.mode==='intro'&&now>=this.deadline){this.advanceIntro(now);return}
  if(this.mode==='question'){
   if(this.question.id==='HS-01'&&this.hold&&this.hold.token===this.token&&now-this.hold.at>=1500){this.finish(11,now);return}
  }
  if((this.mode==='feedback'||this.mode==='action')&&now>=this.deadline)this.nextQuestion(now);
  else if(this.mode==='ending'&&now>=this.deadline){this.mode='result';this.emit('result',{id:this.endId})}
 }
 down(now,pointerId,token=this.token){this.tick(now);if(this.paused||token!==this.token||this.endId||this.hold||this.secondHold)return false;
  if(this.mode==='feedback'&&this.question?.id==='HS-02'&&this.lastTap!==null&&now-this.lastTap<=240){this.secondHold={at:now,pointerId,token};return true}
  if(this.mode!=='question')return false;this.hold={at:now,pointerId,token};this.emit('press');return true;
 }
 up(now,pointerId,token=this.token){
  if(this.paused||token!==this.token)return false;this.tick(now);if(this.endId)return false;
  if(this.mode==='feedback'&&this.question?.id==='HS-02'&&this.secondHold?.pointerId===pointerId&&this.secondHold.token===token){this.secondHold=null;if(this.lastTap!==null&&now-this.lastTap<=240){this.finish(12,now);return true}return false}
  const hold=this.hold;if(this.mode!=='question'||!hold||hold.pointerId!==pointerId||hold.token!==token)return false;this.hold=null;
  if(this.question.id==='HS-01'&&now-hold.at>=1500){this.finish(11,now);return true}
  this.judge(true,now);return true;
 }
 takeAction(id,now,token=this.token){
  if(token!==this.token||this.paused||this.mode!=='question'||this.endId||this.hold||this.secondHold||this.actionTaken||this.question?.extra?.id!==id)return false;
  const action=this.question.extra;this.actionTaken=true;this.cancelInput();
  if(action.kind==='skill'){this.judge(this.question.safe,now);if(this.endId)return true}
  else{this.answered++;this.combo=0}
  this.activeAction=action;this.mode='action';this.phaseStarted=now;this.deadline=now+action.duration;this.emit('action',{action,score:this.score,combo:this.combo});return true;
 }
 choose(pressed,now,token=this.token){if(typeof pressed!=='boolean'||token!==this.token||this.paused||this.mode!=='question'||this.hold||this.secondHold)return false;return this.judge(pressed,now)}
 cancelInput(){this.hold=null;this.secondHold=null;this.lastTap=null}
 cancelPointer(pointerId){if(this.hold?.pointerId===pointerId)this.hold=null;if(this.secondHold?.pointerId===pointerId)this.secondHold=null}
 judge(pressed,now){if(this.mode!=='question'||this.endId||this.paused)return false;
  const q=this.question;this.hold=null;this.secondHold=null;const correct=pressed===q.safe;
  this.mode='feedback';this.phaseStarted=now;this.deadline=now+400;this.answered++;
  if(correct){this.combo++;this.maxCombo=Math.max(this.maxCombo,this.combo);this.score+=pointsFor(this.combo);if(pressed)this.safePress++}else{this.combo=0;this.mistakes++;if(pressed)this.danger++;else this.missed++}
  this.lastTap=q.id==='HS-02'&&pressed?now:null;
  // All candidate endings are selected together, with explicit precedence.
  let hidden=null;if(q.id==='HS-04'&&pressed&&this.flags.secretSkipped)hidden=13;if(q.id==='HS-06'&&pressed&&this.flags.destinationChecked)hidden=14;
  if(q.id==='HS-03')this.flags.secretSkipped=!pressed;
  if(q.id==='HS-05')this.flags.destinationChecked=pressed;
  const special=q.id.startsWith('SP-')&&pressed?5+Number(q.id.slice(3)):null;
  const id=this.trueEligible&&this.combo>=ROUND_SIZE?15:hidden??special??(this.mistakes>=3?normalEnding(this.danger,this.missed,this.safePress):null);
  if(id){this.finish(id,now);return true}
  this.emit('judgment',{correct,pressed,question:q,points:correct?pointsFor(this.combo):0});return true;
 }
 finish(id,now){if(this.endId)return;this.endId=id;this.endEvents++;this.mode='ending';this.phaseStarted=now;this.deadline=now+3000;this.token++;this.cancelInput();this.emit('ending',{id,score:this.score,maxCombo:this.maxCombo,answered:this.answered,mistakes:this.mistakes,questionNo:this.questionNo})}
 pause(now){if(this.paused||!['intro','question','feedback','action','ending'].includes(this.mode))return;this.tick(now);this.paused=true;this.pauseAt=now;this.cancelInput();this.emit('pause')}
 resume(now){if(!this.paused)return;const delta=Math.max(0,now-this.pauseAt);this.phaseStarted+=delta;if(this.deadline!==null)this.deadline+=delta;this.paused=false;this.cancelInput();this.emit('resume')}
}
