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
  container_redes_b.append(rede)
//   bottom_bar.append(container_redes_b)
}


barra_bottom.append(container_redes_b);

bottom_bar.append(barra_bottom);