(() => {
const F=Forest,T=THREE,P=F.part,G=F.group;
const C={cream:'#fff0d5',black:'#27282b',pink:'#dfaaa0',brown:'#996334',white:'#fffdf2'};
function bow(p,color,y,z){P(p,'sphere',color,-.15,y,z,.17,.105,.065,0,0,-.2);P(p,'sphere',color,.15,y,z,.17,.105,.065,0,0,.2);P(p,'sphere',color,0,y,z+.025,.07);}
function eyes(h,x=.23,y=.05,z=.45,animal=true){for(const s of [-1,1]){P(h,'sphere',C.black,s*x,y,z,.075,.09,.045);P(h,'sphere','#ffffff',s*x-.017,y+.029,z+.037,.019,.021,.012);}}
function smile(h,y=-.2,z=.52){F.rod(h,'#6d4635',[-.065,y+.02,z],[0,y,z+.008],.012);F.rod(h,'#6d4635',[0,y,z+.008],[.065,y+.02,z],.012);}
function pawRig(p,side,color,kind){const g=G(p,side*.4,1.0,0);g.userData.role='forelimb';if(kind==='duck'){P(g,'sphere',color,0,-.12,0,.14,.34,.24,0,0,side*-.16);}else if(kind==='foal'){P(g,'sphere',color,0,-.17,.06,.105,.32,.11);P(g,'cylinder','#403a35',0,-.45,.09,.115,.15,.12);}else{P(g,'sphere',color,0,-.19,.08,kind==='monkey'?.11:.135,.31,.14,0,0,side*.15);P(g,'sphere',kind==='monkey'?'#b99584':kind==='cat'?C.white:color,side*.01,-.42,.14,.14,.12,.16);if(!['monkey','squirrel'].includes(kind))for(let k=-1;k<=1;k++)P(g,'sphere',C.cream,k*.05,-.42,.273,.022,.03,.015);}
return g;}
function hindRig(p,side,color,kind){const g=G(p,side*.2,.48,0);g.userData.role='hindlimb';if(kind==='duck'){P(g,'cylinder','#df912c',0,-.18,.01,.048,.36,.045);P(g,'sphere','#ed9e31',0,-.41,.13,.21,.065,.23);}else if(kind==='foal'){P(g,'cylinder',color,0,-.15,0,.105,.62,.11);P(g,'cylinder',C.cream,0,-.32,0,.107,.22,.115);P(g,'sphere','#3b3832',0,-.43,.045,.14,.095,.18);}else{P(g,'sphere',color,0,-.15,0,.17,.3,.18);P(g,'sphere',kind==='monkey'?'#aa8b7e':kind==='cat'?C.white:color,0,-.36,.15,kind==='rabbit'?.23:.19,.12,.29);}
return g;}
F.makeAnimal=(kind)=>{
const root=new T.Group(),body=G(root),head=G(body,0,1.53,.03),tail=G(body,0,.7,-.28);let color={monkey:'#948478',squirrel:'#c88a42',duck:C.white,dog:'#d29754',cat:'#26282c',foal:'#b47b48',tiger:'#df9e4b',rabbit:'#c6a17b'}[kind];
P(body,'sphere',color,0,.85,0,.42,.59,.34);P(body,'sphere',kind==='monkey'?'#c4b4a2':kind==='duck'?C.white:C.cream,0,.82,.21,.3,.43,.16);
P(head,'sphere',color,0,0,0,kind==='foal'?.39:.47,kind==='foal'?.55:.43,.38);
const fore=[pawRig(body,-1,color,kind),pawRig(body,1,color,kind)],hind=[hindRig(root,-1,color,kind),hindRig(root,1,color,kind)];
if(kind==='monkey'){
for(const s of [-1,1]){P(head,'sphere',color,s*.46,.02,0,.21,.24,.11);P(head,'sphere','#c69888',s*.49,.02,.073,.14,.17,.055);P(head,'sphere','#d3ad99',s*.16,.015,.3,.23,.25,.12);}
P(head,'sphere','#d5aa98',0,-.19,.34,.24,.15,.12);P(head,'sphere','#c48a7b',0,-.1,.447,.065,.05,.045);P(head,'cone',color,0,.41,-.02,.17,.25,.14);bow(body,'#d42c3d',1.2,.34);eyes(head,.19,.055,.404);smile(head,-.24,.455);
for(let i=0;i<7;i++)P(tail,'sphere',color,Math.sin(i*.4)*.2,-i*.075,-i*.105,.072);
}else if(kind==='duck'){
P(head,'sphere','#edac32',0,-.13,.43,.25,.085,.29);P(head,'sphere','#d58d22',0,-.2,.43,.22,.035,.25);eyes(head,.27,.04,.3);P(tail,'cone',C.white,0,.03,-.16,.22,.45,.19,-1.1);
}else if(kind==='foal'){
for(const s of [-1,1]){P(head,'sphere',color,s*.24,.52,-.04,.14,.29,.1,0,0,-s*.22);P(head,'sphere','#71432b',s*.24,.54,.04,.072,.17,.025,0,0,-s*.22);}
P(head,'sphere',color,0,-.27,.22,.28,.39,.29);P(head,'sphere','#e9d8b6',0,-.43,.39,.25,.16,.19);P(head,'sphere',C.white,0,.01,.366,.08,.38,.027);P(head,'sphere',C.white,0,.25,.31,.14,.18,.07);eyes(head,.265,.06,.27);for(const s of [-1,1])P(head,'sphere','#665548',s*.115,-.4,.546,.03,.045,.018);
for(let i=0;i<6;i++)P(head,'sphere','#80502e',0,.4-i*.17,-.31,.12,.16,.11);P(head,'sphere','#efd4a5',0,.44,.17,.23,.14,.14);
P(tail,'sphere','#754b32',0,-.23,-.17,.12,.4,.13,-.4);
}else{
const pointed=['dog','cat','squirrel'].includes(kind);
for(const s of [-1,1]){if(kind==='rabbit'){P(head,'sphere',color,s*.2,.51,-.02,.145,.36,.12,0,0,-s*.12);P(head,'sphere','#d4ac99',s*.2,.54,.08,.075,.25,.025,0,0,-s*.12);}else if(pointed){P(head,'cone',color,s*.32,.38,-.04,.205,.38,.17,0,0,-s*.25);P(head,'cone',kind==='cat'?'#b48d85':'#b57a56',s*.32,.4,.075,.11,.21,.036,0,0,-s*.25);}else{P(head,'sphere',color,s*.36,.3,-.04,.18,.18,.11);P(head,'sphere','#725546',s*.36,.31,.052,.105,.11,.025);}}
for(const s of [-1,1])P(head,'sphere',C.cream,s*.13,-.15,.325,.2,.17,.115);
if(kind==='cat'){P(head,'cone',C.white,0,.03,.36,.13,.4,.038);P(head,'sphere',C.white,0,-.27,.2,.31,.16,.22);}
P(head,'sphere',kind==='rabbit'||kind==='cat'? '#b88482':C.black,0,-.1,.47,.065,.045,.036);if(kind==='cat')for(const s of [-1,1])P(head,'sphere','#b9bf74',s*.235,.065,.345,.097,.117,.048);eyes(head,kind==='squirrel'?.27:.235,.065,kind==='cat'?.371:.336);smile(head,-.235,.449);
if(kind==='dog')for(const s of [-1,1])P(head,'sphere',C.cream,s*.235,.2,.318,.09,.045,.025);
if(kind==='squirrel'){bow(body,'#29799e',1.2,.33);P(tail,'sphere','#b7793e',.1,.2,-.36,.34,.75,.34,-.55);P(tail,'sphere','#d6ac76',.12,.65,-.64,.35,.49,.32,-.25);P(tail,'sphere','#ebc896',.11,.75,-.7,.23,.28,.2);}
else if(kind==='rabbit')P(tail,'sphere',C.cream,0,-.1,-.09,.2);
else if(kind==='dog')P(tail,'torus',color,.08,.08,-.03,.23,.23,.23,Math.PI/2);
else {for(let i=0;i<7;i++)P(tail,'sphere',kind==='tiger'&&i%2?C.black:color,i*.07,Math.sin(i*.35)*.1,-i*.115,.085);}
if(kind==='tiger'){
for(let k=0;k<3;k++){P(head,'sphere',C.black,(k-1)*.17,.29,.256,.035,.115,.035,0,0,(k-1)*-.35);for(const s of [-1,1])P(head,'sphere',C.black,s*.315,.13-k*.105,.293,.076,.019,.025,0,s*.4,-s*.22);}
for(let k=0;k<4;k++)for(const s of [-1,1])P(body,'sphere',C.black,s*.345,.62+k*.19,.03,.08,.033,.25,0,0,s*.2);
}
}
// Separate rigid skin groups from the four limb joints before batching.
head.removeFromParent();tail.removeFromParent();fore.forEach(x=>x.removeFromParent());F.mergeRigid(body);body.add(head,tail,...fore);[head,tail,...fore,...hind].forEach(F.mergeRigid);
root.userData={kind,body,head,fore,hind,tail,limbCount:4,foreCount:2,hindCount:2,height:kind==='foal'?2.55:kind==='rabbit'?2.42:2.12};return root;
};
F.makeRin=()=>{const root=new T.Group(),body=G(root),head=G(body,0,2.06,0),fore=[],hind=[];
const hair='#95612f',skin='#f1d2b7',navy='#263c55';
P(body,'sphere',C.white,0,1.45,0,.31,.41,.22);P(body,'cylinder',navy,0,.83,0,.38,.78,.33);P(body,'cylinder',navy,0,1.17,0,.3,.14,.25);
// Tiny cream flowers distributed around the navy skirt, actual surface geometry.
for(let j=0;j<4;j++)for(let k=0;k<10;k++){let a=k*Math.PI/5+j*.24,y=.49+j*.18;const g=G(body,Math.sin(a)*.384,y,Math.cos(a)*.334);g.rotation.y=a;P(g,'sphere','#e8c999',0,0,0,.018);for(let q=0;q<5;q++)P(g,'sphere','#e9e1cb',Math.cos(q*1.256)*.026,Math.sin(q*1.256)*.026,.005,.019,.024,.01);}
P(head,'sphere',hair,0,.035,-.06,.37,.43,.3);P(head,'sphere',skin,0,-.015,.076,.3,.34,.265);
for(const s of [-1,1]){P(head,'sphere',hair,s*.21,.24,.15,.18,.16,.19,0,0,s*-.6);P(head,'sphere',skin,s*.3,-.055,.04,.065,.09,.06);for(let i=0;i<6;i++)P(body,'sphere',hair,s*(.29+i*.019),1.91-i*.105,.065+i*.038,.086,.094,.08,0,0,s*(i%2?.45:-.45));P(body,'cone',hair,s*.41,1.26,.29,.062,.2,.06);}
for(const s of [-1,1]){P(head,'sphere',C.white,s*.125,.035,.318,.077,.105,.022);P(head,'sphere','#4c4538',s*.125,.035,.34,.042,.073,.017);P(head,'sphere',C.white,s*.135,.068,.355,.015,.022,.009);P(head,'torus','#423a30',s*.145,.035,.362,.129,.139,.075);F.rod(head,'#423a30',[s*.27,.04,.36],[s*.3,.06,.02],.013);P(head,'sphere','#e4aba2',s*.22,-.105,.269,.058,.031,.016);}
F.rod(head,'#423a30',[-.02,.04,.362],[.02,.04,.362],.013);P(head,'sphere',skin,0,-.055,.353,.025,.046,.028);P(head,'sphere','#aa6258',0,-.16,.306,.075,.043,.018);P(head,'sphere',C.white,0,-.143,.322,.055,.014,.008);
for(const s of [-1,1]){P(body,'cone',C.white,s*.1,1.71,.17,.105,.2,.045,0,0,s*.6);const a=G(body,s*.34,1.65,0);a.userData.role='arm';P(a,'sphere',C.white,0,-.12,0,.13,.22,.15);P(a,'sphere',skin,0,-.4,.015,.075,.22,.075);P(a,'sphere',skin,0,-.58,.03,.072,.1,.06);fore.push(a);
const l=G(root,s*.14,.34,0);P(l,'cylinder','#29272e',0,-.08,0,.075,.35,.08);P(l,'sphere','#26242a',0,-.25,.085,.105,.072,.2);P(l,'box','#26242a',0,-.3,-.025,.09,.07,.09);hind.push(l);}
head.removeFromParent();fore.forEach(x=>x.removeFromParent());F.mergeRigid(body);body.add(head,...fore);[head,...fore,...hind].forEach(F.mergeRigid);root.userData={kind:'rin',body,head,fore,hind,height:2.6};return root;};
F.residentSpecs=[
{id:'rin',name:'リンさん',x:-17,z:7,area:'森の学校'},
{id:'monkey',name:'Cさん',x:-8,z:12,area:'校庭'},
{id:'dog',name:'Yさん',x:-25,z:14,area:'校庭'},
{id:'squirrel',name:'Sさん',x:12,z:7,area:'唐辛子畑'},
{id:'tiger',name:'Syさん',x:27,z:13,area:'森の学校農園'},
{id:'rabbit',name:'Mさん',x:26,z:-1,area:'森の学校農園'},
{id:'cat',name:'Aさん',x:-17,z:-17,area:'森'},
{id:'foal',name:'Dさん',x:2,z:-25,area:'森'},
{id:'duck',name:'Hさん',x:25,z:-28,area:'湖'}];
F.makeResidents=scene=>F.residentSpecs.map((s,i)=>{const model=s.id==='rin'?F.makeRin():F.makeAnimal(s.id);model.position.set(s.x,0,s.z);model.rotation.y=i%2?.2:-.2;scene.add(model);return {...s,model,phase:i*1.7,baseYaw:model.rotation.y,height:model.userData.height}});
F.animateResidents=(residents,t,player)=>{for(const n of residents){const r=n.model.userData,d=n.model.position.distanceTo(player);r.body.position.y=Math.sin(t*1.7+n.phase)*.028;r.head.rotation.y=Math.sin(t*.6+n.phase)*.12;const target=d<4?Math.atan2(player.x-n.x,player.z-n.z):n.baseYaw+Math.sin(t*.3+n.phase)*.15;n.model.rotation.y+=Math.atan2(Math.sin(target-n.model.rotation.y),Math.cos(target-n.model.rotation.y))*.04;r.fore.forEach((g,i)=>{g.rotation.x=Math.sin(t*1.8+n.phase+i)*.08;g.rotation.z=Math.sin(t*1.3+n.phase+i)*.06;});if(r.tail)r.tail.rotation.z=Math.sin(t*1.5+n.phase)*.12;}};
})();
