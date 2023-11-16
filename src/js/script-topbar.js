let container = document.getElementById("container");

let fragment = document.createDocumentFragment();

let barra_menu = document.createElement(`div`);
barra_menu.setAttribute("id", "top-bar");

let container_menu = document.createElement(`div`);
container_menu.setAttribute("class", "container-menu");

let a_logo = document.createElement(`a`);
a_logo.setAttribute("class", "logo");
a_logo.setAttribute("href", "https://www.senac.br/");

let img_logo = document.createElement(`img`);
img_logo.setAttribute("src", "src/media/1200px-Senac_logo.svg.png");
img_logo.setAttribute("class", "logo");

a_logo.append(img_logo);

container_menu.append(a_logo);

barra_menu.append(container_menu);

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
  barra_menu.append(container_menu);
}

// {/* <a href="">
//     <button class="btn-social">
//         <img src="src/media/facebook.png" alt="" id="img-social">
//     </button>
// </a> */}

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
  barra_menu.append(container_redes)
}

fragment.append(barra_menu);

// <div id="areaSearch">
//     <div id="divSearch">
//     <img src="src/media/search3.png" alt="Buscar..."/>
//     <input type="text" id="txtSearch" placeholder="Buscar..."/>
//     <button id="btnSearch">Buscar</button>
//     </div>
// </div>

let areaSearch = document.createElement(`div`);
areaSearch.setAttribute("id", "areaSearch");

let divSearch = document.createElement(`div`);
divSearch.setAttribute("id", "divSearch");

let imgSearch = document.createElement(`img`);
imgSearch.setAttribute("alt", "Buscar...");
imgSearch.setAttribute("src", "src/media/search3.png");

let txtSearch = document.createElement(`input`);
txtSearch.setAttribute("id", "txtSearch");
txtSearch.setAttribute("type", "text");
txtSearch.setAttribute("placeholder", "Buscar...");

let btnSearch = document.createElement(`button`);
btnSearch.append("Buscar");
btnSearch.setAttribute("id", "btnSearch");

divSearch.append(imgSearch);
divSearch.append(txtSearch);
divSearch.append(btnSearch);

areaSearch.append(divSearch);

fragment.append(areaSearch);






const categorias = ["Salgados", "Doces", "Massas", "Bebidas", "Sobremesas", "Confeitaria", "Saladas", "Refeições", "Comidas Rápidas", "Sopas", "Farofas", "Drinks", "Sorvetes"]

let container_cat = document.createElement(`div`)
container_cat.setAttribute('class', 'cont-categorias')


let tam_cat = categorias.length

for(let i=0; i<tam_cat;i++){

  let cat = document.createElement(`a`)
  // cat.setAttribute('href', '')

  let btn_cat = document.createElement(`button`)
  btn_cat.append(categorias[i])
  btn_cat.setAttribute('class', 'btn-menu')

  cat.append(btn_cat)
  container_cat.append(cat)
}

fragment.append(container_cat)













let cards = document.createElement(`div`);
cards.setAttribute("class", "scrollcard");

for (let i = 0; i < 50; i++) {
  let card = document.createElement(`div`);
  card.setAttribute("class", "card");

  let div_img = document.createElement("div");
  div_img.setAttribute("class", "div-img");

  let img_card = document.createElement(`img`);
  img_card.setAttribute(
    "src",
    "src/media/bolo-de-cenoura-cobertura-chocolate.jpg"
  );
  img_card.setAttribute("class", "img-card");

  div_img.append(img_card);

  card.append(div_img);

  let div_chef = document.createElement("div");
  div_chef.setAttribute("class", "chef-avatar");

  let img_avatar = document.createElement(`img`);
  img_avatar.setAttribute("src", "src/media/shumel.jpg");
  img_avatar.setAttribute("class", "img-avatar");

  div_chef.append(img_avatar);

  card.append(div_chef);

  let txt_card = document.createElement(`label`);
  txt_card.append("Bolo de Cenoura com Cobertura de Chocolate");
  txt_card.setAttribute("class", "txt-card");
  

  card.append(txt_card);

  let txt_chef = document.createElement(`a`);
  txt_chef.append("Por Shmebulock");
  txt_chef.setAttribute("href", "pages/Chefes.html");
  txt_chef.setAttribute("class", "txt-chef");

  card.append(txt_chef);
  cards.append(card);
}
// shmebulock


fragment.append(cards);





















// {/* <a href="">
//     <button class="btn-social">
//         <img src="src/media/facebook.png" alt="" id="img-social">
//     </button>
// </a> */}

let bottom_bar = document.createElement(`div`)
bottom_bar.setAttribute('id', 'bottom-bar')

let a_logo_b = document.createElement(`a`);
a_logo_b.setAttribute("class", "logo");
a_logo_b.setAttribute("href", "https://www.senac.br/");

let img_logo_b = document.createElement(`img`);
img_logo_b.setAttribute("src", "src/media/senac_logo_branco.png");
img_logo_b.setAttribute("class", "logo");

a_logo_b.append(img_logo_b);

bottom_bar.append(a_logo_b);

let txt_direitos = document.createElement(`label`)
txt_direitos.append("© Todos os Direitos Reservados - 2017.");
// txt_direitos.setAttribute('class', 'txt')

bottom_bar.append(txt_direitos)

let container_redes_b = document.createElement(`div`)
container_redes_b.setAttribute('class', 'container-redes')

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
  container_redes_b.append(rede)
  bottom_bar.append(container_redes_b)
}


fragment.append(bottom_bar);








container.append(fragment);
