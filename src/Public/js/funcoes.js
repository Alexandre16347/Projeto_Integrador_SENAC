// Declarações de Variáveis Globais
let logos_redes = [
  "media/icon-facebook.png",
  "media/instagram.png",
  "media/twitter.png",
  "media/linkedin.svg",
  "media/youtube.png",
];
let href_redes = [
  "https://www.facebook.com/SenacBrasil",
  "https://www.instagram.com/senacbrasil/",
  "https://twitter.com/SenacBrasil",
  "https://www.linkedin.com/company/2655383",
  "https://www.youtube.com/user/SenacNacional",
];
let tam_social = logos_redes.length;

// Declarações de Funções

// login.js
function togglePassword() {
  var senhaInput = document.getElementById("senha");
  var eyeIcon = document.getElementById("eyeIcon");

  senhaInput.type = senhaInput.type === "password" ? "text" : "password";
  eyeIcon.src =
    senhaInput.type === "password" ? "media/closed-eyes.png" : "media/eye.png";
}

async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Verifica se os campos de e-mail e senha estão preenchidos
  if (!email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Expressão regular para validar o formato do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verifica se o e-mail tem um formato válido
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.authenticated) {
        console.log("Login bem-sucedido:", data);

        // Armazenar o token como um cookie
        definirCookie("token", data.session); // Armazena o token por 1 hora

        // Redirecionar para a página principal
        window.location.href = "/";
      } else {
        console.log(response.message);
        alert("Credenciais inválidas");
      }
    } else {
      alert("Erro no login: " + response.statusText);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
    alert("Erro na solicitação. Por favor, tente novamente mais tarde.");
  }
}

function definirCookie(nome, valor) {
  const dataDeExpiracao = new Date();
  dataDeExpiracao.setTime(dataDeExpiracao.getTime() + 1 * 60 * 60 * 1000); // 1 hora

  const cookieString = `${nome}=${valor}; expires=${dataDeExpiracao.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

// Função para aguardar X segundos
function esperarSegundos(segundos) {
  return new Promise((resolve) => {
    setTimeout(resolve, segundos * 1000); // Multiplica por 1000 para converter segundos em milissegundos
  });
}

function toggleConfirmarSenha() {
  var confirmarSenhaInput = document.getElementById("confirmarSenha");
  var eyeIconConfirmarSenha = document.getElementById("eyeIconConfirmarSenha");

  confirmarSenhaInput.type =
    confirmarSenhaInput.type === "password" ? "text" : "password";
  eyeIconConfirmarSenha.src =
    confirmarSenhaInput.type === "password"
      ? "media/closed-eyes.png"
      : "media/eye.png";
}

async function enviarFormulario() {
  // var senha = document.getElementById('senha').value;
  // var confirmarSenha = document.getElementById('confirmarSenha').value;

  // if (senha.length < 8) {
  //   alert('A senha deve ter pelo menos 8 caracteres!');
  //   return;
  // }

  // if (senha !== confirmarSenha) {
  //   alert('As senhas não coincidem!');
  //   return;
  // }

  const formulario = document.getElementById("cadastroForm");
  const formData = new FormData(formulario);

  // console.log(formData);

  try {
    const response = await fetch("/user", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Cadastro realizado com sucesso!");

      window.location.href = "Login"; // Redirecionar para a página principal
    } else {
      console.error("Erro no cadastro:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
  }
}

// Função para obter dados do usuário
async function obterDadosDoUsuario() {
  try {
    const response = await fetch("/buscaUserId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Adicione cabeçalhos adicionais, se necessário
      },
    });

    if (response.ok) {
      // Se a resposta estiver OK, obtenha os dados do usuário
      const dadosUsuario = await response.json();
      console.log("Dados do usuário:", dadosUsuario);

      // Faça algo com os dados do usuário, por exemplo, atualize a interface do usuário
      document.getElementById("Nome").textContent = dadosUsuario.Nome;
      document.getElementById("email").textContent = dadosUsuario.email;
      // Adicione outras manipulações conforme necessário
    } else {
      console.error("Erro ao obter dados do usuário:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
  }
}

async function obterUsuario() {
  // Extrai o ID da receita da query da URL
  const urlParams = new URLSearchParams(window.location.search);
  const idDoUser = urlParams.get("id");

  try {
    const response = await fetch(`/buscaUserId?id=${idDoUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Adicione cabeçalhos adicionais, se necessário
      },
    });

    if (response.ok) {
      // Se a resposta estiver OK, obtenha os dados do usuário
      const dadosUsuario = await response.json();
      // console.log('Dados do usuário:', dadosUsuario);

      // Faça algo com os dados do usuário, por exemplo, atualize a interface do usuário
      document.getElementsByClassName(
        "img-avatar"
      )[0].src = `${dadosUsuario.imagem}`;
      document.getElementsByClassName(
        "Nome"
      )[0].textContent = `${dadosUsuario.Nome}`;

      // Verifica se o usuário está autenticado
      const token = document.cookie.split("=")[1];

      if (token && token === dadosUsuario.idTemp) {
        // <button id="add">
        //   <a href="cadastrarReceita" id="txt-box">Adicionar Receitas</a>
        // </button>
        // addreceita
        let botaoAdd = document.createElement("button");
        botaoAdd.setAttribute("id", "txt-box");
        botaoAdd.setAttribute("type", "button");
        botaoAdd.textContent = "Adicionar Receita";
        // Adicionar um ouvinte de evento ao botão
        botaoAdd.addEventListener("click", function () {
          // Redirecionar para a página "adicionarReceita"
          window.location.href = "/cadastrarReceita";
        });

        // console.log("Esse é o meu perfil")

        let botaoDel = document.createElement("button");
        botaoDel.setAttribute("class", "btt");
        botaoDel.setAttribute("type", "button");
        botaoDel.textContent = "Deletar Conta";

        // Adicionar evento de clique ao botão "Deletar Conta"
        botaoDel.addEventListener("click", async function () {
          // Confirmar se o usuário realmente deseja deletar a conta
          const confirmacao = confirm(
            "Tem certeza de que deseja deletar sua conta? Esta ação não pode ser desfeita."
          );

          if (confirmacao) {
            try {
              // Fazer a solicitação para deletar o usuário
              const response = await fetch("/deletarUser", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  // Adicione o token de autenticação, se necessário
                  id: `${dadosUsuario.id}`,
                },
              });

              if (response.ok) {
                // Limpar o token do cookie
                document.cookie =
                  "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                // Redirecionar para a rota desejada
                window.location.href = "/";

                console.log("Usuário deletado com sucesso.");
              } else {
                console.error("Erro ao deletar usuário:", response.statusText);
              }
            } catch (error) {
              console.error("Erro na solicitação:", error);
            }
          }
        });

        document.getElementById("deletar").append(botaoDel);
        document.getElementById("addreceita").append(botaoAdd);

        // Adicionar evento de clique ao botão "Deletar Conta"
        // document.getElementById('btnDeletarConta').addEventListener('click', async function () {

        // });
      }

      // Adicione outras manipulações conforme necessário
    } else {
      window.location.href = "NotFound";

      console.error("Erro ao obter dados do usuário:", response.statusText);
    }
  } catch (error) {
    // location.window("/")
    console.error("Erro na solicitação:", error);
  }
}

