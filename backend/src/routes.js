import { Router } from 'express';
import user from './Controller/UserController';
import receita from './Controller/ReceitaController';
import multer from 'multer';
import Upload from './Config/Upload';

const routes = new Router();
const upload = new multer(Upload);

routes.get('/', (req, res) => {
  return res.json({ message: 'ok' });
});

// USUARIO
//Posts
routes.post('/user', user.store);

//Gets
routes.get('/buscarUsuarios', user.buscarTudo);
routes.get('/buscaUserId', user.buscarUser);

//Puts
routes.put('/novaSenha', user.atualizarSenha);

//Deletes
routes.delete('/deletarUser', user.deletarUser);


// Receitas
//Posts
routes.post('/receita', upload.single('imagem'), receita.store);


//Gets
routes.get('/receitas', receita.buscarTudo);
routes.get('/receita', receita.buscarPorId);
routes.get('/buscarReceitaUser', receita.BuscaReceitaPorUsuario);


//Puts


//Deletes
routes.delete('/deletarReceita', receita.deletarReceita);
routes.delete('/deletarReceitasUser', receita.deletarReceitaPorUsuario);


module.exports = routes;
