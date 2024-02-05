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
                // Armazene o uuid no localStorage para uso futuro
                localStorage.setItem('sessionUuid', data.session);
                // Redirecionar para a página principal
                window.location.href = '../index.html';
            } else {
                console.error('Credenciais inválidas');
            }
        } else {
            console.error('Erro no login:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
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
            console.log('Dados da Receita:', dadosReceita.Titulo);

            document.getElementsByClassName("titulo-receita")[0].textContent = dadosReceita.Titulo;
            // document.getElementById(img)

            // Adicione outras manipulações conforme necessário
        } else {
            console.error('Erro ao obter dados da Receita:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
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
                img_avatar.setAttribute("src", `../backend/src/Uploads/${cards.fotoDoChef}`);
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
                txt_chef.setAttribute("href", "Chefes.html");
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







