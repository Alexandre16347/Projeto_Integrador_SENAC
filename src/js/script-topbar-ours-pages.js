let container = document.getElementById("container")

let fragment = document.createDocumentFragment()

let barra_menu = document.createElement(`div`)
barra_menu.setAttribute('id', 'top-bar')

let a_logo = document.createElement(`a`)
a_logo.setAttribute('class', 'logo')
a_logo.setAttribute('href','https://www.senac.br/')

let img_logo = document.createElement(`img`)
img_logo.setAttribute('src','../src/media/1200px-Senac_logo.svg.png')
img_logo.setAttribute('class', 'logo')

a_logo.append(img_logo)

barra_menu.append(a_logo)


let botoes_menu = ["O Senac","Início", "Chefes", "Sobre", "Login"]
const paginas_menu = ["https://www.senac.br/", "../index.html", "Chefes.html", "Sobre.html", "Login.html"]

let tam = botoes_menu.length

for(let i=0; i<tam; i++) {

    let pagina = `${paginas_menu[i]}`

    let botao = document.createElement(`a`)
    botao.setAttribute('href', pagina)

    let button = document.createElement(`button`)
    button.append(botoes_menu[i])
    button.setAttribute('class', 'btn-menu')
    
    botao.append(button)
    barra_menu.append(botao)
};




fragment.append(barra_menu)





container.append(fragment)