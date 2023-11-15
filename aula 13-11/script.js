
// let texto = "Indice:";

// for (let i = 0; i < 50; i++) {
//   let card = `

// <div class="card">

// <div class="top">
// ${texto + i}

// </div>

// <div class="botton">

// </div>

// `
//   container.innerHTML += card;
//  nao usar inner/ falta de segurança}




let container = document.getElementById("container");

let fragment = document.createDocumentFragment()

let card = document.createElement('div')
card.setAttribute('class', 'card')

let div_img = document.createElement('div')
div_img.setAttribute('class', 'div-img')

card.append(div_img)

let div_chef = document.createElement('div')
div_chef.setAttribute('class', 'chef-avatar')

card.append(div_chef)





fragment.append(card)








container.append(fragment)