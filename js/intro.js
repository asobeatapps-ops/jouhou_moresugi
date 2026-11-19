export const FIRST_CHAT=Object.freeze([
 {speaker:'部長',text:'おはよう。今日から君が、会社の秘密を守る担当だ。',boss:'confident',player:'attentive'},
 {speaker:'部長',text:'この部屋の物をタップしたり、長く押したり、運んだりして調べてくれ。',boss:'talk',player:'attentive'},
 {speaker:'あなた',text:'了解しました！じっくり調べてみます。',boss:'smile',player:'confident'},
 {speaker:'部長',text:'ちなみに前任者は、全社員の給料を世界中に公開した。',boss:'worried',player:'surprised'},
 {speaker:'あなた',text:'えっ',boss:'worried',player:'shocked'},
 {speaker:'部長',text:'このオフィスには17の結末がある。会社が無事とは限らないが。',boss:'talk',player:'worried'},
 {speaker:'部長',text:'時間制限はない。会社の命運は任せた。',boss:'confident',player:'surprised'},
 {speaker:'あなた',text:'ちょっと待って！？',boss:'smile',player:'shocked'}
].map(Object.freeze));
export const RETRY_CHAT=Object.freeze([
 {speaker:'部長',text:'おかえり。今度こそ、会社の秘密を守ってくれ。',boss:'talk',player:'attentive'},
 {speaker:'あなた',text:'さっきのことは……忘れて、もう一度調べます。',boss:'smile',player:'confident'}
].map(Object.freeze));
// Intentionally has no timer: only a confirmed user action advances a line.
export class IntroConversation{
 constructor(){this.serial=0;this.active=false}
 start(short=false){this.serial++;this.lines=short?RETRY_CHAT:FIRST_CHAT;this.index=0;this.active=true;return this.line}
 get line(){return this.lines?.[this.index]}
 advance(index=this.index,serial=this.serial){if(!this.active||index!==this.index||serial!==this.serial)return false;this.index++;if(this.index===this.lines.length)this.active=false;return true}
 cancel(){this.active=false;this.serial++}
}
