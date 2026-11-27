/* Cena 3D (Three.js): tela de construção em 6 etapas e fundo do site */
(function(){
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const GOLD=0xc9a24b,cl=v=>Math.min(1,Math.max(0,v));
const $=id=>document.getElementById(id);
if(sessionStorage.getItem("cobracor-intro")==="seen"){
 const intro=$("intro");
 if(intro)intro.remove();
 document.body.style.overflow="";
}

/* ---------- Prédio 3D construído em etapas ---------- */
if(!window.THREE){const intro=$("intro");if(intro)intro.remove();return}
function build(){
 const g=new THREE.Group();
 const mat=(c,o)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o==null?1:o});
 const add=o=>{g.add(o);return o};
 const grid=add(new THREE.GridHelper(16,16,GOLD,0x2a3a5c));grid.material.transparent=true;
 const found=add(new THREE.Mesh(new THREE.BoxGeometry(5,.3,5),mat(0x2a3a5c)));found.position.y=.15;
 const cols=[[-2,-2],[2,-2],[-2,2],[2,2],[0,-2],[0,2],[-2,0],[2,0]].map(([x,z])=>{
  const m=add(new THREE.Mesh(new THREE.BoxGeometry(.18,1,.18).translate(0,.5,0),mat(0x8fa3c8)));m.position.set(x,.3,z);return m});
 const edged=(w,h,d,col,o,y)=>{const geo=new THREE.BoxGeometry(w,h,d),m=new THREE.Mesh(geo,mat(col,o));
  m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:GOLD})));m.position.y=y;return add(m)};
 const floors=[0,1,2,3,4].map(i=>edged(4.4,.12,4.4,GOLD,.9,1.3+i));
 const walls=[0,1,2,3,4].map(i=>edged(4.3,.84,4.3,0x3d7bd9,.2,.8+i));
 const roof=edged(4.8,.25,4.8,0x2a3a5c,1,5.55);
 const crane=add(new THREE.Group());crane.position.set(3.4,0,3.4);
 const mast=new THREE.Mesh(new THREE.BoxGeometry(.2,8,.2),mat(GOLD));mast.position.y=4;crane.add(mast);
 const jib=new THREE.Group();jib.position.y=8;crane.add(jib);
 const arm=new THREE.Mesh(new THREE.BoxGeometry(6,.14,.14),mat(GOLD));arm.position.x=1.6;jib.add(arm);
 const cw=new THREE.Mesh(new THREE.BoxGeometry(.6,.4,.4),mat(0x8fa3c8));cw.position.x=-1.2;jib.add(cw);
 const hook=new THREE.Mesh(new THREE.BoxGeometry(.04,2,.04),mat(0xffffff));hook.position.set(3.9,-1,0);jib.add(hook);
 const load=new THREE.Mesh(new THREE.BoxGeometry(.5,.3,.5),mat(0xe07b39));load.position.set(3.9,-2.1,0);jib.add(load);
 function setP(p){
  const st=k=>cl(p*6-k);let t=st(0);
  grid.material.opacity=t;grid.scale.setScalar(.4+.6*t);grid.visible=t>0;
  t=st(1);found.visible=t>0;found.scale.set(t,1,t);
  t=st(2);cols.forEach((m,i)=>{const u=cl(t*1.5-i*.07);m.visible=u>0;m.scale.y=Math.max(.001,u*5)});
  t=st(3);floors.forEach((m,i)=>{const u=cl(t*5-i);m.visible=u>0;m.scale.set(u,1,u)});
  t=st(4);walls.forEach((m,i)=>{const u=cl(t*5-i);m.visible=u>0;m.scale.set(1,u,1)});
  t=st(5);roof.visible=t>0;roof.position.y=5.55+(1-t)*3;crane.visible=t>0;crane.scale.y=Math.max(.001,t);
 }
 return{g,jib,setP};
}
const mk=(c,a)=>{const r=new THREE.WebGLRenderer({canvas:c,antialias:true,alpha:a});r.setPixelRatio(Math.min(devicePixelRatio,2));return r};

/* Tela de construção (intro) */
const names=["Terreno e projeto","Fundação","Pilares estruturais","Lajes","Paredes e vidros","Cobertura e entrega"];
if($("intro")){
try{
 const r=mk($("introC")),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100),b=build();sc.add(b.g);
 const size=()=>{const m=innerWidth<700;r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;
  cam.position.set(m?12:8,6.5,m?16:10.5);cam.lookAt(0,3.2,0);cam.updateProjectionMatrix()};
 size();addEventListener("resize",size);
 document.body.style.overflow="hidden";
 const D=reduce?400:2400,t0=performance.now();let done=false,raf,wait=0;
 const close=()=>{if(done)return;done=true;sessionStorage.setItem("cobracor-intro","seen");$("intro").classList.add("out");document.body.style.overflow="";
  setTimeout(()=>{cancelAnimationFrame(raf);r.dispose();$("intro").remove()},1000)};
 $("iskip").onclick=close;
 (function loop(now){
  const p=cl((now-t0)/D),k=Math.min(5,Math.floor(p*6));
  b.setP(p);b.g.rotation.y=.5+p*3.2;b.jib.rotation.y=now/1500;
  $("istep").textContent="Etapa "+(k+1)+" de 6";$("iname").textContent=names[k];$("ibar").style.width=p*100+"%";
  r.render(sc,cam);
  if(p>=1&&!done){$("iname").textContent="Obra entregue. Bem-vindo!";if(!wait)wait=now+350;if(now>wait)close()}
  raf=requestAnimationFrame(loop);
 })(t0);
}catch(e){$("intro").remove();document.body.style.overflow=""}
 }

/* Fundo 3D: o prédio vai sendo construído conforme você rola a página */
try{
 const r=mk($("bg"),true),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100),b=build();sc.add(b.g);
 let mx=0,my=0,cur=0;
 const size=()=>{const m=innerWidth<900;r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;
  cam.position.set(0,6,m?20:16);cam.lookAt(0,3,0);cam.updateProjectionMatrix();
  b.g.position.set(m?0:4.8,m?-1:-2.2,0);$("bg").style.opacity=m?.35:.75};
 size();addEventListener("resize",size);
 addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
 (function loop(now){
  const s=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
  cur+=(s-cur)*.06;
  b.setP(reduce?1:.35+.65*cur);
  b.g.rotation.y=reduce?.6:now/9000+mx*.6;b.g.rotation.x=my*.12;b.jib.rotation.y=now/2200;
  r.render(sc,cam);requestAnimationFrame(loop);
 })(0);
}catch(e){}
})();
