let logos_redes = ["../src/media/icon-facebook.png", "../src/media/instagram.png", "../src/media/twitter.png", "../src/media/linkedin.svg", "../src/media/youtube.png"];
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
img_logo.setAttribute("src", "../src/media/1200px-Senac_logo.svg.png");
img_logo.setAttribute("class", "logo");

a_logo.append(img_logo);

let container_menu = document.createElement(`ul`);
container_menu.setAttribute("class", "container-menu");

barra_menu.append(a_logo);

const botoes_menu = ["O Senac", "Início", "Chefes", "Sobre", "Login"];
const paginas_menu = [
  "https://www.senac.br/",
  "../index.html",
  "Chefes.html",
  "Sobre.html",
  "Login.html",
];

let tam = botoes_menu.length;

for (let i = 0; i < tam; i++) {
  let pagina = `${paginas_menu[i]}`;

  let li = document.createElement(`li`)

  let botao = document.createElement(`a`);
  botao.append(botoes_menu[i]);
  botao.setAttribute("href", pagina);
  botao.setAttribute("class", "btn-menu");

  li.append(botao)

  // let button = document.createElement(`button`);
  // button.append(botoes_menu[i]);
  // button.setAttribute("class", "btn-menu");

  // botao.append(button);
  container_menu.append(li);
}
barra_menu.append(container_menu);


let li_redes = document.createElement(`li`)
let container_redes2 = document.createElement(`div`);
container_redes2.setAttribute('class', 'container-rede2')

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
  container_redes2.append(rede)

}

li_redes.append(container_redes2)

container_menu.append(li_redes)

barra_menu.append(container_menu)


/* <div id="top-bar">
  <div class="mobile-menu">
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="line3"></div>
  </div>
</div> */

let buttonBar = document.createElement(`div`);
buttonBar.setAttribute("class", "mobile-menu");

let line1 = document.createElement(`div`);
line1.setAttribute("class", "line1");
let line2 = document.createElement(`div`);
line2.setAttribute("class", "line2");
let line3 = document.createElement(`div`);
line3.setAttribute("class", "line3");

buttonBar.append(line1)
buttonBar.append(line2)
buttonBar.append(line3)

barra_menu.append(buttonBar)






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
// Funcionalidade da responsividade

class MobileNavbar {
  constructor(mobileMenu, containerMenu, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.containerMenu = document.querySelector(containerMenu);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      // console.log("Hey 👀");
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`)
    });
  }

  handleClick() {
    this.containerMenu.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".container-menu",
  ".container-menu li",

)

mobileNavbar.init()





// *******************************************************************************************************************************************
// Area Categorias


let cont_cat = document.getElementById("cont-categorias")
let area_cat = document.createDocumentFragment()

// let container_cat = document.createElement(`div`)
// container_cat.setAttribute('class', 'cont-categorias')

for (let i = 0; i < tam_cat; i++) {

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
// BOTTOM BAR

let bottom_bar = document.getElementById("bottom-bar")
let barra_bottom = document.createDocumentFragment();

let a_logo_b = document.createElement(`a`);
a_logo_b.setAttribute("class", "logo");
a_logo_b.setAttribute("href", "https://www.senac.br/");

let img_logo_b = document.createElement(`img`);
img_logo_b.setAttribute("src", "../src/media/senac_logo_branco.png");
img_logo_b.setAttribute("class", "logo");

a_logo_b.append(img_logo_b);

barra_bottom.append(a_logo_b);

let txt_direitos = document.createElement(`label`)
txt_direitos.append("© Todos os Direitos Reservados - 2017.");
txt_direitos.setAttribute('class', 'txt')

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