async function obterReceita() {
  // Extrai o ID da receita da query da URL
  const urlParams = new URLSearchParams(window.location.search);
  const idDaReceita = urlParams.get("id");

  try {
    // Faz uma solicitação GET para a rota no backend
    const response = await fetch(`/receita?id=${idDaReceita}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Adicione cabeçalhos adicionais, se necessário
      },
    });

    if (response.ok) {
      // Se a resposta estiver OK, obtenha os dados da receita
      const dadosReceita = await response.json();
      return dadosReceita;
    } else {
      console.error("Erro ao obter dados da Receita:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
  }
}

async function mostrarReceita() {
  const dadosReceita = await obterReceita();

  // console.log(dadosReceita);

  // Faça algo com os dados da receita, por exemplo, atualize a interface do usuário

  document.getElementsByClassName("titulo-receita")[0].textContent =
    dadosReceita.Titulo;
  document.getElementById("img").src = `${dadosReceita.imagem}`;
  document.getElementById(
    "porcoes"
  ).textContent = `Serve ${dadosReceita.porcoes} \n porção(ões)`;
  document.getElementsByClassName("lp")[0].textContent = dadosReceita.descricao;
  document.getElementsByClassName("chef")[0].textContent =
    dadosReceita.nomeDoChef;

  document.getElementsByClassName(
    "chef"
  )[0].href = `/Chef?id=${dadosReceita.user}`;

  let lista_ingredientes = document.getElementById("ingredientes");

  for (let i = 0; i < dadosReceita.ingredientes.length; i++) {
    const ig = dadosReceita.ingredientes[i];

    let ingrediente = document.createElement(`li`);
    ingrediente.setAttribute("class", "ingrediente");
    ingrediente.textContent = `- ${ig}`;

    lista_ingredientes.append(ingrediente);
  }

  document.getElementById("tempo").textContent = `${dadosReceita.tempo ? dadosReceita.tempo : 0
    } min`;

  let lista_modo = document.getElementById("modo");

  for (let i = 0; i < dadosReceita.modoDePreparo.length; i++) {
    const mdf = dadosReceita.modoDePreparo[i];

    let modo = document.createElement(`li`);
    modo.setAttribute("class", "modoDeFazer");
    modo.textContent = `${i + 1} - ${mdf}`;

    lista_modo.append(modo);
  }
  // document.getElementById("modo").textContent = `* ${dadosReceita.modoDePreparo}`;

  // Adicione outras manipulações conforme necessário

  try {
    const token = document.cookie.split("=")[1];

    if (token) {
      // const dadosUsuario = buscaUser()
      buscaUser().then((data) => {
        if (data.usuario.id == dadosReceita.user) {
          let atualizar = document.createElement("button");
          atualizar.setAttribute("class", "btt");
          atualizar.setAttribute("type", "button");
          atualizar.textContent = "Editar Receita";

          atualizar.addEventListener("click", function () {
            window.location.href = `/EditarReceita?id=${dadosReceita.id}`;
          });

          document.getElementById("atualizar").append(atualizar);

          //fim do bt editar rc
          // console.log("Esse é o meu perfil")

          let botaoDel = document.createElement("button");
          botaoDel.setAttribute("class", "btt");
          botaoDel.setAttribute("type", "button");
          botaoDel.textContent = "Deletar Receita";

          // Adicionar evento de clique ao botão "Deletar Conta"
          botaoDel.addEventListener("click", async function () {
            // Confirmar se o usuário realmente deseja deletar a conta
            const confirmacao = confirm(
              "Tem certeza de que deseja deletar sua receita? Esta ação não pode ser desfeita."
            );

            if (confirmacao) {
              try {
                // Fazer a solicitação para deletar o usuário
                const response = await fetch("/deletarReceita", {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    // Adicione o token de autenticação, se necessário
                    id: `${dadosReceita.id}`,
                  },
                });

                if (response.ok) {
                  // Redirecionar para a rota desejada
                  window.location.href = "/";

                  console.log("Usuário deletado com sucesso.");
                } else {
                  console.error(
                    "Erro ao deletar usuário:",
                    response.statusText
                  );
                }
              } catch (error) {
                console.error("Erro na solicitação:", error);
              }
            }
          });

          document.getElementById("deletarReceita").append(botaoDel);

          // Adicionar evento de clique ao botão "Deletar Conta"
          // document.getElementById('btnDeletarConta').addEventListener('click', async function () {

          // });
        }
      });
    }
  } catch { }
}

async function editarReceita() {
  let dadosReceita = await obterReceita();

  // console.log(dadosReceita);

  document.getElementById("titulo").value = dadosReceita.Titulo;
  document.getElementById("tempo").value = dadosReceita.tempo;
  document.getElementById("porcoes").value = dadosReceita.porcoes;
  document.getElementById("descricao").value = dadosReceita.descricao;
  const textarea = document.getElementById("ingredientes");
  textarea.value = ""; // Limpa o conteúdo atual do textarea

  dadosReceita.ingredientes.forEach((ingrediente) => {
    textarea.value += ingrediente + "\n"; // Adiciona cada ingrediente seguido de uma quebra de linha
  });

  const textarea2 = document.getElementById("modoDePreparo");
  textarea2.value = ""; // Limpa o conteúdo atual do textarea

  dadosReceita.modoDePreparo.forEach((modoDePreparo) => {
    textarea2.value += modoDePreparo + "\n"; // Adiciona cada ingrediente seguido de uma quebra de linha
  });

  console.log(dadosReceita)

  if (dadosReceita.categorias != null)
    categoriasMarcadas(dadosReceita.categorias);
  else
    categorias()

}

async function obterListaDeCardsReceitaUsuario() {
  // Verifica se o usuário está autenticado
  const token = document.cookie.split("=")[1];

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const response = await fetch("/buscarReceitaUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: id,
      // Adicione cabeçalhos adicionais, se necessário
    },
  });

  if (response.ok) {
    // Se a resposta estiver OK, obtenha os dados do usuário
    const dadosReceitas = await response.json();

    // Area Cards

    let scrollcards = document.getElementById("scrollcard-recente");
    let area_cardss = document.createDocumentFragment();

    const tam = dadosReceitas.length;

    for (let i = 1; i < 5; i++) {
      if (tam >= 5 || tam - i >= 0) {
        const cards = dadosReceitas[tam - i];

        let card = document.createElement(`div`);
        card.setAttribute("class", "card");

        let div_img = document.createElement("div");
        div_img.setAttribute("class", "div-img");

        let img_card = document.createElement(`img`);
        img_card.setAttribute("src", `${cards.imagem}`);
        img_card.setAttribute("class", "img-card");

        div_img.append(img_card);

        card.append(div_img);

        // let div_chef = document.createElement('div');
        // div_chef.setAttribute('class', 'chef-avatar');

        // let img_avatar = document.createElement(`img`);
        // const foto = !cards.fotoDoChef
        //   ? 'media/shumel.jpg'
        //   : `Uploads/${cards.fotoDoChef}`;
        // img_avatar.setAttribute('src', foto);
        // img_avatar.setAttribute('class', 'img-avatar');

        // div_chef.append(img_avatar);

        // card.append(div_chef);

        let txt_card = document.createElement(`button`);
        txt_card.append(`${cards.Titulo}`);
        txt_card.setAttribute("class", "btn-card");
        txt_card.addEventListener("click", function () {
          window.location.href = `VerReceita?id=${cards.idReceita}`;
        });

        card.append(txt_card);

        // let txt_chef = document.createElement(`a`);
        // txt_chef.append(`Por ${cards.nomeDoChef}`);
        // txt_chef.setAttribute('href', `Chef?id=${cards.idReceita}`);
        // txt_chef.setAttribute('class', 'txt-chef');

        // card.append(txt_chef);

        area_cardss.append(card);
      }
    }
    // shmebulock

    scrollcards.append(area_cardss);

    let scrollcard = document.getElementById("scrollcard");
    let area_cards = document.createDocumentFragment();

    // let cards = document.createElement(`div`);
    // cards.setAttribute("class", "scrollcard");

    for (let i = 0; i < dadosReceitas.length; i++) {
      const cards = dadosReceitas[i];

      // console.log(cards)

      let card = document.createElement(`div`);
      card.setAttribute("class", "card");

      let div_img = document.createElement("div");
      div_img.setAttribute("class", "div-img");

      let img_card = document.createElement(`img`);
      img_card.setAttribute("src", `${cards.imagem}`);
      img_card.setAttribute("class", "img-card");

      div_img.append(img_card);

      card.append(div_img);

      let div_chef = document.createElement("div");
      div_chef.setAttribute("class", "chef-avatar");

      let img_avatar = document.createElement(`img`);
      const foto = `${cards.fotoDoChef}`;
      img_avatar.setAttribute("src", foto);
      img_avatar.setAttribute("class", "img-avatar");

      div_chef.append(img_avatar);

      card.append(div_chef);

      let txt_card = document.createElement(`button`);
      txt_card.append(`${cards.Titulo}`);
      txt_card.setAttribute("class", "btn-card");
      txt_card.addEventListener("click", function () {
        window.location.href = `VerReceita?id=${cards.idReceita}`;
      });

      card.append(txt_card);

      // let txt_chef = document.createElement(`a`);
      // txt_chef.append(`Por ${cards.nomeDoChef}`);
      // txt_chef.setAttribute("href", "Chefes.html");
      // txt_chef.setAttribute("class", "txt-chef");

      // card.append(txt_chef);

      area_cards.append(card);
    }

    scrollcard.append(area_cards);

    // for (let i = 0; i < dadosReceitas.length; i++) {
    //     const receita = dadosReceitas[i];
    //     // Faça algo com os dados do usuário, por exemplo, atualize a interface do usuário
    //     document.getElementById('imagem').textContent = receita.imagem;
    //     document.getElementById('Titulo').textContent = receita.Titulo;
    //     document.getElementById('nomeDoChef').textContent = receita.nomeDoChef;
    //     // Adicione outras manipulações conforme necessário
    // }
  } else {
    console.error("Erro ao obter dados das Receitas:", response.statusText);
  }
}

// Função para obter dados do usuário
async function obterCards() {
  try {
    const response = await fetch("/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Adicione cabeçalhos adicionais, se necessário
      },
    });

    if (response.ok) {
      // Se a resposta estiver OK, obtenha os dados do usuário
      const dadosReceitas = await response.json();

      // Area Cards

      let scrollcard = document.getElementById("scrollcard");
      let area_cards = document.createDocumentFragment();

      // let cards = document.createElement(`div`);
      // cards.setAttribute("class", "scrollcard");

      for (let i = 0; i < dadosReceitas.length; i++) {
        const cards = dadosReceitas[i];

        let card = document.createElement(`div`);
        card.setAttribute("class", "card");

        let div_img = document.createElement("div");
        div_img.setAttribute("class", "div-img");

        let img_card = document.createElement(`img`);
        img_card.setAttribute("src", `${cards.imagem}`);
        img_card.setAttribute("class", "img-card");

        div_img.append(img_card);

        card.append(div_img);

        let div_chef = document.createElement("div");
        div_chef.setAttribute("class", "chef-avatar");

        let img_avatar = document.createElement(`img`);
        const foto = !cards.fotoDoChef
          ? "media/user-image.jpg"
          : `${cards.fotoDoChef}`;
        img_avatar.setAttribute("src", foto);
        img_avatar.setAttribute("class", "img-avatar");

        div_chef.append(img_avatar);

        card.append(div_chef);

        let txt_card = document.createElement(`button`);
        txt_card.append(`${cards.Titulo}`);
        txt_card.setAttribute("class", "btn-card");
        txt_card.addEventListener("click", function () {
          window.location.href = `/VerReceita?id=${cards.idReceita}`;
        });

        card.append(txt_card);

        let txt_chef = document.createElement(`a`);
        txt_chef.append(`Por ${cards.nomeDoChef}`);
        // txt_card.addEventListener('click', function () {
        //   window.location.href = `/Chef?id=${cards.idUsuario}`;
        // });
        txt_chef.setAttribute("href", `/Chef?id=${cards.idUsuario}`);
        txt_chef.setAttribute("class", "txt-chef");

        card.append(txt_chef);

        area_cards.append(card);
      }
      scrollcard.append(area_cards);
      // shmebulock
    } else {
      console.error("Erro ao obter dados das Receitas:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
  }
}

async function verificarAutenticacaoOffline() {
  // Verifica se o usuário está autenticado
  const token = document.cookie.split("=")[1];

  if (token) {
    const response = await fetch("/verificar-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const dados = await response.json();

    // Altera o texto do botão de "Login" para "Perfil"
    document.getElementById("botao-login").textContent = "Perfil";
    // Atualiza o link do botão para a página do perfil
    document.getElementById("botao-login").href = `Chef?id=${dados.idUser}`;
    addLogout("token");
  }
}

async function verificarAutenticacao() {
  // Verifica se o usuário está autenticado
  const token = document.cookie.split("=")[1];

  if (!token) {
    // Se não houver token, redireciona para a página de login
    window.location.href = "Login";
    return;
  }

  try {
    const response = await fetch("/verificar-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      // Se o token for válido, o usuário está autenticado
      // console.log('Usuário autenticado');
      const dados = await response.json();
      // console.log(document.getElementById('botao-login'))

      // Altera o texto do botão de "Login" para "Perfil"
      document.getElementById("botao-login").textContent = "Perfil";
      // Atualiza o link do botão para a página do perfil
      document.getElementById("botao-login").href = `Chef?id=${dados.idUser}`;

      addLogout("token");
    } else {
      // Se o token não for válido, redireciona para a página de login
      window.location.href = "Login";
    }
  } catch (error) {
    console.error("Erro na verificação de autenticação:", error);
    // Trate o erro conforme necessário
  }
}

function addLogout(nomeDoCookie) {
  // console.log('Criei');

  let barra_menu = document.getElementById("top-bar");

  let a_perfil = document.createElement(`a`);
  a_perfil.setAttribute("class", "btn-logout");
  a_perfil.setAttribute("addClickEvent", "Chef");

  // Adiciona um evento de clique para chamar a função apagarCookie com o nome do cookie
  a_perfil.addEventListener("click", function () {
    apagarCookie(nomeDoCookie);
  });

  let img_user = document.createElement(`img`);
  img_user.setAttribute("class", "img-logout");
  img_user.setAttribute("src", "media/logout.png");

  a_perfil.appendChild(img_user);
  barra_menu.append(a_perfil);
}

function apagarCookie(nome) {
  document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // Recarrega a página atual
  location.reload();
}

async function buscaUser() {
  // Verifica se o usuário está autenticado
  const token = document.cookie.split("=")[1];

  if (!token) {
    // Se não houver token, redireciona para a página de login
    window.location.href = "Login";
    return {};
  }

  try {
    const response = await fetch("/buscaUserToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const { usuario } = await response.json();

    if (response.ok) {
      // Se o token for válido, o usuário está autenticado
      // console.log('Usuário Identificado');
      return { usuario };
    } else {
      // Se o token não for válido, redireciona para a página de login
      window.location.href = "Login";
      return;
    }
  } catch (error) {
    console.error("Erro na verificação de autenticação:", error);
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
  var formulario = document.getElementById("receitaForm");
  var formData = new FormData(formulario);

  // Processar o campo 'ingredientes' como um array
  const ingredientesTextArea = formData.get("ingredientes");
  let ingredientesArray = ingredientesTextArea
    .split("\n")
    .map((ingrediente) => ingrediente.trim());

  ingredientesArray = ingredientesArray
    .filter((ingrediente) => ingrediente.trim() !== "")
    .map((ingrediente) => ingrediente.trim());

  formData.set("ingredientes", ingredientesArray[0]);
  console.log(ingredientesArray);

  for (let i = 1; i < ingredientesArray.length; i++) {
    const ingrediente = ingredientesArray[i];
    formData.append("ingredientes", ingrediente);
  }

  // Processar o campo 'modoDePreparo' como um array
  const modoDePreparoTextArea = formData.get("modoDePreparo");
  let modoDePreparoArray = modoDePreparoTextArea
    .split("\n")
    .map((modoDePreparo) => modoDePreparo.trim());

  modoDePreparoArray = modoDePreparoArray
    .filter((modoDePreparo) => modoDePreparo.trim() !== "")
    .map((modoDePreparo) => modoDePreparo.trim());

  formData.set("modoDePreparo", modoDePreparoArray[0]);
  console.log(modoDePreparoArray);

  for (let i = 1; i < modoDePreparoArray.length; i++) {
    const modoDePreparo = modoDePreparoArray[i];
    formData.append("modoDePreparo", modoDePreparo);
  }

  const { usuario } = await buscaUser();

  // // Depuração: Exibir formData no console
  // console.log("FormData completo:", formData);

  // Depuração: Iterar sobre os pares chave/valor
  // console.log("Pares chave/valor:");
  // for (let pair of formData.entries()) {
  //   console.log(pair[0] + ': ' + pair[1]);
  // }

  // // Depuração: Acessar valor de uma chave específica
  // console.log("Valor da chave 'nomeDaChave':", formData.get('nomeDaChave'));

  try {
    const response = await fetch(`/receita`, {
      method: "POST",
      body: formData,
      headers: {
        user: usuario.id,
      },
    });

    if (response.ok) {
      console.log("Receita cadastrada com sucesso!");
      // Redirecionar ou realizar ações necessárias após o cadastro
    } else {
      console.error("Erro no cadastro da receita:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
  }
}

async function enviarFormularioEditarReceita() {
  // Extrai o ID da receita da query da URL
  const urlParams = new URLSearchParams(window.location.search);
  const idDaReceita = urlParams.get("id");

  var formulario = document.getElementById("receitaForm");
  var formData = new FormData(formulario);

  // Processar o campo 'ingredientes' como um array
  const ingredientesTextArea = formData.get("ingredientes");
  let ingredientesArray = ingredientesTextArea
    .split("\n")
    .map((ingrediente) => ingrediente.trim());

  ingredientesArray = ingredientesArray
    .filter((ingrediente) => ingrediente.trim() !== "")
    .map((ingrediente) => ingrediente.trim());

  formData.set("ingredientes", ingredientesArray[0]);
  console.log(ingredientesArray);

  for (let i = 1; i < ingredientesArray.length; i++) {
    const ingrediente = ingredientesArray[i];
    formData.append("ingredientes", ingrediente);
  }

  // Processar o campo 'modoDePreparo' como um array
  const modoDePreparoTextArea = formData.get("modoDePreparo");
  let modoDePreparoArray = modoDePreparoTextArea
    .split("\n")
    .map((modoDePreparo) => modoDePreparo.trim());

  modoDePreparoArray = modoDePreparoArray
    .filter((modoDePreparo) => modoDePreparo.trim() !== "")
    .map((modoDePreparo) => modoDePreparo.trim());

  formData.set("modoDePreparo", modoDePreparoArray[0]);
  console.log(modoDePreparoArray);

  for (let i = 1; i < modoDePreparoArray.length; i++) {
    const modoDePreparo = modoDePreparoArray[i];
    formData.append("modoDePreparo", modoDePreparo);
  }

  const { usuario } = await buscaUser();

  try {
    const response = await fetch(`/receita?id=${idDaReceita}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      console.log("Receita editada com sucesso!");
      // Redirecionar ou realizar ações necessárias após o cadastro
      // Redirecionar para a página principal
      alert(response.statusText);
      window.location.href = "/";
    } else {
      console.error("Erro na atualização da receita:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
  }
}

function adicionarItem() {
  const inputElement = document.getElementById("ingredientes");
  const listaElement = document.getElementById("listaIngredientes");

  // Divide os itens inseridos pelo usuário usando vírgula como separador
  const novosItens = inputElement.value.split(",");

  // Adiciona cada item à lista
  novosItens.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item.trim(); // Remove espaços em branco extras
    listaElement.appendChild(listItem);
  });

  if (response.ok) {
    console.log("Receita cadastrada com sucesso!");
    // Redirecionar ou realizar ações necessárias após o cadastro
  } else {
    console.error("Erro no cadastro da receita:", response.statusText);
  }
}

