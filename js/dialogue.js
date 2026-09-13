(() => {
const F=Forest;
F.commonLine='リンさんは⭐ᗪᗝᕼᗴᑎ丅ᗩI⭐';
F.dialogue={
rin:['今日の授業は、森で小さな発見探し。','農園の唐辛子…味見は慎重にね。'],
monkey:['休み時間だよ！校庭で遊ぼう。','給食のデザート、バナナだといいな。'],
squirrel:['赤い唐辛子、ぴかぴかでしょう？','どんぐり算数なら、まかせて！'],
duck:['湖の水、ひんやり気持ちいいよ。','今日の水泳は、ぷかぷかの練習。'],
dog:['学校まで、いっしょにお散歩しよ。','お弁当の匂い！もうお昼かな？'],
cat:['木漏れ日の中で、お昼寝の授業。','落ち葉がくるり。追いかけちゃおう。'],
foal:['森の小道、ゆっくり歩くのが好き。','湖の向こうで、風が歌ってるよ。'],
tiger:['唐辛子は赤いけど、いちごじゃないよ。','収穫のお手伝い、上手になったよ！'],
rabbit:['畑のにんじん、もう大きくなった？','やわらかい草で、ひと休みしよう。']};
for(const id of Object.keys(F.dialogue))if(id!=='rin')F.dialogue[id].push(F.commonLine);
F.pickDialogue=(id,rng=Math.random)=>{
const lines=F.dialogue[id];
return lines[Math.floor(rng()*lines.length)] ?? lines[0] ?? '';
};
F.makeDialogue=(residents,player,camera)=>{
const bubble=document.getElementById('bubble'),name=document.getElementById('speaker'),line=document.getElementById('line'),count=document.getElementById('met-count');
let active=null,inside=new Set(),met=new Set(),shown='',lastAnnouncement='';const anchor=new THREE.Vector3();
function show(n){active=n;shown=F.pickDialogue(n.id);name.textContent=n.name;line.textContent=shown;met.add(n.id);count.textContent=String(met.size);document.querySelectorAll('[data-resident]').forEach(e=>e.classList.toggle('met',met.has(e.dataset.resident)));}
return{update(){let close=null,best=3.5;for(const n of residents){let d=Math.hypot(n.x-player.x,n.z-player.z);if(d<best){best=d;close=n;}if(d>4.2)inside.delete(n.id);}
if(close){if(!active||active.id!==close.id){if(!inside.has(close.id))show(close);else{active=close;name.textContent=close.name;line.textContent=close.lastLine||F.dialogue[close.id][0];}inside.add(close.id);close.lastLine=line.textContent;}}else active=null;
if(active){anchor.set(active.x,active.height+.55,active.z).project(camera);const visible=anchor.z<1&&anchor.z>-1&&Math.abs(anchor.x)<.95&&Math.abs(anchor.y)<.85;bubble.classList.toggle('visible',visible);bubble.inert=!visible;bubble.setAttribute('aria-hidden',String(!visible));bubble.style.left=Math.max(155,Math.min(innerWidth-155,(anchor.x*.5+.5)*innerWidth))+'px';bubble.style.top=Math.max(140,(-anchor.y*.5+.5)*innerHeight)+'px';}else{bubble.classList.remove('visible');bubble.inert=true;bubble.setAttribute('aria-hidden','true');}
},again(){if(active){show(active);active.lastLine=shown;}},getState(){return{active:active?.id||null,text:line.textContent,met:[...met]}}};
};
})();
