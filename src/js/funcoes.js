// login.js
function togglePassword() {
    var senhaInput = document.getElementById('senha');
    var eyeIcon = document.getElementById('eyeIcon');

    senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
    eyeIcon.src = senhaInput.type === 'password' ? '../src/media/closed-eyes.png' : '../src/media/eye.png';
}

async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Verifica se os campos de e-mail e senha estão preenchidos
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifica se o e-mail tem um formato válido
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (response.ok) {
            const data = await response.json();

            if (data.authenticated) {
                console.log('Login bem-sucedido:', data);

                // Armazenar o token como um cookie
                definirCookie('token', data.session); // Armazena o token por 1 hora

                // Redirecionar para a página principal
                window.location.href = '../index.html';
            } else {
                console.log(response.message)
                alert('Credenciais inválidas');
            }
        } else {

            alert('Erro no login: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
        alert('Erro na solicitação. Por favor, tente novamente mais tarde.');
    }
}

function definirCookie(nome, valor) {
    const dataDeExpiracao = new Date();
    dataDeExpiracao.setTime(dataDeExpiracao.getTime() + (1 * 60 * 60 * 1000)); // 1 hora

    const cookieString = `${nome}=${valor}; expires=${dataDeExpiracao.toUTCString()}; path=/`;
    document.cookie = cookieString;
}


// Função para aguardar X segundos
function esperarSegundos(segundos) {
    return new Promise(resolve => {
        setTimeout(resolve, segundos * 1000); // Multiplica por 1000 para converter segundos em milissegundos
    });
}

function toggleConfirmarSenha() {
    var confirmarSenhaInput = document.getElementById('confirmarSenha');
    var eyeIconConfirmarSenha = document.getElementById('eyeIconConfirmarSenha');

    confirmarSenhaInput.type = confirmarSenhaInput.type === 'password' ? 'text' : 'password';
    eyeIconConfirmarSenha.src = confirmarSenhaInput.type === 'password' ? '../src/media/closed-eyes.png' : '../src/media/eye.png';
}

