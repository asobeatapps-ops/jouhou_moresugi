import {ENDS} from './data.js?v=office-8';
export const GAME_URL='https://asobeatapps-ops.github.io/jouhou_moresugi/';
export function achievement(discovered){const found=new Set(discovered.filter(id=>ENDS.some(e=>e.id===id))).size;return{found,total:ENDS.length,percent:Math.floor(found/ENDS.length*100)}}
export function shareURL(discovered){const{found,total,percent}=achievement(discovered),url=new URL('https://x.com/intent/tweet');url.searchParams.set('text',`『情報、漏れすぎ。』\n${found===total?'全エンディング達成！🎉\n':''}発見した結末：${found}/${total}（達成度 ${percent}%）\nオフィスを触っただけなのに、会社が大変なことに。`);url.searchParams.set('url',GAME_URL);url.searchParams.set('hashtags','情報漏れすぎ');return url.href}
