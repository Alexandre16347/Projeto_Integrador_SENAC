import multer from 'multer';
import Upload from './Config/Upload';
import { Router } from 'express';
import user from './Controller/UserController';
import receita from './Controller/ReceitaController';
import card from './Controller/CardController';
import path from 'path';
import categoria from './Controller/CategoriaController';

const upload = new multer(Upload);
const routes = new Router();


routes.get('/', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "index.html")
    return res.sendFile(caminho);
});

// Login de usuários
routes.get('/Sobre', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Sobre.html")
    return res.sendFile(caminho);
});

// Login de usuários
routes.get('/Chefs', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Busca-Chef.html")
    return res.sendFile(caminho);
});

// Login de usuários
routes.get('/login', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Login.html")
    return res.sendFile(caminho);
});

routes.get('/VerReceita', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Ver-Receita.html")
    return res.sendFile(caminho);
});

routes.get('/Chef', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Chefes.html")
    return res.sendFile(caminho);
});

routes.get('/Cadastro', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Cadastro.html")
    return res.sendFile(caminho);
});

routes.get('/PerfilEditar', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Editar-Perfil.html")
    return res.sendFile(caminho);
});

routes.get('/cadastrarReceita', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "cadastrar-receita.html")
    return res.sendFile(caminho);
});

routes.get('/Categorias', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Categorias.html")
    return res.sendFile(caminho);
});

routes.get('/RecuperarSenha', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "Recuperar-Senha.html")
    return res.sendFile(caminho);
});

routes.get('/EditarReceita', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "editar-receitas.html")
    return res.sendFile(caminho);
});

routes.get('/NotFound', (req,res)=>{
    const caminho = path.resolve(__dirname, "View", "NotFound.html")
    return res.sendFile(caminho);
});




// Rotas para manipulação de cards
routes.get('/cards', card.buscarCards);

// Buscar receitas por usuário
routes.get('/buscarReceitaUser', card.buscaReceitaPorUsuario);

// Rotas relacionadas aos usuários
// Cadastro de usuários
routes.post('/user', upload.single('imagem'), user.store);


// Login de usuários
routes.post('/login', user.login);
// Verificar token de autorização
routes.post('/verificar-token', user.verificarIdTemp);
// Buscar usuário por token
routes.post('/buscaUserToken', user.buscaPorToken);

// Obter todos os usuários
routes.get('/buscarUsuarios', user.buscarTudo);
// Buscar usuário por ID
routes.get('/buscaUserId', user.buscarUser);

// Atualizar senha do usuário
routes.put('/novaSenha', user.atualizarSenha);
// Rota para atualizar nome do usuário
routes.put('/usuarios/:id/nome', user.atualizaNome);
// Rota para atualizar idade do usuário
routes.put('/usuarios/:id/idade', user.atualizaIdade);
// Rota para atualizar imagem do usuário
routes.put('/usuarios/:id/imagem', upload.single('imagem'), user.atualizaImagem);


// Deletar usuário
routes.delete('/deletarUser', user.deletarUsuario);

// Rotas relacionadas às receitas
// Cadastro de receitas
routes.post('/receita', upload.single('imagem'), receita.store);

// Obter todas as receitas
routes.get('/receitas', receita.buscarTudo);
// Buscar receita por ID
routes.get('/receita', receita.buscarPorId);



// Rota para atualizar o título da receita com o ID fornecido
routes.put('/receita/:id/titulo', receita.atualizarTitulo);

// Rota para atualizar os ingredientes da receita com o ID fornecido
routes.put('/receita/:id/ingredientes', receita.atualizarIngredientes);

// Rota para atualizar o modo de preparo da receita com o ID fornecido
routes.put('/receita/:id/modo-de-preparo', receita.atualizarModoDePreparo);

// Rota para atualizar o tempo de preparo da receita com o ID fornecido
routes.put('/receita/:id/tempo', receita.atualizarTempo);

// Rota para atualizar o número de porções da receita com o ID fornecido
routes.put('/receita/:id/porcoes', receita.atualizarPorcoes);

// Rota para atualizar as categorias da receita com o ID fornecido
routes.put('/receita/:id/categorias', receita.atualizarCategorias);

// Rota para atualizar a descrição da receita com o ID fornecido
routes.put('/receita/:id/descricao', receita.atualizarDescricao);

// Rota para atualizar a imagem da receita com o ID fornecido
routes.put('/receita/:id/imagem', upload.single('imagem'), receita.atualizarImagem);

// Rota para atualizar todos os atributos da receita de uma vez com o ID fornecido
routes.put('/receita', upload.single('imagem'), receita.atualizarTudo);


// Deletar uma receita
routes.delete('/deletarReceita', receita.deletarReceita);
// Deletar todas as receitas de um usuário
routes.delete('/deletarReceitasUser', receita.deletarReceitasPorUsuario);



//categoria
//adicionar uma categoria
routes.post('/adicionarCategoria', categoria.store);
//
routes.get('/Categoria', categoria.buscarPorId);
//
routes.get('/todasCategoria', categoria.buscarTudo);
//
routes.put('/atualizarCategoria', categoria.atualizaNome)

//Receita por categoria
routes.get('/ReceitaPorCategoria', card.buscarPorId);

//
routes.delete('/deletarCategoria', card.deletarCategoria);





module.exports = routes;