async function enviarFormulario() {
    var senha = document.getElementById('senha').value;
    var confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres!');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    var formulario = document.getElementById('cadastroForm');
    var formData = new FormData(formulario);

    try {
        const response = await fetch('http://localhost:3333/user', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Cadastro realizado com sucesso!');

            // Armazenar o token como um cookie
            definirCookie('token', data.session); // Armazena o token por 1 hora

            window.location.href = 'index.html'; // Redirecionar para a página principal
        } else {
            console.error('Erro no cadastro:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}

// Função para obter dados do usuário
async function obterDadosDoUsuario() {
    try {
        const response = await fetch('http://localhost:3333/buscaUserId?id=65b04f41f6ba41959921ee8e', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Adicione cabeçalhos adicionais, se necessário
            },
        });

        if (response.ok) {
            // Se a resposta estiver OK, obtenha os dados do usuário
            const dadosUsuario = await response.json();
            console.log('Dados do usuário:', dadosUsuario);

            // Faça algo com os dados do usuário, por exemplo, atualize a interface do usuário
            document.getElementById('Nome').textContent = dadosUsuario.Nome;
            document.getElementById('email').textContent = dadosUsuario.email;
            // Adicione outras manipulações conforme necessário
        } else {
            console.error('Erro ao obter dados do usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}

async function obterReceita() {
    // Extrai o ID da receita da query da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idDaReceita = urlParams.get('id');

    try {
        // Faz uma solicitação GET para a rota no backend
        const response = await fetch(`http://localhost:3333/receita?id=${idDaReceita}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Adicione cabeçalhos adicionais, se necessário
            },
        });

        if (response.ok) {
            // Se a resposta estiver OK, obtenha os dados da receita
            const dadosReceita = await response.json();

            // Faça algo com os dados da receita, por exemplo, atualize a interface do usuário

            document.getElementsByClassName("titulo-receita")[0].textContent = dadosReceita.Titulo;
            document.getElementById("img").src = `../backend/src/Uploads/${dadosReceita.imagem}`;
            document.getElementById("porcoes").textContent = `Serve ${dadosReceita.porcoes} \n porção(ões)`;
            document.getElementsByClassName("lp")[0].textContent = dadosReceita.descricao
            document.getElementsByClassName("chef")[0].textContent = dadosReceita.nomeDoChef;

            let lista_ingredientes = document.getElementById("ingredientes");

            for (let i = 0; i < dadosReceita.ingredientes.length; i++) {
                const ig = dadosReceita.ingredientes[i];

                let ingrediente = document.createElement(`li`);
                ingrediente.setAttribute("class", "ingrediente");
                ingrediente.textContent = `* ${ig}`;

                lista_ingredientes.append(ingrediente)
            }

            document.getElementById("tempo").textContent = `${dadosReceita.tempo ? dadosReceita.tempo : 0} min`


            let lista_modo = document.getElementById("modo");

            for (let i = 0; i < dadosReceita.modoDePreparo.length; i++) {
                const mdf = dadosReceita.modoDePreparo[i];

                let modo = document.createElement(`li`);
                modo.setAttribute("class", "modoDeFazer");
                modo.textContent = `* ${mdf}`;

                lista_modo.append(modo)
            }
            // document.getElementById("modo").textContent = `* ${dadosReceita.modoDePreparo}`;


            // Adicione outras manipulações conforme necessário
        } else {
            console.error('Erro ao obter dados da Receita:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}

async function obterListaDeCardsReceitaUsuario() {
    // Verifica se o usuário está autenticado
    const token = document.cookie.split('=')[1];

    const { usuario } = await buscaUser();

    const response = await fetch('http://localhost:3333/buscarReceitaUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            user: usuario.id
            // Adicione cabeçalhos adicionais, se necessário
        },
    });

    if (response.ok) {
        // Se a resposta estiver OK, obtenha os dados do usuário
        const dadosReceitas = await response.json();

        // Area Cards

        let scrollcards = document.getElementById("scrollcard-recente")
        let area_cardss = document.createDocumentFragment()

        const tam = dadosReceitas.length;

        for (let i = 1; i < 5; i++) {
            if (tam >= 5 || (tam - i) >= 0) {

                const cards = dadosReceitas[tam - i];

                let card = document.createElement(`div`);
                card.setAttribute("class", "card");

                let div_img = document.createElement("div");
                div_img.setAttribute("class", "div-img");

                let img_card = document.createElement(`img`);
                img_card.setAttribute(
                    "src",
                    `../backend/src/Uploads/${cards.imagem}`
                );
                img_card.setAttribute("class", "img-card");

                div_img.append(img_card);

                card.append(div_img);

                let div_chef = document.createElement("div");
                div_chef.setAttribute("class", "chef-avatar");

                let img_avatar = document.createElement(`img`);
                const foto = (!cards.fotoDoChef) ? "../src/media/shumel.jpg" : `../backend/src/Uploads/${cards.fotoDoChef}`
                img_avatar.setAttribute("src", foto);
                img_avatar.setAttribute("class", "img-avatar");

                div_chef.append(img_avatar);

                card.append(div_chef);

                let txt_card = document.createElement(`button`);
                txt_card.append(`${cards.Titulo}`);
                txt_card.setAttribute("class", "btn-card");
                txt_card.addEventListener("click", function () {
                    window.location.href = `/pages/Ver-Receita.html?id=${cards.idReceita}`;
                });


                card.append(txt_card);

                let txt_chef = document.createElement(`a`);
                txt_chef.append(`Por ${cards.nomeDoChef}`);
                txt_chef.setAttribute("href", "/pages/Chefes.html");
                txt_chef.setAttribute("class", "txt-chef");

                card.append(txt_chef);

                area_cardss.append(card);
            }
        }
        // shmebulock

        scrollcards.append(area_cardss)


        let scrollcard = document.getElementById("scrollcard")
        let area_cards = document.createDocumentFragment()

        // let cards = document.createElement(`div`);
        // cards.setAttribute("class", "scrollcard");

        for (let i = 0; i < dadosReceitas.length; i++) {
            const cards = dadosReceitas[i];

            let card = document.createElement(`div`);
            card.setAttribute("class", "card");

            let div_img = document.createElement("div");
            div_img.setAttribute("class", "div-img");

            let img_card = document.createElement(`img`);
            img_card.setAttribute(
                "src",
                `../backend/src/Uploads/${cards.imagem}`
            );
            img_card.setAttribute("class", "img-card");

            div_img.append(img_card);

            card.append(div_img);

            let div_chef = document.createElement("div");
            div_chef.setAttribute("class", "chef-avatar");

            let img_avatar = document.createElement(`img`);
            const foto = (!cards.fotoDoChef) ? "../src/media/shumel.jpg" : `../backend/src/Uploads/${cards.fotoDoChef}`
            img_avatar.setAttribute("src", foto);
            img_avatar.setAttribute("class", "img-avatar");

            div_chef.append(img_avatar);

            card.append(div_chef);

            let txt_card = document.createElement(`button`);
            txt_card.append(`${cards.Titulo}`);
            txt_card.setAttribute("class", "btn-card");
            txt_card.addEventListener("click", function () {
                window.location.href = `/pages/Ver-Receita.html?id=${cards.idReceita}`;
            });


            card.append(txt_card);

            let txt_chef = document.createElement(`a`);
            txt_chef.append(`Por ${cards.nomeDoChef}`);
            txt_chef.setAttribute("href", "/pages/Chefes.html");
            txt_chef.setAttribute("class", "txt-chef");

            card.append(txt_chef);

            area_cards.append(card);
        }

        scrollcard.append(area_cards)


        // for (let i = 0; i < dadosReceitas.length; i++) {
        //     const receita = dadosReceitas[i];
        //     // Faça algo com os dados do usuário, por exemplo, atualize a interface do usuário
        //     document.getElementById('imagem').textContent = receita.imagem;
        //     document.getElementById('Titulo').textContent = receita.Titulo;
        //     document.getElementById('nomeDoChef').textContent = receita.nomeDoChef;
        //     // Adicione outras manipulações conforme necessário
        // }
    } else {
        console.error('Erro ao obter dados das Receitas:', response.statusText);
    }
}

// Função para obter dados do usuário
async function obterCards() {
    try {
        const response = await fetch('http://localhost:3333/cards', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Adicione cabeçalhos adicionais, se necessário
            },
        });

        if (response.ok) {
            // Se a resposta estiver OK, obtenha os dados do usuário
            const dadosReceitas = await response.json();

            // Area Cards

            let scrollcard = document.getElementById("scrollcard")
            let area_cards = document.createDocumentFragment()

            // let cards = document.createElement(`div`);
            // cards.setAttribute("class", "scrollcard");

            for (let i = 0; i < dadosReceitas.length; i++) {
                const cards = dadosReceitas[i];

                let card = document.createElement(`div`);
                card.setAttribute("class", "card");

                let div_img = document.createElement("div");
                div_img.setAttribute("class", "div-img");

                let img_card = document.createElement(`img`);
                img_card.setAttribute(
                    "src",
                    `../backend/src/Uploads/${cards.imagem}`
                );
                img_card.setAttribute("class", "img-card");

                div_img.append(img_card);

                card.append(div_img);

                let div_chef = document.createElement("div");
                div_chef.setAttribute("class", "chef-avatar");

                let img_avatar = document.createElement(`img`);
                const foto = (!cards.fotoDoChef) ? "../src/media/shumel.jpg" : `../backend/src/Uploads/${cards.fotoDoChef}`
                img_avatar.setAttribute("src", foto);
                img_avatar.setAttribute("class", "img-avatar");

                div_chef.append(img_avatar);

                card.append(div_chef);

                let txt_card = document.createElement(`button`);
                txt_card.append(`${cards.Titulo}`);
                txt_card.setAttribute("class", "btn-card");
                txt_card.addEventListener("click", function () {
                    window.location.href = `/pages/Ver-Receita.html?id=${cards.idReceita}`;
                });


                card.append(txt_card);

                let txt_chef = document.createElement(`a`);
                txt_chef.append(`Por ${cards.nomeDoChef}`);
                txt_chef.setAttribute("href", "/pages/Chefes.html");
                txt_chef.setAttribute("class", "txt-chef");

                card.append(txt_chef);

                area_cards.append(card);
            }
            // shmebulock

            scrollcard.append(area_cards)

            // for (let i = 0; i < dadosReceitas.length; i++) {
            //     const receita = dadosReceitas[i];
            //     // Faça algo com os dados do usuário, por exemplo, atualize a interface do usuário
            //     document.getElementById('imagem').textContent = receita.imagem;
            //     document.getElementById('Titulo').textContent = receita.Titulo;
            //     document.getElementById('nomeDoChef').textContent = receita.nomeDoChef;
            //     // Adicione outras manipulações conforme necessário
            // }
        } else {
            console.error('Erro ao obter dados das Receitas:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}


async function verificarAutenticacao() {
    // Verifica se o usuário está autenticado
    const token = document.cookie.split('=')[1];

    if (!token) {
        // Se não houver token, redireciona para a página de login
        window.location.href = '/pages/Login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3333/verificar-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        if (response.ok) {
            // Se o token for válido, o usuário está autenticado
            console.log('Usuário autenticado');
            // console.log(document.getElementById('botao-login'))
            // Altera o texto do botão de "Login" para "Perfil"
            document.getElementById('botao-login').textContent = 'Perfil';
            // Atualiza o link do botão para a página do perfil
            document.getElementById('botao-login').href = '/pages/Perfil.html';
        } else {
            // Se o token não for válido, redireciona para a página de login
            window.location.href = '/pages/Login.html';
        }
    } catch (error) {
        console.error('Erro na verificação de autenticação:', error);
        // Trate o erro conforme necessário
    }
}


async function buscaUser() {
    // Verifica se o usuário está autenticado
    const token = document.cookie.split('=')[1];

    if (!token) {
        // Se não houver token, redireciona para a página de login
        window.location.href = '/pages/Login.html';
        return {};
    }


    try {
        const response = await fetch('http://localhost:3333/buscaUserToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        const { usuario } = await response.json();

        if (response.ok) {
            // Se o token for válido, o usuário está autenticado
            console.log('Usuário Identificado');
            return { usuario };
        } else {
            // Se o token não for válido, redireciona para a página de login
            window.location.href = '/pages/Login.html';
            return;
        }
    } catch (error) {

        console.error('Erro na verificação de autenticação:', error);
        return {};
        // Trate o erro conforme necessário
    }
}


// var ingredientesString = formData.get('listaIngredientes');
//     console.log(ingredientesString)
//     formData.set('ingredientes', Array.from(ingredientesString.children).map(li => li.textContent));
//     <div class="input-group">
//                             <label for="ingredientes">Digite os ingredientes (separados por vírgula):</label>
//                             <input type="text" id="ingredientes" name="ingredientes">
//                             <button type="button" onclick="adicionarItem()">Adicionar</button>

//                             <ul id="listaIngredientes"></ul>
//                         </div>

async function enviarFormularioReceita() {
    var formulario = document.getElementById('receitaForm');
    var formData = new FormData(formulario);

    // Processar o campo 'ingredientes' como um array
    const ingredientesTextArea = formData.get('ingredientes');
    const ingredientesArray = ingredientesTextArea.split('\n').map(ingrediente => ingrediente.trim());
    formData.set('ingredientes', JSON.stringify(ingredientesArray));

    // Processar o campo 'ingredientes' como um array
    const categoriasTextArea = formData.get('categorias');
    const categoriasArray = categoriasTextArea.split('\n').map(categoria => categoria.trim());
    formData.set('categorias', JSON.stringify(categoriasArray));

    const { usuario } = await buscaUser()

    try {
        const response = await fetch('http://localhost:3333/receita', {
            method: 'POST',
            body: formData,
            headers: {
                "user": usuario.id
            }
        });

        if (response.ok) {
            console.log('Receita cadastrada com sucesso!');
            // Redirecionar ou realizar ações necessárias após o cadastro
        } else {
            console.error('Erro no cadastro da receita:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}


function adicionarItem() {
    const inputElement = document.getElementById('ingredientes');
    const listaElement = document.getElementById('listaIngredientes');

    // Divide os itens inseridos pelo usuário usando vírgula como separador
    const novosItens = inputElement.value.split(',');

    // Adiciona cada item à lista
    novosItens.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.trim(); // Remove espaços em branco extras
        listaElement.appendChild(listItem);
    });

    // Limpa o campo de texto
    inputElement.value = '';
}

function obterItens() {
    const listaElement = document.getElementById('listaIngredientes');
    const itens = Array.from(listaElement.children).map(li => li.textContent);
    console.log('Ingredientes:', itens);
    return itens;
}