function adicionarItem() {
  const inputElement = document.getElementById("ingredientes");
  const listaElement = document.getElementById("listaIngredientes");

  // Divide os itens inseridos pelo usuário usando vírgula como separador
  const novosItens = inputElement.value.split(",");

  // Adiciona cada item à lista
  novosItens.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item.trim(); // Remove espaços em branco extras
    listaElement.appendChild(listItem);
  });

  // Limpa o campo de texto
  inputElement.value = "";
}

function topBar() {
  // *******************************************************************************************************************************************
  // TOP BAR

  let top_bar = document.getElementById("top-bar");
  let barra_menu = document.createDocumentFragment();

  let a_logo = document.createElement(`a`);
  a_logo.setAttribute("class", "logo");
  a_logo.setAttribute("href", "https://www.senac.br/");

  let img_logo = document.createElement(`img`);
  img_logo.setAttribute("src", "media/1200px-Senac_logo.svg.png");
  img_logo.setAttribute("class", "logo");

  a_logo.append(img_logo);

  let container_menu = document.createElement(`ul`);
  container_menu.setAttribute("class", "container-menu");

  barra_menu.append(a_logo);

  const botoes_menu = ["O Senac", "Início", "Chefes", "Sobre", "Login"];
  const paginas_menu = [
    "https://www.senac.br/",
    "/",
    "Chefs",
    "Sobre",
    "Login",
  ];

  let tam = botoes_menu.length;

  for (let i = 0; i < tam; i++) {
    let pagina = `${paginas_menu[i]}`;

    let li = document.createElement(`li`);

    let botao = document.createElement(`a`);
    botao.append(botoes_menu[i]);
    if (i == 4) {
      botao.setAttribute("id", "botao-login");
    }
    botao.setAttribute("href", pagina);
    botao.setAttribute("class", "btn-menu");

    li.append(botao);

    // let button = document.createElement(`button`);
    // button.append(botoes_menu[i]);
    // button.setAttribute("class", "btn-menu");

    // botao.append(button);
    container_menu.append(li);
  }

  barra_menu.append(container_menu);

  let li_redes = document.createElement(`li`);
  let container_redes2 = document.createElement(`div`);
  container_redes2.setAttribute("class", "container-rede2");

  for (let i = 0; i < tam_social; i++) {
    let link_social = `${href_redes[i]}`;
    let img_rede = `${logos_redes[i]}`;
    let rede = document.createElement(`a`);
    rede.setAttribute("href", link_social);
    let btn_rede = document.createElement(`button`);
    btn_rede.setAttribute("class", "btn-social");
    let img_social = document.createElement(`img`);
    img_social.setAttribute("class", "img-social");
    img_social.setAttribute("src", img_rede);

    btn_rede.append(img_social);
    rede.append(btn_rede);
    container_redes2.append(rede);
  }

  li_redes.append(container_redes2);

  container_menu.append(li_redes);

  barra_menu.append(container_menu);

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

  buttonBar.append(line1);
  buttonBar.append(line2);
  buttonBar.append(line3);

  barra_menu.append(buttonBar);

  let container_redes = document.createElement(`div`);
  container_redes.setAttribute("class", "container-redes");

  for (let i = 0; i < tam_social; i++) {
    let link_social = `${href_redes[i]}`;
    let img_rede = `${logos_redes[i]}`;
    let rede = document.createElement(`a`);
    rede.setAttribute("href", link_social);
    let btn_rede = document.createElement(`button`);
    btn_rede.setAttribute("class", "btn-social");
    let img_social = document.createElement(`img`);
    img_social.setAttribute("class", "img-social");
    img_social.setAttribute("src", img_rede);

    btn_rede.append(img_social);
    rede.append(btn_rede);
    container_redes.append(rede);
  }

  barra_menu.append(container_redes);

  top_bar.append(barra_menu);
}

