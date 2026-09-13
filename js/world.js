(() => {
const F=Forest,T=THREE,S=F.stamp,P=F.part;
F.makeWorld=scene=>{
const blockers=[],waterCenter={x:25,z:-38,rx:13,rz:10};
const paths=[[-18,27,-18,8,5],[-30,9,35,9,4.4],[-4,9,-4,-16,4],[-4,-16,-19,-19,3.4],[-4,-16,2,-25,3.4],[2,-25,24,-26,3.7],[24,-26,25,-34,2.8]];
function distSegment(x,z,p){const dx=p[2]-p[0],dz=p[3]-p[1],t=T.MathUtils.clamp(((x-p[0])*dx+(z-p[1])*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(x-p[0]-t*dx,z-p[1]-t*dz)}
function nearPath(x,z){return paths.some(p=>distSegment(x,z,p)<p[4]/2+1.6)}
function lake(x,z,margin=0){return ((x-25)/(13+margin))**2+((z+38)/(10+margin))**2<1}
S('box','#85b567',0,-.55,0,112,1,112);

// Ground-level rounded sandy paths.
for(const p of paths){let dx=p[2]-p[0],dz=p[3]-p[1],len=Math.hypot(dx,dz);S('box','#dfc797',(p[0]+p[2])/2,-.017,(p[1]+p[3])/2,p[4],.045,len,0,Math.atan2(dx,dz));for(const [x,z] of [[p[0],p[1]],[p[2],p[3]]])S('cylinder','#dfc797',x,-.015,z,p[4]/2,.05,p[4]/2);}
S('cylinder','#dbcb9f',-18,-.012,11,12,.05,8);
// School: timber, plaster, raised porch, tiled gable roof and bell tower.
const school=F.group(scene,-19,0,-2),wood='#9b6c42',darkwood='#70513b';
P(school,'box','#efdcb2',0,2.65,0,16,5.3,9);P(school,'box',wood,0,.3,0,16.4,.6,9.4);
for(let x=-8;x<=8;x+=4)P(school,'box',wood,x,2.8,4.54,.19,5.2,.2);
for(let y=1;y<5.2;y+=.5)P(school,'box','#dcc391',0,y,4.52,15.8,.045,.07);
for(const s of [-1,1]){P(school,'box','#b35d43',0,6.65,s*2.43,17.7,.32,5.8,s*.51);for(let x=-8.5;x<9;x+=.65)P(school,'box','#bb694c',x,6.79,s*2.43,.055,.055,5.8,s*.51);}
P(school,'box',darkwood,0,8,0,17.8,.21,.23);
// Triangle gables face east/west.
const shape=new T.Shape();shape.moveTo(-4.5,0);shape.lineTo(4.5,0);shape.lineTo(0,2.6);shape.closePath();const gg=new T.ShapeGeometry(shape);
for(const x of [-8,8]){let g=new T.Mesh(gg,new T.MeshStandardMaterial({color:'#e7c893',side:T.DoubleSide}));g.rotation.y=Math.PI/2;g.position.set(x,5.3,0);school.add(g);}
for(const x of [-5.4,5.4]){P(school,'box',darkwood,x,3.1,4.59,3.5,2.6,.14);P(school,'box','#a5d6d0',x,3.1,4.68,3.14,2.26,.06);P(school,'box',wood,x,3.1,4.74,.12,2.3,.06);P(school,'box',wood,x,3.1,4.74,3.2,.12,.06);P(school,'box',wood,x,1.72,4.85,3.8,.16,.55);}
P(school,'box',darkwood,0,1.85,4.58,2.4,3.4,.2);for(const s of [-1,1]){P(school,'box','#bb9260',s*.54,1.85,4.7,1.03,3.1,.1);P(school,'box','#b8deda',s*.54,2.65,4.77,.65,.8,.04);P(school,'sphere','#e8c078',s*.15,1.7,4.81,.08);}
P(school,'box',wood,0,.13,5.7,5,.26,2.3);P(school,'box','#cba373',0,.07,7,5.5,.14,.8);
F.label(school,'森の学校',0,4.6,4.82,4.8);
P(school,'box','#d8b881',0,8.6,0,1.9,1.7,1.7);P(school,'cone','#538b82',0,10,0,1.7,1.4,1.7,0,Math.PI/4);P(school,'sphere','#ddaa45',0,8.65,1,.38,.46,.2);P(school,'box',darkwood,0,8.7,.95,.07,1.1,.08);
blockers.push({type:'box',x1:-27.5,x2:-10.5,z1:-7,z2:3.3});F.mergeRigid(school);
function bench(x,z,angle=0){const g=F.group(scene,x,0,z);g.rotation.y=angle;for(const s of [-1,1]){P(g,'box','#4d6856',s*1.2,.4,0,.17,.8,.8);P(g,'box','#4d6856',s*1.2,1,.32,.14,1.3,.14);}for(let k=0;k<3;k++){P(g,'box','#bb8650',0,.83,-.29+k*.27,3.1,.14,.23);P(g,'box','#bb8650',0,1.22+k*.23,.39,3.1,.17,.14);}F.mergeRigid(g);}
bench(-30,8,.25);bench(-9,3,-.25);bench(15,-26,-.2);
function sign(text,x,z,width=4.5){for(const s of [-1,1])S('cylinder',wood,x+s*width*.35,1,z,.085,2,.085);F.label(scene,text,x,1.8,z+.08,width);}
sign('森の学校農園',8.5,10,6);sign('唐辛子畑',15,4,4);sign('こもれびの森',-6,-9,4.5);sign('しずかな湖',20,-24,4.3);
// Four broad plots, rows of peppers in the first, vegetables elsewhere.
const plots=[{x:16,z:-1,kind:'pepper'},{x:32,z:-1,kind:'pepper'},{x:16,z:18,kind:'carrot'},{x:32,z:18,kind:'cabbage'}];
for(const plot of plots){S('box','#9f784f',plot.x,.015,plot.z,10,.08,7.3);for(const d of [-1,1]){S('box','#be9762',plot.x,.11,plot.z+d*3.7,10.4,.22,.18);S('box','#be9762',plot.x+d*5.2,.11,plot.z,.18,.22,7.6);}
for(let row=0;row<4;row++){let z=plot.z-2.6+row*1.72;S('sphere','#91683e',plot.x,.12,z,4.7,.18,.42);for(let col=0;col<8;col++){let x=plot.x-4.15+col*1.18;
if(plot.kind==='pepper'){S('cylinder','#498249',x,.62,z,.04,.95,.04);for(let k=0;k<3;k++){let a=k*2.1;S('leaf','#3f8745',x+Math.cos(a)*.2,.55+k*.18,z+Math.sin(a)*.14,.28,.07,.13,0,a,.28);S('cone',k%2?'#c8402e':'#e34d31',x+Math.cos(a)*.23,.38+k*.18,z+Math.sin(a)*.18,.065,.35,.07,0,0,.28+Math.PI);}}
else if(plot.kind==='carrot'){S('cone','#e99034',x,.16,z,.12,.32,.12,0,0,Math.PI);for(let k=0;k<3;k++)S('leaf','#55934b',x+(k-1)*.09,.37,z,.08,.25,.1,0,0,(k-1)*.4);}
else {S('sphere','#8db966',x,.28,z,.38,.27,.35);for(let k=0;k<3;k++)S('leaf','#6da45d',x+Math.sin(k*2.1)*.2,.27,z+Math.cos(k*2.1)*.18,.23,.18,.22);}
}}
}
function crate(x,z,pepper=false){S('box','#795b3c',x,.12,z,1.6,.15,1.2);for(const s of [-1,1])for(let y=.25;y<.85;y+=.24){S('box','#c29960',x,y,z+s*.57,1.6,.17,.1);S('box','#c29960',x+s*.75,y,z,.1,.17,1.2);}if(pepper)for(let i=0;i<10;i++)S('cone','#de4e32',x+(F.random()-.5),.65,z+(F.random()-.5)*.8,.09,.42,.09,0,F.random()*6,1.4);}
crate(9,1,true);crate(10.8,1,true);crate(36,7);S('box','#477f74',34, .4,6,1.7,.8,1.2);
F.rod(scene,wood,[37,0,6],[37.5,2,6],.06);P(scene,'box','#718284',37,.2,6,.55,.5,.1);F.rod(scene,wood,[38,0,6],[38.3,2,6],.05);for(let k=0;k<5;k++)S('box','#718284',37.85+k*.1,.12,6,.05,.3,.08);
// Low fences framing the garden with a wide entrance and crossing paths.
for(let x=9;x<=38;x+=2.5){S('box',wood,x,.7,24,.11,1.4,.11);if(x<36)for(let y of [.45,1])S('box','#c8a36a',x+1.25,y,24,2.5,.11,.09);}
function tree(x,z,scale=1){const h=(4.8+F.random()*1.7)*scale;S('cylinder','#947145',x,h*.35,z,.25*scale,h*.7,.25*scale);const colors=['#57944d','#6da452','#77ad57'];for(let i=0;i<3;i++)S('leaf',colors[i],x+Math.sin(i*2.1)*.7*scale,h+(i===2?.55:0),z+Math.cos(i*2.1)*.7*scale,1.8*scale,1.65*scale,1.8*scale);blockers.push({type:'circle',x,z,r:.38*scale});}
for(const [x,z,s] of [[-32,0,1.2],[-33,18,1],[-4,18,1.05],[-4,29,1.2],[40,17,1.1],[-33,-8,1],[-31,-26,1],[40,-20,1]])tree(x,z,s);
for(let i=0;i<165;i++){const x=-46+F.random()*92,z=-48+F.random()*42;if(nearPath(x,z)||lake(x,z,3)||F.residentSpecs.some(n=>Math.hypot(n.x-x,n.z-z)<3)|| (x>-29&&x<-9&&z>-10)|| (x>8&&z>-8))continue;tree(x,z,.65+F.random()*.5);}
// A distant tree belt makes a finite map feel like part of a larger woodland.
for(let i=0;i<45;i++){const a=i/45*Math.PI*2;tree(Math.sin(a)*51,Math.cos(a)*51,.9+F.random()*.4);}
for(let i=0;i<180;i++){let x=(F.random()-.5)*98,z=(F.random()-.5)*98;if(nearPath(x,z)||lake(x,z,1)|| (x>-29&&x<39&&z>-8&&z<25))continue;let r=.2+F.random()*.6;S('leaf','#91a38a',x,r*.45,z,r,r*.65,r*.8,0,F.random()*6);}
// Stumps, grasses and flowers use shared instanced meshes.
for(const [x,z] of [[-21,-15],[-12,-23],[8,-29]]){S('cylinder','#917048',x,.4,z,.55,.8,.6);S('cylinder','#d8bb86',x,.805,z,.5,.02,.55);S('torus','#a98b5c',x,.825,z,.31,.31,.06,Math.PI/2);}
for(let i=0;i<420;i++){let x=(F.random()-.5)*96,z=(F.random()-.5)*96;if(nearPath(x,z)||lake(x,z,1)|| (x>-29&&x<39&&z>-8&&z<25))continue;S('cone','#74a657',x,.14,z,.12,.38,.12,0,0,.2);}
for(const [cx,cz] of [[-29,11],[-9,8],[-30,20],[-8,-8],[18,-24],[34,-26]])for(let i=0;i<18;i++){let x=cx+(F.random()-.5)*3,z=cz+(F.random()-.5)*2;S('cylinder','#59904c',x,.19,z,.018,.37,.018);let col=i%3===0?'#efb89a':i%3===1?'#fff3c2':'#dfcfeb';for(let k=0;k<4;k++)S('leaf',col,x+Math.cos(k*1.57)*.09,.39,z+Math.sin(k*1.57)*.09,.09,.05,.09);S('sphere','#e3b43f',x,.42,z,.045);}
// Shallow blue lake with shoreline and modest animated ripples (no reflection pass).
S('sphere','#decda2',25,-.20,-38,14.2,.19,11.2);
const waterGeo=new T.CircleGeometry(1,64);waterGeo.rotateX(-Math.PI/2);const waterMat=new T.MeshStandardMaterial({color:'#69bfc4',roughness:.3,metalness:.1,transparent:true,opacity:.9});const water=new T.Mesh(waterGeo,waterMat);water.scale.set(13,1,10);water.position.set(25,.05,-38);scene.add(water);
const ripples=[];for(let i=0;i<12;i++){let r=.5+i*.25,x=20+F.random()*10,z=-43+F.random()*9;let g=new T.RingGeometry(r,r+.026,36);g.rotateX(-Math.PI/2);let m=new T.MeshBasicMaterial({color:'#caeeeb',transparent:true,opacity:.35,depthWrite:false});let o=new T.Mesh(g,m);o.position.set(x,.065,z);o.scale.z=.5;scene.add(o);ripples.push(o);}
// Wooden pier, safe collision exception into the lake.
for(let i=0;i<16;i++)S('box','#b99567',25,.25,-26-i*.48,2.8,.22,.43);
for(const x of [23.8,26.2])for(const z of [-26,-30,-33])S('cylinder',wood,x,.45,z,.09,1.35,.09);
for(let i=0;i<22;i++){let a=F.random()*6.28,x=25+Math.cos(a)*14.5,z=-38+Math.sin(a)*11.5;S('leaf','#98a697',x,.3,z,.5,.4,.6);for(let k=0;k<3;k++)S('cone','#789d58',x+.6+k*.12,.38,z,.08,.85,.09);}
F.flush(scene);
function blocked(x,z){if(Math.abs(x)>48||Math.abs(z)>48)return true;const onPier=x>23.4&&x<26.6&&z<-25&&z>-33.7;if(lake(x,z,.42)&&!onPier)return true;return blockers.some(b=>b.type==='box'?x>b.x1-.35&&x<b.x2+.35&&z>b.z1-.35&&z<b.z2+.35:Math.hypot(x-b.x,z-b.z)<b.r+.3);}
function groundHeight(x,z){return x>23.4&&x<26.6&&z<-25&&z>-33.7?.37:0;}
function zone(x,z){if(z<-26&&x>10)return 'しずかな湖';if(z<-10)return 'こもれびの森';if(x>6)return '森の学校農園';return '森の学校';}
return{blocked,groundHeight,zone,blockers,paths,plots,lake:waterCenter,ripples,water,update(t){ripples.forEach((o,i)=>{o.scale.x=1+Math.sin(t*.65+i)*.18;o.material.opacity=.18+Math.sin(t*.8+i)*.1;});}};
};
})();
