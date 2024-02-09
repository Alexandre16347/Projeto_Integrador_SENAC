import multer from 'multer';
import Upload from './Config/Upload';
import { Router } from 'express';
import user from './Controller/UserController';
import receita from './Controller/ReceitaController';
import card from './Controller/CardController';
import path from 'path';

const upload = new multer(Upload);
const routes = new Router();


routes.get('/', (req,res)=>{
    return res.json({msg: "Certinho"})
});

// Rotas para manipulação de cards
routes.get('/cards', card.buscarCards);

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
// Buscar receitas por usuário
routes.get('/buscarReceitaUser', receita.buscaReceitaPorUsuario);


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
routes.put('/receita/:id', upload.single('imagem'), receita.atualizarTudo);


// Deletar uma receita
routes.delete('/deletarReceita', receita.deletarReceita);
// Deletar todas as receitas de um usuário
routes.delete('/deletarReceitasUser', receita.deletarReceitasPorUsuario);

module.exports = routes;

