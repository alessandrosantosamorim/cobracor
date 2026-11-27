/* Configuração global: endereço das imagens e link do WhatsApp */
const BASE="assets/img/portfolio/";
const WA="https://wa.me/5511933134955?text="+encodeURIComponent("Olá, vim pelo site da Cobracor e gostaria de solicitar um orçamento.");
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=WA;a.target="_blank";a.rel="noopener"});

const burger=document.querySelector(".burger");
const nav=document.getElementById("main-nav");
if(burger&&nav){
 burger.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  burger.setAttribute("aria-expanded",String(open));
  burger.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
 });
 nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  nav.classList.remove("open");
  burger.setAttribute("aria-expanded","false");
  burger.setAttribute("aria-label","Abrir menu");
 }));
}

const portfolioToggle=document.getElementById("portfolio-toggle");
if(portfolioToggle){
 portfolioToggle.addEventListener("click",()=>{
  const show=document.getElementById("projects").classList.toggle("portfolio-all");
  portfolioToggle.textContent=show?"Mostrar menos obras":"Ver todas as obras";
  portfolioToggle.setAttribute("aria-expanded",String(show));
 });
}

const portfolioFilters=document.querySelectorAll(".filter-btn");
portfolioFilters.forEach(button=>{
 button.addEventListener("click",()=>{
  const filter=button.dataset.filter;
  portfolioFilters.forEach(item=>{
   const active=item===button;
   item.classList.toggle("active",active);
   item.setAttribute("aria-pressed",String(active));
  });
  const projects=document.getElementById("projects");
  projects.querySelectorAll(".proj").forEach(project=>{
   const visible=filter==="todos"||project.dataset.category===filter;
   project.classList.toggle("is-filtered-out",!visible);
  });
  if(filter==="todos"){
   projects.classList.remove("portfolio-all");
   portfolioToggle.textContent="Ver todas as obras";
   portfolioToggle.setAttribute("aria-expanded","false");
  }else{
   projects.classList.add("portfolio-all");
  }
 });
});

const budgetForm=document.getElementById("budget-form");
if(budgetForm){
 budgetForm.addEventListener("submit",event=>{
  event.preventDefault();
  const data=new FormData(budgetForm);
  const message=[
   "Olá, vim pelo site da Cobracor e gostaria de solicitar um orçamento.",
   "",
   `Nome: ${data.get("name")}`,
   `Telefone: ${data.get("phone")}`,
   `Projeto: ${data.get("service")}`,
   `Cidade: ${data.get("city")}`,
   `Descrição: ${data.get("message")}`
  ].join("\n");
  window.open("https://wa.me/5511933134955?text="+encodeURIComponent(message),"_blank","noopener");
 });
}
