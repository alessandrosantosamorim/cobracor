/* Efeitos de interface: tilt 3D nos cards e entrada ao rolar */
(function(){
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
/* ---------- Efeitos: tilt 3D nos cards e entrada ao rolar ---------- */
document.querySelectorAll(".card").forEach(c=>{
 c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateY(-4px)`});
 c.addEventListener("mouseleave",()=>c.style.transform="");
});
if(!reduce){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll(".card,.proj,.steps div,.why li,.about .wrap>div").forEach((el,i)=>{el.classList.add("rv");el.style.transitionDelay=(i%4)*90+"ms";io.observe(el)});
}
})();
