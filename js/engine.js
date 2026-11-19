import {OBJECT_BY_ID,APP_ACTIONS,DROP_TARGETS} from './data.js?v=office-5';
const APPS=new Set(APP_ACTIONS.map(a=>a.id));
const HOLDS={send:1500,'app-lock':1200,'app-verify':1500,button:1000};
export class OfficeEngine{
 constructor({onEvent=()=>{}}={}){this.onEvent=onEvent;this.mode='idle';this.token=0;this.serial=0;this.press=null;this.paused=false;this.endId=null}
 emit(type,data={}){this.onEvent({type,...data})}
 start({discovered=[]}={},now=0){
  this.serial++;this.token++;this.mode='explore';this.paused=false;this.endId=null;this.press=null;this.panel=null;this.actions=0;this.bossTaps=0;this.sendTaps=0;this.lockTaps=0;this.lastSendTap=null;this.giant=false;this.buttonTaps=0;this.doorOpen=false;this.drawerOpen=false;this.portalOpen=false;this.folderOpen=false;this.verifying=false;
  this.trueEligible=Array.from({length:14},(_,i)=>i+1).every(id=>discovered.includes(id));this.phaseStarted=now;this.deadline=null;this.flash=null;
  this.emit('start');this.notice(this.trueEligible?'オフィスにいる「あなた」が、少し光っている。':'光る物をタップ。猫や資料は、つかんだまま運べます。');
 }
 valid(id){return!!OBJECT_BY_ID[id]||(APPS.has(id)&&this.panel==='desktop')||(id==='send'&&this.panel==='mail')}
 ready(token=this.token){return this.mode==='explore'&&!this.paused&&!this.endId&&token===this.token}
 notice(text,object=null){this.emit('notice',{text,object})}
 targetsFor(id){return DROP_TARGETS[id]||[]}
 beginPress(id,now,pointerId,token=this.token){
  if(!this.ready(token)||!this.valid(id)||this.press)return false;
  this.press={id,at:now,pointerId,token,dragging:false};if(OBJECT_BY_ID[id]&&this.panel){this.panel=null;this.emit('panel')}this.emit('press',{id});return true;
 }
 movePress(pointerId,token=this.token){if(!this.ready(token)||this.press?.pointerId!==pointerId||!OBJECT_BY_ID[this.press.id]?.draggable)return false;this.press.dragging=true;return true}
 cancelPress(){this.press=null}
 release(now,pointerId,token=this.token){
  if(!this.ready(token)||this.press?.pointerId!==pointerId||this.press.token!==token)return false;this.tick(now);if(!this.ready(token)||!this.press)return false;
  const p=this.press;this.press=null;if(p.dragging)return false;return this.tap(p.id,now,token);
 }
 tap(id,now,token=this.token){
  if(!this.ready(token)||!this.valid(id)||this.press)return false;
  this.actions++;this.token++;this.flash={id,at:now};if(id!=='send')this.lastSendTap=null;
  if(id==='pc'){this.panel='desktop';this.emit('panel');this.notice('画面のアイコンにも触れます。長押しで変わる物も。',id)}
  else if(id==='boss'){this.panel=null;if(++this.bossTaps>=3){this.finish(2,now);return true}this.notice(this.bossTaps===1?'部長「会社の命運は任せた。私はここで見守るよ」':'部長「まさか、仕事を全部私に任せるつもり？」',id)}
  else if(id==='cat'){this.panel=null;this.notice('にゃー。（キーボードの上が、いちばん暖かい）',id)}
  else if(id==='files'){this.folderOpen=true;this.panel='file';this.emit('panel');this.notice('「だれにも見せないこと」と書かれた、社長のノート。',id)}
  else if(id==='fridge'){this.panel=null;this.doorOpen=!this.doorOpen;this.notice(this.doorOpen?'冷たい空気。パソコンまで入りそうな大きさ。':'冷蔵庫を閉めた。中はひんやりしている。',id)}
  else if(id==='drawer'){this.panel=null;this.drawerOpen=!this.drawerOpen;this.notice(this.drawerOpen?'ここなら、ひみつの資料を安全にしまえそう。':'鍵の付いた引き出し。',id)}
  else if(id==='trash'){this.panel=null;this.notice('紙くずのゴミ箱。大切な物まで捨てないように。',id)}
  else if(id==='window'){this.panel=null;this.notice('外は広い世界。資料を近づけたら、風で飛んでいきそう。',id)}
  else if(id==='button'){this.panel=null;if(this.giant){this.finish(9,now);return true}if(++this.buttonTaps>=2){this.reveal(now);return true}this.notice('ボタンが少しぐらつく。引っ張るか、長く押してみよう。',id)}
  else if(id==='self'){this.panel=null;if(this.trueEligible){this.finish(15,now);return true}this.notice('あなたの名札。ほかの14の結末を見つけたら、何かが変わるかも。',id)}
  else if(id==='app-mail'){this.panel='mail';this.emit('panel');this.notice('送信ボタンは、押し方で反応が変わりそう。','pc')}
  else if(id==='app-ai'){this.finish(6,now);return true}
  else if(id==='app-lock'){if(++this.lockTaps>=3){this.finish(4,now);return true}this.notice(this.lockTaps===1?'まずは自分のPCをロック。長く押すと、もっと強く守れそう。':'今度は部署ごとロック。慎重すぎるのも考えもの。','pc')}
  else if(id==='app-verify'){this.verifying=true;this.notice('確認中…99.999%。もう少し長く押し続けてみよう。','pc')}
  else if(id==='app-transfer'){this.portalOpen=true;this.panel=null;this.emit('panel');this.notice('PCに黒い穴が開いた。資料が吸い込まれそう…。','pc')}
  else if(id==='send'){
   if(this.lastSendTap!==null&&now-this.lastSendTap<=240){this.finish(12,now);return true}
   this.lastSendTap=now;if(++this.sendTaps>=3){this.finish(3,now);return true}
   this.notice(`${this.sendTaps}通を送信。長押しすると送る範囲が広がりそう。`,'pc');
  }
  this.emit('change');return true;
 }
 drop(source,target,now,pointerId,token=this.token,delta={x:0,y:0}){
  if(!this.ready(token)||this.press?.pointerId!==pointerId||this.press.token!==token||this.press.id!==source||!this.press.dragging)return false;
  this.press=null;this.panel=null;this.lastSendTap=null;
  if(source==='button'){
   if(!this.giant&&Math.hypot(delta.x,delta.y)>=60){this.actions++;this.token++;this.reveal(now);return true}
   this.notice('壁のボタンを、もう少し大きく引っ張ってみよう。','button');this.emit('change');return false;
  }
  if(!this.targetsFor(source).includes(target)){this.notice(target?'そこには置けなかった。別の場所も試してみよう。':'元の場所にそっと戻した。',source);this.emit('change');return false}
  this.actions++;this.token++;this.flash={id:target,at:now};
  if(source==='cat'&&target==='pc')this.finish(7,now);
  else if(source==='pc'&&target==='fridge'){this.doorOpen=true;this.finish(4,now)}
  else if(source==='files'){
   const endings={boss:13,window:1,trash:8,drawer:5};
   if(target==='pc'){if(this.portalOpen)this.finish(14,now);else{this.panel='desktop';this.notice('PCの「転送」を開いてから、もう一度資料を運んでみよう。','pc');this.emit('panel')}}
   else{if(target==='drawer')this.drawerOpen=true;this.finish(endings[target],now)}
  }
  if(!this.endId)this.emit('change');return true;
 }
 reveal(now){this.giant=true;this.press=null;this.panel=null;this.flash={id:'button',at:now};this.notice('奥から、もっと大きなボタンが！触れたら何か起こりそう。','button');this.emit('change')}
 tick(now){
  if(this.paused)return;
  if(this.mode==='explore'&&this.press&&!this.press.dragging){const p=this.press,threshold=HOLDS[p.id];if(threshold&&now-p.at>=threshold){this.press=null;this.actions++;this.token++;if(p.id==='send')this.finish(1,now);else if(p.id==='app-lock')this.finish(10,now);else if(p.id==='app-verify')this.finish(11,now);else if(p.id==='button'){if(this.giant)this.finish(9,now);else this.reveal(now)}}}
  if(this.mode==='ending'&&now>=this.deadline){this.mode='result';this.emit('result',{id:this.endId})}
 }
 holdProgress(now){const p=this.press;return p&&!p.dragging&&HOLDS[p.id]?Math.max(0,Math.min(1,(now-p.at)/HOLDS[p.id])):0}
 holdScope(now){const p=this.holdProgress(now);return p<.25?'自分だけ':p<.5?'部署のみ':p<.8?'会社全体':'全世界'}
 closePanel(){if(this.mode!=='explore')return;this.press=null;this.panel=null;this.token++;this.emit('panel')}
 finish(id,now){if(this.endId||!Number.isInteger(id)||id<1||id>15)return;this.endId=id;this.mode='ending';this.press=null;this.panel=null;this.token++;this.phaseStarted=now;this.deadline=now+3000;this.emit('ending',{id,actions:this.actions,score:0,maxCombo:0})}
 pause(now){if(this.mode!=='explore'||this.paused)return;this.tick(now);if(this.mode!=='explore')return;this.paused=true;this.press=null;this.lastSendTap=null;this.emit('pause')}
 resume(){if(!this.paused||this.mode!=='explore')return;this.paused=false;this.press=null;this.lastSendTap=null;this.emit('resume')}
}
