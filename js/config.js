/* Configuração global: endereço das imagens e link do WhatsApp */
const BASE="assets/img/portfolio/";
const WA="https://wa.me/5511933134955?text="+encodeURIComponent("Olá, vim pelo site da Cobracor e gostaria de solicitar um orçamento.");
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=WA;a.target="_blank";a.rel="noopener"});
