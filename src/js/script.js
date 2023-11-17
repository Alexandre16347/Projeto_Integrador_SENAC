let logos_redes = ["src/media/icon-facebook.png", "src/media/instagram.png", "src/media/twitter.png", "src/media/linkedin.svg", "src/media/youtube.png"];
let href_redes = ["https://www.facebook.com/SenacBrasil", "https://www.instagram.com/senacbrasil/", "https://twitter.com/SenacBrasil", "https://www.linkedin.com/company/2655383", "https://www.youtube.com/user/SenacNacional"]

let tam_social = logos_redes.length;


const categorias = ["Salgados", "Doces", "Massas", "Bebidas", "Sobremesas", "Confeitaria", "Saladas", "Refeições", "Comidas Rápidas", "Sopas", "Farofas", "Drinks", "Sorvetes"]

let tam_cat = categorias.length




// *******************************************************************************************************************************************
// TOP BAR


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












// *******************************************************************************************************************************************
// Area Search


let areaSearch = document.getElementById("areaSearch");

let area = document.createDocumentFragment();



// <div id="areaSearch">
//     <div id="divSearch">
//     <img src="src/media/search3.png" alt="Buscar..."/>
//     <input type="text" id="txtSearch" placeholder="Buscar..."/>
//     <button id="btnSearch">Buscar</button>
//     </div>
// </div>

// let areaSearch = document.createElement(`div`);
// areaSearch.setAttribute("id", "areaSearch");

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

area.append(divSearch);

areaSearch.append(area)



// *******************************************************************************************************************************************
// Area Categorias


let cont_cat = document.getElementById("cont-categorias")
let area_cat = document.createDocumentFragment()

// let container_cat = document.createElement(`div`)
// container_cat.setAttribute('class', 'cont-categorias')

for(let i=0; i<tam_cat;i++){

  let cat = document.createElement(`a`)
  // cat.setAttribute('href', '')

  let btn_cat = document.createElement(`button`)
  btn_cat.append(categorias[i])
  btn_cat.setAttribute('class', 'btn-menu')

  cat.append(btn_cat)
  area_cat.append(cat)
}

cont_cat.append(area_cat)



// *******************************************************************************************************************************************
// Area Cards

let scrollcard = document.getElementById("scrollcard")
let area_cards = document.createDocumentFragment()

// let cards = document.createElement(`div`);
// cards.setAttribute("class", "scrollcard");

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

  let txt_card = document.createElement(`button`);
  txt_card.append("Bolo de Cenoura com Cobertura de Chocolate");
  txt_card.setAttribute("class", "btn-card");
  

  card.append(txt_card);

  let txt_chef = document.createElement(`a`);
  txt_chef.append("Por Shmebulock");
  txt_chef.setAttribute("href", "pages/Chefes.html");
  txt_chef.setAttribute("class", "txt-chef");

  card.append(txt_chef);

  let lb_avaliacao = document.createElement(`label`)
  lb_avaliacao.setAttribute('class', 'lb-avaliacao')
  lb_avaliacao.textContent = "❤ 1.511"

  card.append(lb_avaliacao)
  
  area_cards.append(card);
}
// shmebulock

scrollcard.append(area_cards)

















// *******************************************************************************************************************************************
// BOTTOM BAR

let bottom_bar = document.getElementById("bottom-bar")
let barra_bottom = document.createDocumentFragment();

let a_logo_b = document.createElement(`a`);
a_logo_b.setAttribute("class", "logo");
a_logo_b.setAttribute("href", "https://www.senac.br/");

let img_logo_b = document.createElement(`img`);
img_logo_b.setAttribute("src", "src/media/senac_logo_branco.png");
img_logo_b.setAttribute("class", "logo");

a_logo_b.append(img_logo_b);

barra_bottom.append(a_logo_b);

let txt_direitos = document.createElement(`label`)
txt_direitos.append("© Todos os Direitos Reservados - 2017.");
// txt_direitos.setAttribute('class', 'txt')

barra_bottom.append(txt_direitos)

let container_redes_b = document.createElement(`div`)
container_redes_b.setAttribute('class', 'container-redes')

// let logos_redes = ["src/media/icon-facebook.png", "src/media/instagram.png", "src/media/twitter.png", "src/media/linkedin.svg", "src/media/youtube.png"];
// let href_redes = ["https://www.facebook.com/SenacBrasil", "https://www.instagram.com/senacbrasil/", "https://twitter.com/SenacBrasil", "https://www.linkedin.com/company/2655383", "https://www.youtube.com/user/SenacNacional"]

// let tam_social = logos_redes.length;

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
//   bottom_bar.append(container_redes_b)
}


barra_bottom.append(container_redes_b);

bottom_bar.append(barra_bottom);
