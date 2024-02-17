// Declarações de Variáveis Globais
let logos_redes = [
  'media/icon-facebook.png',
  'media/instagram.png',
  'media/twitter.png',
  'media/linkedin.svg',
  'media/youtube.png',
];
let href_redes = [
  'https://www.facebook.com/SenacBrasil',
  'https://www.instagram.com/senacbrasil/',
  'https://twitter.com/SenacBrasil',
  'https://www.linkedin.com/company/2655383',
  'https://www.youtube.com/user/SenacNacional',
];
let tam_social = logos_redes.length;

// Declarações de Funções

// login.js
function togglePassword() {
  var senhaInput = document.getElementById('senha');
  var eyeIcon = document.getElementById('eyeIcon');

  senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
  eyeIcon.src =
    senhaInput.type === 'password' ? 'media/closed-eyes.png' : 'media/eye.png';
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
    const response = await fetch('/login', {
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
        window.location.href = '/';
      } else {
        console.log(response.message);
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
  var confirmarSenhaInput = document.getElementById('confirmarSenha');
  var eyeIconConfirmarSenha = document.getElementById('eyeIconConfirmarSenha');

  confirmarSenhaInput.type =
    confirmarSenhaInput.type === 'password' ? 'text' : 'password';
  eyeIconConfirmarSenha.src =
    confirmarSenhaInput.type === 'password'
      ? '../src/media/closed-eyes.png'
      : '../src/media/eye.png';
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

  const formulario = document.getElementById('cadastroForm');
  const formData = new FormData(formulario);

  console.log(formData);

  try {
    const response = await fetch('/user', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Cadastro realizado com sucesso!');

      window.location.href = 'Login'; // Redirecionar para a página principal
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
    const response = await fetch('/buscaUserId', {
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

async function obterUsuario() {
  // Extrai o ID da receita da query da URL
  const urlParams = new URLSearchParams(window.location.search);
  const idDoUser = urlParams.get('id');

  try {
    const response = await fetch(`/buscaUserId?id=${idDoUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Adicione cabeçalhos adicionais, se necessário
      },
    });

    if (response.ok) {
      // Se a resposta estiver OK, obtenha os dados do usuário
      const dadosUsuario = await response.json();
      // console.log('Dados do usuário:', dadosUsuario);

      // Faça algo com os dados do usuário, por exemplo, atualize a interface do usuário
      document.getElementsByClassName(
        'img-avatar',
      )[0].src = `${dadosUsuario.imagem}`;
      document.getElementsByClassName(
        'Nome',
      )[0].textContent = `${dadosUsuario.Nome}`;

      // Verifica se o usuário está autenticado
      const token = document.cookie.split('=')[1];

      if (token && token == dadosUsuario.idTemp) {
        // console.log("Esse é o meu perfil")

        let botaoDel = document.createElement('button');
        botaoDel.setAttribute('class', 'btt');
        botaoDel.setAttribute('type', 'button');
        botaoDel.textContent = 'Deletar Conta';

        // Adicionar evento de clique ao botão "Deletar Conta"
        botaoDel.addEventListener('click', async function () {
          try {
            // Fazer a solicitação para deletar o usuário
            const response = await fetch('/deletarUser', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                // Adicione o token de autenticação, se necessário
                'id': `${dadosUsuario.id}`
              },
            });

            if (response.ok) {
              // Limpar o token do cookie
              document.cookie =
                'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

              // Redirecionar para a rota desejada
              window.location.href = '/';

              console.log('Usuário deletado com sucesso.');
            } else {
              console.error('Erro ao deletar usuário:', response.statusText);
            }
          } catch (error) {
            console.error('Erro na solicitação:', error);
          }
        });

        document.getElementById('deletar').append(botaoDel);

        // <button class="btt" type="button" onclick=" deletarUsuario()">
        //     Deletar conta
        //   </button>
      }

      // Adicione outras manipulações conforme necessário
    } else {
      console.error('Erro ao obter dados do usuário:', response.statusText);
    }
  } catch (error) {
    // location.window("/")
    console.error('Erro na solicitação:', error);
  }
}

async function obterReceita() {
  // Extrai o ID da receita da query da URL
  const urlParams = new URLSearchParams(window.location.search);
  const idDaReceita = urlParams.get('id');

  try {
    // Faz uma solicitação GET para a rota no backend
    const response = await fetch(`/receita?id=${idDaReceita}`, {
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

      document.getElementsByClassName('titulo-receita')[0].textContent =
        dadosReceita.Titulo;
      document.getElementById('img').src = `${dadosReceita.imagem}`;
      document.getElementById(
        'porcoes',
      ).textContent = `Serve ${dadosReceita.porcoes} \n porção(ões)`;
      document.getElementsByClassName('lp')[0].textContent =
        dadosReceita.descricao;
      document.getElementsByClassName('chef')[0].textContent =
        dadosReceita.nomeDoChef;

      document.getElementsByClassName(
        'chef',
      )[0].href = `/Chef?id=${dadosReceita.user}`;

      let lista_ingredientes = document.getElementById('ingredientes');

      for (let i = 0; i < dadosReceita.ingredientes.length; i++) {
        const ig = dadosReceita.ingredientes[i];

        let ingrediente = document.createElement(`li`);
        ingrediente.setAttribute('class', 'ingrediente');
        ingrediente.textContent = `* ${ig}`;

        lista_ingredientes.append(ingrediente);
      }

      document.getElementById('tempo').textContent = `${
        dadosReceita.tempo ? dadosReceita.tempo : 0
      } min`;

      let lista_modo = document.getElementById('modo');

      for (let i = 0; i < dadosReceita.modoDePreparo.length; i++) {
        const mdf = dadosReceita.modoDePreparo[i];

        let modo = document.createElement(`li`);
        modo.setAttribute('class', 'modoDeFazer');
        modo.textContent = `* ${mdf}`;

        lista_modo.append(modo);
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
      user: usuario.id,
      // Adicione cabeçalhos adicionais, se necessário
    },
  });

  if (response.ok) {
    // Se a resposta estiver OK, obtenha os dados do usuário
    const dadosReceitas = await response.json();

    // Area Cards

    let scrollcards = document.getElementById('scrollcard-recente');
    let area_cardss = document.createDocumentFragment();

    const tam = dadosReceitas.length;

    for (let i = 1; i < 5; i++) {
      if (tam >= 5 || tam - i >= 0) {
        const cards = dadosReceitas[tam - i];

        let card = document.createElement(`div`);
        card.setAttribute('class', 'card');

        let div_img = document.createElement('div');
        div_img.setAttribute('class', 'div-img');

        let img_card = document.createElement(`img`);
        img_card.setAttribute('src', `Uploads/${cards.imagem}`);
        img_card.setAttribute('class', 'img-card');

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
        txt_card.setAttribute('class', 'btn-card');
        txt_card.addEventListener('click', function () {
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

    let scrollcard = document.getElementById('scrollcard');
    let area_cards = document.createDocumentFragment();

    // let cards = document.createElement(`div`);
    // cards.setAttribute("class", "scrollcard");

    for (let i = 0; i < dadosReceitas.length; i++) {
      const cards = dadosReceitas[i];

      let card = document.createElement(`div`);
      card.setAttribute('class', 'card');

      let div_img = document.createElement('div');
      div_img.setAttribute('class', 'div-img');

      let img_card = document.createElement(`img`);
      img_card.setAttribute('src', `Uploads/${cards.imagem}`);
      img_card.setAttribute('class', 'img-card');

      div_img.append(img_card);

      card.append(div_img);

      let div_chef = document.createElement('div');
      div_chef.setAttribute('class', 'chef-avatar');

      let img_avatar = document.createElement(`img`);
      const foto = !cards.fotoDoChef
        ? 'media/shumel.jpg'
        : `Uploads/${cards.fotoDoChef}`;
      img_avatar.setAttribute('src', foto);
      img_avatar.setAttribute('class', 'img-avatar');

      div_chef.append(img_avatar);

      card.append(div_chef);

      let txt_card = document.createElement(`button`);
      txt_card.append(`${cards.Titulo}`);
      txt_card.setAttribute('class', 'btn-card');
      txt_card.addEventListener('click', function () {
        window.location.href = `VerReceita?id=${cards.idReceita}`;
      });

      card.append(txt_card);

      let txt_chef = document.createElement(`a`);
      txt_chef.append(`Por ${cards.nomeDoChef}`);
      txt_chef.setAttribute('href', 'Chefes.html');
      txt_chef.setAttribute('class', 'txt-chef');

      card.append(txt_chef);

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
    console.error('Erro ao obter dados das Receitas:', response.statusText);
  }
}

// Função para obter dados do usuário
async function obterCards() {
  try {
    const response = await fetch('/cards', {
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

      let scrollcard = document.getElementById('scrollcard');
      let area_cards = document.createDocumentFragment();

      // let cards = document.createElement(`div`);
      // cards.setAttribute("class", "scrollcard");

      for (let i = 0; i < dadosReceitas.length; i++) {
        const cards = dadosReceitas[i];

        let card = document.createElement(`div`);
        card.setAttribute('class', 'card');

        let div_img = document.createElement('div');
        div_img.setAttribute('class', 'div-img');

        let img_card = document.createElement(`img`);
        img_card.setAttribute('src', `${cards.imagem}`);
        img_card.setAttribute('class', 'img-card');

        div_img.append(img_card);

        card.append(div_img);

        let div_chef = document.createElement('div');
        div_chef.setAttribute('class', 'chef-avatar');

        let img_avatar = document.createElement(`img`);
        const foto = !cards.fotoDoChef
          ? 'media/user-image.jpg'
          : `${cards.fotoDoChef}`;
        img_avatar.setAttribute('src', foto);
        img_avatar.setAttribute('class', 'img-avatar');

        div_chef.append(img_avatar);

        card.append(div_chef);

        let txt_card = document.createElement(`button`);
        txt_card.append(`${cards.Titulo}`);
        txt_card.setAttribute('class', 'btn-card');
        txt_card.addEventListener('click', function () {
          window.location.href = `/VerReceita?id=${cards.idReceita}`;
        });

        card.append(txt_card);

        let txt_chef = document.createElement(`a`);
        txt_chef.append(`Por ${cards.nomeDoChef}`);
        // txt_card.addEventListener('click', function () {
        //   window.location.href = `/Chef?id=${cards.idUsuario}`;
        // });
        txt_chef.setAttribute('href', `/Chef?id=${cards.idUsuario}`);
        txt_chef.setAttribute('class', 'txt-chef');

        card.append(txt_chef);

        area_cards.append(card);
      }
      scrollcard.append(area_cards);
      // shmebulock
    } else {
      console.error('Erro ao obter dados das Receitas:', response.statusText);
    }
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
}

async function verificarAutenticacaoOffline() {
  // Verifica se o usuário está autenticado
  const token = document.cookie.split('=')[1];

  if (token) {
    const response = await fetch('/verificar-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const dados = await response.json();

    // Altera o texto do botão de "Login" para "Perfil"
    document.getElementById('botao-login').textContent = 'Perfil';
    // Atualiza o link do botão para a página do perfil
    document.getElementById('botao-login').href = `Chef?id=${dados.idUser}`;
    addLogout('token');
    return;
  }
}

async function verificarAutenticacao() {
  // Verifica se o usuário está autenticado
  const token = document.cookie.split('=')[1];

  if (!token) {
    // Se não houver token, redireciona para a página de login
    window.location.href = 'Login';
    return;
  }

  try {
    const response = await fetch('/verificar-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.ok) {
      // Se o token for válido, o usuário está autenticado
      // console.log('Usuário autenticado');
      const dados = await response.json();
      // console.log(document.getElementById('botao-login'))

      // Altera o texto do botão de "Login" para "Perfil"
      document.getElementById('botao-login').textContent = 'Perfil';
      // Atualiza o link do botão para a página do perfil
      document.getElementById('botao-login').href = `Chef?id=${dados.idUser}`;

      addLogout('token');
    } else {
      // Se o token não for válido, redireciona para a página de login
      window.location.href = 'Login';
    }
  } catch (error) {
    console.error('Erro na verificação de autenticação:', error);
    // Trate o erro conforme necessário
  }
}

function addLogout(nomeDoCookie) {
  // console.log('Criei');

  let barra_menu = document.getElementById('top-bar');

  let a_perfil = document.createElement(`a`);
  a_perfil.setAttribute('class', 'btn-logout');
  a_perfil.setAttribute('addClickEvent', 'Chef');

  // Adiciona um evento de clique para chamar a função apagarCookie com o nome do cookie
  a_perfil.addEventListener('click', function () {
    apagarCookie(nomeDoCookie);
  });

  let img_user = document.createElement(`img`);
  img_user.setAttribute('class', 'img-logout');
  img_user.setAttribute('src', 'media/logout.png');

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
  const token = document.cookie.split('=')[1];

  if (!token) {
    // Se não houver token, redireciona para a página de login
    window.location.href = 'Login';
    return {};
  }

  try {
    const response = await fetch('/buscaUserToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      window.location.href = 'Login';
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
  const ingredientesArray = ingredientesTextArea
    .split('\n')
    .map((ingrediente) => ingrediente.trim());
  formData.set('ingredientes', JSON.stringify(ingredientesArray));

  // Processar o campo 'ingredientes' como um array
  const categoriasTextArea = formData.get('categorias');
  const categoriasArray = categoriasTextArea
    .split('\n')
    .map((categoria) => categoria.trim());
  formData.set('categorias', JSON.stringify(categoriasArray));

  const { usuario } = await buscaUser();

  try {
    const response = await fetch('http://localhost:3333/receita', {
      method: 'POST',
      body: formData,
      headers: {
        user: usuario.id,
      },
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
  novosItens.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item.trim(); // Remove espaços em branco extras
    listaElement.appendChild(listItem);
  });

  if (response.ok) {
    console.log('Receita cadastrada com sucesso!');
    // Redirecionar ou realizar ações necessárias após o cadastro
  } else {
    console.error('Erro no cadastro da receita:', response.statusText);
  }
}

function adicionarItem() {
  const inputElement = document.getElementById('ingredientes');
  const listaElement = document.getElementById('listaIngredientes');

  // Divide os itens inseridos pelo usuário usando vírgula como separador
  const novosItens = inputElement.value.split(',');

  // Adiciona cada item à lista
  novosItens.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item.trim(); // Remove espaços em branco extras
    listaElement.appendChild(listItem);
  });

  // Limpa o campo de texto
  inputElement.value = '';
}

function obterItens() {
  const listaElement = document.getElementById('listaIngredientes');
  const itens = Array.from(listaElement.children).map((li) => li.textContent);
  console.log('Ingredientes:', itens);
  return itens;
}

function topBar() {
  // *******************************************************************************************************************************************
  // TOP BAR

  let top_bar = document.getElementById('top-bar');
  let barra_menu = document.createDocumentFragment();

  let a_logo = document.createElement(`a`);
  a_logo.setAttribute('class', 'logo');
  a_logo.setAttribute('href', 'https://www.senac.br/');

  let img_logo = document.createElement(`img`);
  img_logo.setAttribute('src', 'media/1200px-Senac_logo.svg.png');
  img_logo.setAttribute('class', 'logo');

  a_logo.append(img_logo);

  let container_menu = document.createElement(`ul`);
  container_menu.setAttribute('class', 'container-menu');

  barra_menu.append(a_logo);

  const botoes_menu = ['O Senac', 'Início', 'Chefes', 'Sobre', 'Login'];
  const paginas_menu = [
    'https://www.senac.br/',
    '/',
    'Chefs',
    'Sobre',
    'Login',
  ];

  let tam = botoes_menu.length;

  for (let i = 0; i < tam; i++) {
    let pagina = `${paginas_menu[i]}`;

    let li = document.createElement(`li`);

    let botao = document.createElement(`a`);
    botao.append(botoes_menu[i]);
    if (i == 4) {
      botao.setAttribute('id', 'botao-login');
    }
    botao.setAttribute('href', pagina);
    botao.setAttribute('class', 'btn-menu');

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
  container_redes2.setAttribute('class', 'container-rede2');

  for (let i = 0; i < tam_social; i++) {
    let link_social = `${href_redes[i]}`;
    let img_rede = `${logos_redes[i]}`;
    let rede = document.createElement(`a`);
    rede.setAttribute('href', link_social);
    let btn_rede = document.createElement(`button`);
    btn_rede.setAttribute('class', 'btn-social');
    let img_social = document.createElement(`img`);
    img_social.setAttribute('class', 'img-social');
    img_social.setAttribute('src', img_rede);

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
  buttonBar.setAttribute('class', 'mobile-menu');

  let line1 = document.createElement(`div`);
  line1.setAttribute('class', 'line1');
  let line2 = document.createElement(`div`);
  line2.setAttribute('class', 'line2');
  let line3 = document.createElement(`div`);
  line3.setAttribute('class', 'line3');

  buttonBar.append(line1);
  buttonBar.append(line2);
  buttonBar.append(line3);

  barra_menu.append(buttonBar);

  let container_redes = document.createElement(`div`);
  container_redes.setAttribute('class', 'container-redes');

  for (let i = 0; i < tam_social; i++) {
    let link_social = `${href_redes[i]}`;
    let img_rede = `${logos_redes[i]}`;
    let rede = document.createElement(`a`);
    rede.setAttribute('href', link_social);
    let btn_rede = document.createElement(`button`);
    btn_rede.setAttribute('class', 'btn-social');
    let img_social = document.createElement(`img`);
    img_social.setAttribute('class', 'img-social');
    img_social.setAttribute('src', img_rede);

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
      this.activeClass = 'active';

      this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
      this.navLinks.forEach((link, index) => {
        // console.log("Hey 👀");
        link.style.animation
          ? (link.style.animation = '')
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.5
            }s`);
      });
    }

    handleClick() {
      this.containerMenu.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }

    addClickEvent() {
      this.mobileMenu.addEventListener('click', this.handleClick);
    }

    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }

  const mobileNavbar = new MobileNavbar(
    '.mobile-menu',
    '.container-menu',
    '.container-menu li',
  );

  mobileNavbar.init();
}

function bottomBar() {
  // *******************************************************************************************************************************************
  // BOTTOM BAR

  let bottom_bar = document.getElementById('bottom-bar');
  let barra_bottom = document.createDocumentFragment();

  let a_logo_b = document.createElement(`a`);
  a_logo_b.setAttribute('class', 'logo');
  a_logo_b.setAttribute('href', 'https://www.senac.br/');

  let img_logo_b = document.createElement(`img`);
  img_logo_b.setAttribute('src', 'media/senac_logo_branco.png');
  img_logo_b.setAttribute('class', 'logo');

  a_logo_b.append(img_logo_b);

  barra_bottom.append(a_logo_b);

  let txt_direitos = document.createElement(`label`);
  txt_direitos.append('© Todos os Direitos Reservados - 2017.');
  txt_direitos.setAttribute('class', 'txt');

  barra_bottom.append(txt_direitos);

  let container_redes_b = document.createElement(`div`);
  container_redes_b.setAttribute('class', 'container-redes');

  // let logos_redes = ["src/media/icon-facebook.png", "src/media/instagram.png", "src/media/twitter.png", "src/media/linkedin.svg", "src/media/youtube.png"];
  // let href_redes = ["https://www.facebook.com/SenacBrasil", "https://www.instagram.com/senacbrasil/", "https://twitter.com/SenacBrasil", "https://www.linkedin.com/company/2655383", "https://www.youtube.com/user/SenacNacional"]

  // let tam_social = logos_redes.length;

  for (let i = 0; i < tam_social; i++) {
    let link_social = `${href_redes[i]}`;
    let img_rede = `${logos_redes[i]}`;
    let rede = document.createElement(`a`);
    rede.setAttribute('href', link_social);
    let btn_rede = document.createElement(`button`);
    btn_rede.setAttribute('class', 'btn-social');
    let img_social = document.createElement(`img`);
    img_social.setAttribute('class', 'img-social');
    img_social.setAttribute('src', img_rede);

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

  let areaSearch = document.getElementById('areaSearch');

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
  divSearch.setAttribute('id', 'divSearch');

  let imgSearch = document.createElement(`img`);
  imgSearch.setAttribute('alt', 'Buscar...');
  imgSearch.setAttribute('src', 'media/search3.png');

  let txtSearch = document.createElement(`input`);
  txtSearch.setAttribute('id', 'txtSearch');
  txtSearch.setAttribute('type', 'text');
  txtSearch.setAttribute('placeholder', 'Buscar...');

  let btnSearch = document.createElement(`button`);
  btnSearch.append('Buscar');
  btnSearch.setAttribute('id', 'btnSearch');

  divSearch.append(imgSearch);
  divSearch.append(txtSearch);
  divSearch.append(btnSearch);

  area.append(divSearch);

  areaSearch.append(area);
}

function areaCategorias() {
  // *******************************************************************************************************************************************
  // Area Categorias

  const categorias = [
    'Salgados',
    'Doces',
    'Massas',
    'Bebidas',
    'Sobremesas',
    'Confeitaria',
    'Saladas',
    'Refeições',
    'Comidas Rápidas',
    'Sopas',
    'Farofas',
    'Drinks',
    'Sorvetes',
  ];

  let tam_cat = categorias.length;

  let cont_cat = document.getElementById('cont-categorias');
  let area_cat = document.createDocumentFragment();

  // let container_cat = document.createElement(`div`)
  // container_cat.setAttribute('class', 'cont-categorias')

  for (let i = 0; i < tam_cat; i++) {
    let cat = document.createElement(`a`);
    // cat.setAttribute('href', '')

    let btn_cat = document.createElement(`button`);
    btn_cat.append(categorias[i]);
    btn_cat.setAttribute('class', 'btn-menu');

    cat.append(btn_cat);
    area_cat.append(cat);
  }

  cont_cat.append(area_cat);
}