function botaoResponsivo() {
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
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5
            }s`);
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
    ".container-menu li"
  );

  mobileNavbar.init();
}

function bottomBar() {
  // *******************************************************************************************************************************************
  // BOTTOM BAR

  let bottom_bar = document.getElementById("bottom-bar");
  let barra_bottom = document.createDocumentFragment();

  let a_logo_b = document.createElement(`a`);
  a_logo_b.setAttribute("class", "logo");
  a_logo_b.setAttribute("href", "https://www.senac.br/");

  let img_logo_b = document.createElement(`img`);
  img_logo_b.setAttribute("src", "media/senac_logo_branco.png");
  img_logo_b.setAttribute("class", "logo");

  a_logo_b.append(img_logo_b);

  barra_bottom.append(a_logo_b);

  let txt_direitos = document.createElement(`label`);
  txt_direitos.append("© Todos os Direitos Reservados - 2017.");
  txt_direitos.setAttribute("class", "txt");

  barra_bottom.append(txt_direitos);

  let container_redes_b = document.createElement(`div`);
  container_redes_b.setAttribute("class", "container-redes");

  // let logos_redes = ["src/media/icon-facebook.png", "src/media/instagram.png", "src/media/twitter.png", "src/media/linkedin.svg", "src/media/youtube.png"];
  // let href_redes = ["https://www.facebook.com/SenacBrasil", "https://www.instagram.com/senacbrasil/", "https://twitter.com/SenacBrasil", "https://www.linkedin.com/company/2655383", "https://www.youtube.com/user/SenacNacional"]

  // let tam_social = logos_redes.length;

  for (let i = 0; i < tam_social; i++) {
    let link_social = `${href_redes[i]}`;
    let img_rede = `${logos_redes[i]}`;
    let rede = document.createElement(`a`);
    rede.setAttribute("href", link_social);
    let btn_rede = document.createElement(`button`);
    btn_rede.setAttribute("class", "btn-social");
    let img_social = document.createElement(`img`);
    img_social.setAttribute("class", "img-social");
    img_social.setAttribute("src", img_rede);

    btn_rede.append(img_social);
    rede.append(btn_rede);
    container_redes_b.append(rede);
    //   bottom_bar.append(container_redes_b)
  }

  barra_bottom.append(container_redes_b);

  bottom_bar.append(barra_bottom);
}

function areaSearch() {
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
  imgSearch.setAttribute("src", "media/search3.png");

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

  areaSearch.append(area);
}

async function obterCategorias() {
  try {
    const response = await fetch("/todasCategoria", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Adicione cabeçalhos adicionais, se necessário
      },
    });

    if (!response.ok) {
      throw new Error(
        "Não foi possível obter as categorias. Código de status: " +
        response.status
      );
    }

    const categorias = await response.json();
    return categorias;
  } catch (error) {
    console.error("Ocorreu um erro ao obter as categorias:", error);
    throw error; // Você pode optar por relançar o erro para que a função que chama obterCategorias também possa lidar com o erro, se necessário
  }
}

async function categoriasMarcadas(categoriasReceita) {
  const categorias = await obterCategorias();

  console.log(categoriasReceita);

  let checkboxs = document.getElementById("nomesCat");

  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i];
    // console.log(categoria)

    let divCategoria = document.createElement("div");
    divCategoria.setAttribute("class", "item");

    let checkCategoria = document.createElement("input");
    checkCategoria.setAttribute("type", "checkbox");
    checkCategoria.setAttribute("name", "categorias");
    checkCategoria.setAttribute("value", `${categoria._id}`);
    checkCategoria.setAttribute("class", "quadrado");

    for (let i = 0; i < categoriasReceita.length; i++) {
      const categoriaReceita = categoriasReceita[i]; // Correção aqui
      // Se estiver marcada, marque a caixa de seleção correspondente
      if (categoriaReceita === categoria._id) {
        // Usando `===` para comparação estrita
        checkCategoria.checked = true;
        categoriasReceita.splice(i, 1);
        console.log(categoriasReceita);
        break;
      }
    }

    let labelCategoria = document.createElement("label");
    labelCategoria.setAttribute("class", "texto");
    labelCategoria.textContent = categoria.nome;

    let br = document.createElement("br");

    divCategoria.append(checkCategoria);
    divCategoria.append(labelCategoria);
    divCategoria.append(br);

    checkboxs.append(divCategoria);
  }
}

async function categorias() {
  const categorias = await obterCategorias();
  // <div class="item">
  //     <input type="checkbox" name="categorias" value="Bolos"
  //         class="quadrado">
  //     <label class="texto" for="bolos"> Bolos</label><br>
  // </div>

  let checkboxs = document.getElementById("nomesCat");

  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i];
    // console.log(categoria)

    let divCategoria = document.createElement("div");
    divCategoria.setAttribute("class", "item");

    let checkCategoria = document.createElement("input");
    checkCategoria.setAttribute("type", "checkbox");
    checkCategoria.setAttribute("name", "categorias");
    checkCategoria.setAttribute("value", `${categoria._id}`);
    checkCategoria.setAttribute("class", "quadrado");

    let labelCategoria = document.createElement("label");
    labelCategoria.setAttribute("class", "texto");
    labelCategoria.textContent = categoria.nome;

    let br = document.createElement("br");

    divCategoria.append(checkCategoria);
    divCategoria.append(labelCategoria);
    divCategoria.append(br);

    checkboxs.append(divCategoria);
  }
}

async function areaCategorias() {
  const categorias = await obterCategorias();
  let cont_cat = document.getElementById("cont-categorias");
  let area_cat = document.createDocumentFragment();

  for (let i = 0; i < categorias.length; i++) {
    let cat = document.createElement(`a`);
    let btn_cat = document.createElement(`button`);
    btn_cat.append(categorias[i].nome);
    btn_cat.setAttribute("class", "btn-menu");

    // Adiciona evento de clique ao botão de categoria
    btn_cat.addEventListener("click", async function () {
      const response = await fetch("/ReceitaPorCategoria", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: categorias[i]._id
        }
      });

      if (response.ok) {
        const dadosReceitas = await response.json();
        let scrollcard = document.getElementById("scrollcard");
        let txtcat = document.getElementById('txtcat');

        if (dadosReceitas.length === 0) {
          txtcat.innerHTML = "";
          scrollcard.innerHTML = '';
          txtcat.textContent = categorias[i].nome;
          txtcat.style.textAlign = 'center';
          // Se não houver receitas disponíveis, exibir mensagem
          let pText = document.createElement('p');
          pText.classList = "paragraph";
          pText.textContent = "Não há receitas disponíveis para esta categoria.";
          scrollcard.appendChild(pText);
        } else {
          // Limpa o conteúdo anterior
          scrollcard.innerHTML = '';

          // Cria um elemento de texto para mostrar o nome da categoria
          // let txtcat = document.createElement('div.res');
          txtcat.innerHTML = "";
          txtcat.textContent = categorias[i].nome;
          txtcat.style.textAlign = 'center';
          // scrollcard.appendChild(txtcat);

          let area_cards = document.createDocumentFragment();

          for (let j = 0; j < dadosReceitas.length; j++) {
            const cardData = dadosReceitas[j];

            // Crie os elementos de receita como antes
            let card = document.createElement(`div`);
            card.setAttribute("class", "card");

            let div_img = document.createElement("div");
            div_img.setAttribute("class", "div-img");

            let img_card = document.createElement(`img`);
            img_card.setAttribute("src", `${cardData.imagem}`);
            img_card.setAttribute("class", "img-card");

            div_img.append(img_card);
            card.append(div_img);

            let div_chef = document.createElement("div");
            div_chef.setAttribute("class", "chef-avatar");

            let img_avatar = document.createElement(`img`);
            const foto = `${cardData.fotoDoChef}`;
            img_avatar.setAttribute("src", foto);
            img_avatar.setAttribute("class", "img-avatar");

            div_chef.append(img_avatar);
            card.append(div_chef);

            let txt_card = document.createElement(`button`);
            txt_card.append(`${cardData.Titulo}`);
            txt_card.setAttribute("class", "btn-card");
            txt_card.addEventListener("click", function () {
              window.location.href = `VerReceita?id=${cardData.idReceita}`;
            });
            card.append(txt_card);

            let txt_chef = document.createElement(`a`);
            txt_chef.append(`Por ${cardData.nomeDoChef}`);
            txt_chef.setAttribute("href", `/Chef?id=${cardData.idUsuario}`);
            txt_chef.setAttribute("class", "txt-chef");
            card.append(txt_chef);

            area_cards.append(card);
          }

          // Adicione as receitas à área de cartões
          scrollcard.append(area_cards);
        }
      } else {
        console.error("Erro ao obter dados das receitas:", response.statusText);
      }
    });

    cat.append(btn_cat);
    area_cat.append(cat);
  }

  cont_cat.append(area_cat);
}



function carregarImagem() {
  //Script input img Atualizar perfil
  const inputFile = document.querySelector("#picture__input");
  const pictureImage = document.querySelector(".picture__image");
  const pictureImageTxt = "Alterar imagem";
  pictureImage.innerHTML = pictureImageTxt;

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__img");

        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = pictureImageTxt;
    }
  });
}

// >>>>>>> 6cad6ad9c39c88ae9a48596df82055dc074d1776
