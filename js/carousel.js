/* Carrossel de fotos com efeito 3D, autoplay e setas */
(function(){
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
/* ---------- Carrossel ---------- */
document.querySelectorAll(".car").forEach(c=>{
 const t=c.querySelector(".track"),imgs=[...t.children];
 const go=d=>{
  if(d>0&&t.scrollLeft+t.clientWidth>=t.scrollWidth-6)t.scrollTo({left:0,behavior:"smooth"});
  else if(d<0&&t.scrollLeft<6)t.scrollTo({left:t.scrollWidth,behavior:"smooth"});
  else t.scrollBy({left:d*(imgs[0].offsetWidth+18),behavior:"smooth"});
 };
 c.querySelector(".p").onclick=()=>go(-1);
 c.querySelector(".n").onclick=()=>go(1);
 const tilt=()=>{const r=t.getBoundingClientRect(),m=r.left+r.width/2;
  imgs.forEach(i=>{const b=i.getBoundingClientRect(),d=(b.left+b.width/2-m)/r.width;
   i.style.transform=`rotateY(${-d*32}deg) scale(${1-Math.min(Math.abs(d),1)*.14})`})};
 t.addEventListener("scroll",tilt,{passive:true});addEventListener("resize",tilt);addEventListener("load",tilt);tilt();
 let vis=false,hov=false;
 new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(c);
 c.onmouseenter=()=>hov=true;c.onmouseleave=()=>hov=false;
 if(!reduce)setInterval(()=>{if(vis&&!hov)go(1)},3300);
});
})();
