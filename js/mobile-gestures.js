// Prevent browser defaults in the play area without swallowing pointer input used by the game.
// Pinch zoom remains available on the title, collection and other non-play screens.
export function bindPlayGestures(root){
 const prevent=e=>{if(e.cancelable)e.preventDefault()};
 const events=['contextmenu','selectstart','dblclick','gesturestart','gesturechange'];
 for(const event of events)root.addEventListener(event,prevent,{passive:false});
 return()=>{for(const event of events)root.removeEventListener(event,prevent)};
}
