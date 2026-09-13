(() => {
Forest.makeControls=(canvas,player,world)=>{
const keys=new Set(),stick={x:0,z:0};let yaw=0,pitch=.62,distance=12,drag=null,paused=false;
const excluded=e=>e.target.closest?.('select,input,textarea,dialog');
addEventListener('keydown',e=>{if(excluded(e))return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault();}if(e.code==='KeyE')document.getElementById('talk').click();});
addEventListener('keyup',e=>keys.delete(e.code));function clear(){keys.clear();stick.x=stick.z=0;drag=null;document.getElementById('knob').style.transform='translate(0,0)';}
addEventListener('blur',clear);document.addEventListener('visibilitychange',()=>{if(document.hidden)clear()});
canvas.addEventListener('pointerdown',e=>{if(paused)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');});
canvas.addEventListener('pointermove',e=>{if(drag?.id!==e.pointerId)return;yaw-=(e.clientX-drag.x)*.006;pitch=THREE.MathUtils.clamp(pitch+(e.clientY-drag.y)*.004,.34,1.08);drag.x=e.clientX;drag.y=e.clientY;});
function end(){drag=null;canvas.classList.remove('dragging')}canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('wheel',e=>{if(paused)return;distance=THREE.MathUtils.clamp(distance+e.deltaY*.012,7,21);e.preventDefault();},{passive:false});
const joy=document.getElementById('joystick'),knob=document.getElementById('knob');let joyID=null;
function updateJoy(e){const r=joy.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,len=Math.hypot(dx,dy),scale=Math.min(1,40/Math.max(1,len));stick.x=dx*scale/40;stick.z=dy*scale/40;knob.style.transform=`translate(${dx*scale}px,${dy*scale}px)`;}
joy.addEventListener('pointerdown',e=>{joyID=e.pointerId;joy.setPointerCapture(e.pointerId);updateJoy(e);e.preventDefault()});joy.addEventListener('pointermove',e=>{if(joyID===e.pointerId)updateJoy(e)});for(const type of ['pointerup','pointercancel'])joy.addEventListener(type,()=>{joyID=null;stick.x=stick.z=0;knob.style.transform='translate(0,0)'});
function move(dt){if(paused)return false;let x=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0)+stick.x,z=(keys.has('KeyS')||keys.has('ArrowDown')?1:0)-(keys.has('KeyW')||keys.has('ArrowUp')?1:0)+stick.z;let len=Math.hypot(x,z);if(len<.08)return false;if(len>1){x/=len;z/=len;}let speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?7:4.3)*dt;let dx=(x*Math.cos(yaw)+z*Math.sin(yaw))*speed,dz=(-x*Math.sin(yaw)+z*Math.cos(yaw))*speed;
// Axis-separated collision allows sliding along buildings, trees, and shore.
if(!world.blocked(player.x+dx,player.z))player.x+=dx;if(!world.blocked(player.x,player.z+dz))player.z+=dz;player.y=world.groundHeight(player.x,player.z);return true;}
return{move,clear,getCamera(){return{yaw,pitch,distance}},reset(){player.set(-17,0,12);yaw=0;pitch=.62;distance=12;clear();},rotate(v){yaw+=v},setPaused(v){paused=v;clear();},get paused(){return paused}};
};
})();
