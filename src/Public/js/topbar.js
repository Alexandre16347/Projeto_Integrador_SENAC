let top_bar = document.getElementById("top-bar")
let barra_menu = document.createDocumentFragment();

let a_logo = document.createElement(`a`);
a_logo.setAttribute("class", "logo");
a_logo.setAttribute("href", "https://www.senac.br/");

let img_logo = document.createElement(`img`);
img_logo.setAttribute("src", "src/media/1200px-Senac_logo.svg.png");
img_logo.setAttribute("class", "logo");

a_logo.append(img_logo);

let container_menu = document.createElement(`div`);
container_menu.setAttribute("class", "container-menu");

barra_menu.append(a_logo);

const botoes_menu = ["O Senac", "Início", "Chefes", "Sobre", "Login"];
const paginas_menu = [
  "https://www.senac.br/",
  "index.html",
  "pages/Chefes.html",
  "pages/Sobre.html",
  "pages/Login.html",
];

let tam = botoes_menu.length;

for (let i = 0; i < tam; i++) {
  let pagina = `${paginas_menu[i]}`;

  let botao = document.createElement(`a`);
  botao.setAttribute("href", pagina);

  let button = document.createElement(`button`);
  button.append(botoes_menu[i]);
  button.setAttribute("class", "btn-menu");

  botao.append(button);
  container_menu.append(botao);
}
barra_menu.append(container_menu);

let container_redes = document.createElement(`div`);
container_redes.setAttribute('class', 'container-redes')

let logos_redes = ["src/media/icon-facebook.png", "src/media/instagram.png", "src/media/twitter.png", "src/media/linkedin.svg", "src/media/youtube.png"];
let href_redes = ["https://www.facebook.com/SenacBrasil", "https://www.instagram.com/senacbrasil/", "https://twitter.com/SenacBrasil", "https://www.linkedin.com/company/2655383", "https://www.youtube.com/user/SenacNacional"]

let tam_social = logos_redes.length;

for (let i = 0; i < tam_social; i++) {
  let link_social = `${href_redes[i]}`
  let img_rede = `${logos_redes[i]}`
  let rede = document.createElement(`a`);
  rede.setAttribute('href', link_social)
  let btn_rede = document.createElement(`button`);
  btn_rede.setAttribute("class", "btn-social");
  let img_social = document.createElement(`img`);
  img_social.setAttribute("class", "img-social");
  img_social.setAttribute('src', img_rede)

  btn_rede.append(img_social)
  rede.append(btn_rede)
  container_redes.append(rede)
  
}

barra_menu.append(container_redes)

top_bar.append(barra_menu)