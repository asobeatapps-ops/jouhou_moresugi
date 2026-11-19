export const ENDS = Object.freeze([
 {id:1,title:'全世界に公開しました',tag:'PUBLIC DOMAIN',icon:'◎',color:'#ed695b',scene:'world',hint:'資料を窓へ運ぶ。またはPCのメール送信を1.5秒長押し。',story:'公開範囲：全世界。\n会社の秘密が、みんなの常識になりました。'},
 {id:2,title:'仕事してませんでした',tag:'NOT RESPONDING',icon:'☕',color:'#d3aa6d',scene:'sleep',hint:'部長に3回話しかけて、仕事を丸投げしてみる。',story:'流出ゼロ。進捗もゼロ。\nあなたの勤務時間だけが静かに過ぎました。'},
 {id:3,title:'送信ボタン依存症',tag:'SEND. SEND. SEND.',icon:'➤',color:'#f18a6d',scene:'send',hint:'PCのメールを開き、少し間を空けて送信を3回。',story:'その指は、もう止まらない。\n送信ボタンに、休暇をください。'},
 {id:4,title:'慎重すぎて業務停止',tag:'ACCESS PENDING',icon:'▣',color:'#7d9ec6',scene:'freeze',hint:'パソコンを冷蔵庫へ運んでみる。',story:'確認のための確認を確認中。\n業務は、再開の許可待ちになりました。'},
 {id:5,title:'安全第一、仕事は後回し',tag:'SAFETY FIRST. FOREVER.',icon:'△',color:'#c7b763',scene:'shield',hint:'秘密の資料を、机の引き出しにしまう。',story:'安全な判断はできる。\n仕事を進める気があるかは、別の話。'},
 {id:6,title:'AIが社長になりました',tag:'CEO.exe INSTALLED',icon:'AI',color:'#8e98e5',scene:'ai',hint:'パソコンを開いて「AI」を起動する。',story:'新社長の挨拶は0.002秒。\n最初の議題は「人類の稼働率」でした。'},
 {id:7,title:'猫が最高情報責任者',tag:'CHIEF NYAN OFFICER',icon:'猫',color:'#ecc286',scene:'cat',hint:'猫をパソコンのキーボードへ運ぶ。',story:'最高機密は、段ボールの中。\n新CIOはキーボードの上でお昼寝中です。'},
 {id:8,title:'会社、消滅。',tag:'404 COMPANY NOT FOUND',icon:'404',color:'#de7d85',scene:'vanish',hint:'秘密の資料をゴミ箱へ運んでしまう。',story:'社員も、資料も、社名も。\n残ったのは、あなたのクリック履歴だけ。'},
 {id:9,title:'地球ごと初期化',tag:'FACTORY RESET: EARTH',icon:'↻',color:'#80c5b5',scene:'earth',hint:'壁のボタンを引き抜き、現れた大きなボタンに触れる。',story:'「再起動してください」\nその案内は、青い惑星にも届きました。'},
 {id:10,title:'セキュリティ強すぎ問題',tag:'EVERYONE DENIED',icon:'▤',color:'#92b8b9',scene:'lock',hint:'PCの「ロック」を1.2秒長押しする。',story:'不正アクセスは完全に消えた。\n正規アクセスも、完全に消えた。'},
 {id:11,title:'永遠に確認中',tag:'VERIFYING… FOREVER',icon:'∞',color:'#c3a5df',scene:'loop',hint:'PCの「確認」を1.5秒長押しする。',story:'確認が終わったことの確認が終わらない。\n進捗：99.999999％。'},
 {id:12,title:'誤爆の神',tag:'DOUBLE TROUBLE',icon:'!!',color:'#f0a252',scene:'blast',hint:'メールの送信ボタンを0.24秒以内に2回押す。',story:'通報先にも、通報先の通報先にも届いた。\nその二度押しは、伝説になりました。'},
 {id:13,title:'社長の秘密が…',tag:'TOP SECRET / OPEN',icon:'?',color:'#e098bc',scene:'secret',hint:'秘密の資料を部長に渡してみる。',story:'中身を見ないまま、全員に共有。\n社長のポエムが、トレンド入りしました。'},
 {id:14,title:'情報、ブラックホールへ',tag:'DESTINATION: UNKNOWN',icon:'●',color:'#a5a3df',scene:'hole',hint:'PCで「転送」を開き、黒い穴へ資料を運ぶ。',story:'転送完了。受信者なし。\n情報は、光も戻らない場所へ吸い込まれました。'},
 {id:15,title:'あなたが情報でした',tag:'YOU ARE THE DATA',icon:'◇',color:'#e8dba1',scene:'truth',hint:'ほかの14ENDを発見したら、オフィスにいる「あなた」に触れる。',story:'守っていたのは、会社のデータではなかった。\nこのゲームに記録されていたのは、あなたでした。'}
].map(e=>Object.freeze(e)));

export const OBJECTS=Object.freeze([
 {id:'pc',name:'パソコン',gesture:'タップで開く・つかんで運ぶ',draggable:true,description:'メールやアプリが並ぶ、いつもの仕事道具。冷蔵庫には入りそう。'},
 {id:'boss',name:'部長',gesture:'タップで話しかける',description:'会社の命運を、あなたに任せたいらしい。'},
 {id:'cat',name:'猫',gesture:'タップ・つかんで運ぶ',draggable:true,description:'キーボードの上が大好き。しっぽが動いている。'},
 {id:'files',name:'ひみつの資料',gesture:'タップでのぞく・つかんで運ぶ',draggable:true,description:'社長だけが見る、赤いファイル。渡す相手で何かが変わりそう。'},
 {id:'trash',name:'ゴミ箱',gesture:'タップ・物を入れる',description:'一度捨てると、戻ってこない物もある。'},
 {id:'fridge',name:'冷蔵庫',gesture:'タップで開閉・物を入れる',description:'飲み物を冷やすための、少し大きな冷蔵庫。'},
 {id:'button',name:'壁のボタン',gesture:'タップ・長押し・引っ張る',draggable:true,description:'なぜか壁に付いている赤いボタン。ネジがゆるんでいる。'},
 {id:'window',name:'窓',gesture:'タップ・物を近づける',description:'会社の外の、広い世界につながっている。'},
 {id:'drawer',name:'引き出し',gesture:'タップで開閉・資料をしまう',description:'机の下の、鍵の付いた引き出し。'},
 {id:'self',name:'あなた',gesture:'タップで調べる',description:'この会社の情報を守る、新しい担当者。'}
].map(o=>Object.freeze(o)));
export const OBJECT_BY_ID=Object.fromEntries(OBJECTS.map(o=>[o.id,o]));
export const APP_ACTIONS=Object.freeze([
 {id:'app-mail',name:'メール',symbol:'mail',hint:'送信はタップ・長押し・2回押しで反応が変わる。'},
 {id:'app-ai',name:'AI',symbol:'robot',hint:'仕事を全部任せられそうなアプリ。'},
 {id:'app-lock',name:'ロック',symbol:'lock',hint:'長押しすると、守る範囲が広がりそう。'},
 {id:'app-verify',name:'確認',symbol:'check',hint:'確認が終わるまで、もう少し長く押してみる。'},
 {id:'app-transfer',name:'転送',symbol:'portal',hint:'送り先は不明。資料を近づけると…。'}
].map(a=>Object.freeze(a)));
export const DROP_TARGETS=Object.freeze({pc:['fridge'],cat:['pc'],files:['boss','window','trash','drawer','pc'],button:[]});
