let container = document.getElementById("container")

let fragment = document.createDocumentFragment()

let barra_menu = document.createElement(`div`)
barra_menu.setAttribute('id', 'top-bar')

let a_logo = document.createElement(`a`)
a_logo.setAttribute('class', 'logo')
a_logo.setAttribute('href','https://www.senac.br/')

let img_logo = document.createElement(`img`)
img_logo.setAttribute('src','src/media/1200px-Senac_logo.svg.png')
img_logo.setAttribute('class', 'logo')

a_logo.append(img_logo)

barra_menu.append(a_logo)


const botoes_menu = ["O Senac","Início", "Chefes", "Sobre", "Login"]
const paginas_menu = ["https://www.senac.br/", "index.html", "pages/Chefes.html", "pages/Sobre.html", "pages/Login.html"]

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



// <div id="areaSearch">
//     <div id="divSearch">
    //     <img src="src/media/search3.png" alt="Buscar..."/>
    //     <input type="text" id="txtSearch" placeholder="Buscar..."/>
    //     <button id="btnSearch">Buscar</button>
//     </div>
// </div> 

let areaSearch = document.createElement(`div`)
areaSearch.setAttribute('id', 'areaSearch')

let divSearch = document.createElement(`div`)
divSearch.setAttribute('id', 'divSearch')

let imgSearch = document.createElement(`img`)
imgSearch.setAttribute('alt', 'Buscar...')
imgSearch.setAttribute('src', 'src/media/search3.png')

let txtSearch = document.createElement(`input`)
txtSearch.setAttribute('id', 'txtSearch')
txtSearch.setAttribute('type', 'text')
txtSearch.setAttribute('placeholder', 'Buscar...')

let btnSearch = document.createElement(`button`)
btnSearch.append("Buscar")
btnSearch.setAttribute('id', 'btnSearch')


divSearch.append(imgSearch)
divSearch.append(txtSearch)
divSearch.append(btnSearch)

areaSearch.append(divSearch)












fragment.append(barra_menu)

fragment.append(areaSearch)








container.append(fragment)