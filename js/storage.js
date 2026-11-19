export const STORAGE_KEY='asobeat_jouhou_moresugi_v1';
const integer=(n,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=0&&n<=max?n:0;
export function sanitize(value){const v=value&&typeof value==='object'?value:{};return{version:1,best:integer(v.best),maxCombo:integer(v.maxCombo),sound:typeof v.sound==='boolean'?v.sound:true,plays:integer(v.plays),discovered:[...new Set(Array.isArray(v.discovered)?v.discovered.filter(x=>Number.isInteger(x)&&x>=1&&x<=15):[])].sort((a,b)=>a-b),history:Array.isArray(v.history)?v.history.filter(x=>x&&Number.isInteger(x.end)&&x.end>=0&&x.end<=15).slice(-50).map(x=>({end:x.end,score:integer(x.score),combo:integer(x.combo),date:typeof x.date==='string'?x.date:''})):[]}}
export class SaveStore{
 constructor(storage){this.storage=storage;this.failed=false;try{this.data=sanitize(JSON.parse(storage.getItem(STORAGE_KEY)||'{}'))}catch{this.failed=true;this.data=sanitize({})}}
 save(){try{this.storage.setItem(STORAGE_KEY,JSON.stringify(this.data));this.failed=false;return true}catch{this.failed=true;return false}}
 start(){this.data.plays++;this.save();return this.data.plays}
 sound(enabled){this.data.sound=enabled;this.save()}
 result({id,score,maxCombo}){const isEnding=Number.isInteger(id)&&id>=1&&id<=15;if(!isEnding&&id!=='complete')return false;const fresh=isEnding&&!this.data.discovered.includes(id);if(fresh)this.data.discovered.push(id);this.data.discovered.sort((a,b)=>a-b);this.data.best=Math.max(this.data.best,score);this.data.maxCombo=Math.max(this.data.maxCombo,maxCombo);this.data.history.push({end:isEnding?id:0,score,combo:maxCombo,date:new Date().toISOString()});this.data.history=this.data.history.slice(-50);this.save();return fresh}
}
