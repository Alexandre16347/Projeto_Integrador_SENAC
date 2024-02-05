import { Router } from 'express';
import user from './Controller/UserController';
import receita from './Controller/ReceitaController';
import multer from 'multer';
import Upload from './Config/Upload';
import card from './Controller/CardController';

const routes = new Router();
const upload = new multer(Upload);

routes.get('/', (req,res)=>{
    return res.json({msg: "Certinho"})
});

//CARDS
routes.get('/cards', card.buscarCards);

// USUARIO
//Posts
routes.post('/user', upload.single('imagem'), user.store);
routes.post('/login', user.login);
routes.post('/verificar-token', user.verificarIdTemp);
routes.post('/buscaUserToken', user.buscaPorToken);

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
