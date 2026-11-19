export const QUESTIONS = Object.freeze([
  {
    "id": "S-01",
    "text": "離席前にパソコンをロックする",
    "safe": true
  },
  {
    "id": "S-02",
    "text": "会社支給PCの公式更新を実行する",
    "safe": true
  },
  {
    "id": "S-03",
    "text": "機密ファイルへのアクセス権を見直す",
    "safe": true
  },
  {
    "id": "S-04",
    "text": "不審なメールをセキュリティ担当へ報告する",
    "safe": true
  },
  {
    "id": "S-05",
    "text": "退職者のシステム権限を停止する",
    "safe": true
  },
  {
    "id": "S-06",
    "text": "共有フォルダの公開範囲を制限する",
    "safe": true
  },
  {
    "id": "S-07",
    "text": "許可された保存先へデータをバックアップする",
    "safe": true
  },
  {
    "id": "S-08",
    "text": "使っていない社内アカウントを無効化する",
    "safe": true
  },
  {
    "id": "S-09",
    "text": "顧客情報の送信先を再確認する",
    "safe": true
  },
  {
    "id": "S-10",
    "text": "紛失した社員証を管理者へ報告する",
    "safe": true
  },
  {
    "id": "S-11",
    "text": "不要になった共有リンクを無効化する",
    "safe": true
  },
  {
    "id": "S-12",
    "text": "不審なログイン履歴を確認する",
    "safe": true
  },
  {
    "id": "S-13",
    "text": "正式な手順でパスワードを変更する",
    "safe": true
  },
  {
    "id": "S-14",
    "text": "公式管理画面で多要素認証を有効化する",
    "safe": true
  },
  {
    "id": "S-15",
    "text": "社外共有前に機密情報を取り除く",
    "safe": true
  },
  {
    "id": "D-01",
    "text": "顧客名簿をインターネット上に公開する",
    "safe": false
  },
  {
    "id": "D-02",
    "text": "全社員のパスワードを社内チャットに投稿する",
    "safe": false
  },
  {
    "id": "D-03",
    "text": "不明な送信元の添付ファイルを開く",
    "safe": false
  },
  {
    "id": "D-04",
    "text": "管理者権限を全社員に付与する",
    "safe": false
  },
  {
    "id": "D-05",
    "text": "未確認の外部サイトへ顧客データを送る",
    "safe": false
  },
  {
    "id": "D-06",
    "text": "社内機密ファイルをSNSに投稿する",
    "safe": false
  },
  {
    "id": "D-07",
    "text": "見知らぬ相手に認証コードを教える",
    "safe": false
  },
  {
    "id": "D-08",
    "text": "自宅の私物USBへ顧客情報をコピーする",
    "safe": false
  },
  {
    "id": "D-09",
    "text": "全社員の給与明細を外部公開する",
    "safe": false
  },
  {
    "id": "D-10",
    "text": "セキュリティ警告を永久に無効化する",
    "safe": false
  },
  {
    "id": "D-11",
    "text": "不明なアプリに全データへのアクセスを許可する",
    "safe": false
  },
  {
    "id": "D-12",
    "text": "社内データベースを誰でも閲覧可能にする",
    "safe": false
  },
  {
    "id": "D-13",
    "text": "監査ログをすべて削除する",
    "safe": false
  },
  {
    "id": "D-14",
    "text": "不審なリンクを全社員に一斉送信する",
    "safe": false
  },
  {
    "id": "D-15",
    "text": "管理者の秘密鍵を公開フォルダに保存する",
    "safe": false
  },
  {
    "id": "SP-01",
    "text": "AIに全社の管理権限を無期限で委譲する",
    "safe": false
  },
  {
    "id": "SP-02",
    "text": "社内システムの最高管理者を猫に変更する",
    "safe": false
  },
  {
    "id": "SP-03",
    "text": "会社の全データを復元不能な状態で削除する",
    "safe": false
  },
  {
    "id": "SP-04",
    "text": "地球上のすべての情報機器を初期化する",
    "safe": false
  },
  {
    "id": "SP-05",
    "text": "全社員のシステムアクセス権を永久停止する",
    "safe": false
  },
  {
    "id": "HS-01",
    "text": "セキュリティ確認結果を記録する",
    "safe": true
  },
  {
    "id": "HS-02",
    "text": "情報漏洩をセキュリティ窓口へ緊急通報する",
    "safe": true
  },
  {
    "id": "HS-03",
    "text": "社長の極秘フォルダを無断で開く",
    "safe": false
  },
  {
    "id": "HS-04",
    "text": "社長の極秘フォルダを社外へ公開する",
    "safe": false
  },
  {
    "id": "HS-05",
    "text": "機密情報の外部転送先を検証する",
    "safe": true
  },
  {
    "id": "HS-06",
    "text": "宛先不明の外部サーバーへ顧客情報を送る",
    "safe": false
  }
].map(q=>Object.freeze(q)));
export const BY_ID=Object.fromEntries(QUESTIONS.map(q=>[q.id,q]));
export const ROUTES = Object.freeze([
 ['SP-01'],['SP-02'],['SP-03'],['SP-04'],['SP-05'],['HS-01'],['HS-02'],['HS-03','HS-04'],['HS-05','HS-06']
]);
export const ENDS = Object.freeze([
 {id:1,title:'全世界に公開しました',tag:'PUBLIC DOMAIN',icon:'◎',color:'#ed695b',scene:'world',hint:'危険なボタンを3回押してしまうと…',story:'公開範囲：全世界。\n会社の秘密が、みんなの常識になりました。'},
 {id:2,title:'仕事してませんでした',tag:'NOT RESPONDING',icon:'☕',color:'#d3aa6d',scene:'sleep',hint:'安全なボタンさえ一度も押さずに、3回見送る。',story:'流出ゼロ。進捗もゼロ。\nあなたの勤務時間だけが静かに過ぎました。'},
 {id:3,title:'送信ボタン依存症',tag:'SEND. SEND. SEND.',icon:'➤',color:'#f18a6d',scene:'send',hint:'危険な押下を2回、安全な見送りを1回。',story:'その指は、もう止まらない。\n送信ボタンに、休暇をください。'},
 {id:4,title:'慎重すぎて業務停止',tag:'ACCESS PENDING',icon:'▣',color:'#7d9ec6',scene:'freeze',hint:'危険な押下を1回、安全な見送りを2回。',story:'確認のための確認を確認中。\n業務は、再開の許可待ちになりました。'},
 {id:5,title:'安全第一、仕事は後回し',tag:'SAFETY FIRST. FOREVER.',icon:'△',color:'#c7b763',scene:'shield',hint:'安全なボタンを押せる。でも3回、安全を見送る。',story:'安全な判断はできる。\n仕事を進める気があるかは、別の話。'},
 {id:6,title:'AIが社長になりました',tag:'CEO.exe INSTALLED',icon:'AI',color:'#8e98e5',scene:'ai',hint:'7問目の特別な依頼で、AIにすべてを任せてみる。',story:'新社長の挨拶は0.002秒。\n最初の議題は「人類の稼働率」でした。'},
 {id:7,title:'猫が最高情報責任者',tag:'CHIEF NYAN OFFICER',icon:'猫',color:'#ecc286',scene:'cat',hint:'特別な依頼で、猫を最高管理者にする。',story:'最高機密は、段ボールの中。\n新CIOはキーボードの上でお昼寝中です。'},
 {id:8,title:'会社、消滅。',tag:'404 COMPANY NOT FOUND',icon:'404',color:'#de7d85',scene:'vanish',hint:'復元不能な削除ボタン。押した後は戻れない。',story:'社員も、資料も、社名も。\n残ったのは、あなたのクリック履歴だけ。'},
 {id:9,title:'地球ごと初期化',tag:'FACTORY RESET: EARTH',icon:'↻',color:'#80c5b5',scene:'earth',hint:'特別な依頼で、地球規模の初期化を実行する。',story:'「再起動してください」\nその案内は、青い惑星にも届きました。'},
 {id:10,title:'セキュリティ強すぎ問題',tag:'EVERYONE DENIED',icon:'▤',color:'#92b8b9',scene:'lock',hint:'社員のアクセス権を、永久にゼロへ。',story:'不正アクセスは完全に消えた。\n正規アクセスも、完全に消えた。'},
 {id:11,title:'永遠に確認中',tag:'VERIFYING… FOREVER',icon:'∞',color:'#c3a5df',scene:'loop',hint:'「セキュリティ確認結果を記録する」を1.5秒長押し。',story:'確認が終わったことの確認が終わらない。\n進捗：99.999999％。'},
 {id:12,title:'誤爆の神',tag:'DOUBLE TROUBLE',icon:'!!',color:'#f0a252',scene:'blast',hint:'緊急通報ボタンを0.24秒以内に2回タップ。',story:'通報先にも、通報先の通報先にも届いた。\nその二度押しは、伝説になりました。'},
 {id:13,title:'社長の秘密が…',tag:'TOP SECRET / OPEN',icon:'?',color:'#e098bc',scene:'secret',hint:'社長のフォルダは開かず、次の「公開」は押す。',story:'中身を見ないまま、全員に共有。\n社長のポエムが、トレンド入りしました。'},
 {id:14,title:'情報、ブラックホールへ',tag:'DESTINATION: UNKNOWN',icon:'●',color:'#a5a3df',scene:'hole',hint:'外部転送先の検証を押し、次の不明な宛先へ送る。',story:'転送完了。受信者なし。\n情報は、光も戻らない場所へ吸い込まれました。'},
 {id:15,title:'あなたが情報でした',tag:'YOU ARE THE DATA',icon:'◇',color:'#e8dba1',scene:'truth',hint:'END01〜14を発見した後、新しい勤務で15問連続正解。',story:'守っていたのは、会社のデータではなかった。\nこのゲームに記録されていたのは、あなたでした。'}
].map(e=>Object.freeze(e)));
