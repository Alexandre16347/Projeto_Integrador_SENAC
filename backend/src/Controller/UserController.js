import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'; // Importa o módulo bcrypt
import { v4 as uuidv4 } from 'uuid';
import User from '../Model/User';

class cadastroUsuario {
  async store(req, res) {
    const { Nome, idade, email, senha } = req.body;
    const { filename } = req.file;

    try {
      // Gera um hash para a senha usando bcrypt
      const hashedSenha = await bcrypt.hash(senha, 10); // O número 10 é o custo do hash

      let usuarioCadastra = await User.findOne({ email });

      if (!usuarioCadastra) {
        // Salva o usuário no banco de dados com a senha criptografada
        usuarioCadastra = await User.create({
          Nome,
          idade,
          email,
          senha: hashedSenha,
          imagem: filename
        });

        return res.status(200).json({
          Resposta: 'Usuário cadastrado com sucesso',
          usuarioCadastra
        });
      } else {
        return res.status(200).json({
          Resposta: 'Usuário já cadastrado',
          usuarioCadastra
        });
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const usuario = await User.findOne({ email });

      if (!usuario) {
        console.log(!usuario)
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const isPasswordHashed = usuario.senha.startsWith('$2b$');

      if (!isPasswordHashed) {
        const hashedPassword = await bcrypt.hash(usuario.senha, 10);
        usuario.senha = hashedPassword;
        await usuario.save();
      }
      
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      
      // testeasenha
      
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Credenciais inválidas' });

      }

      const idTemp = uuidv4();
      usuario.idTemp = idTemp;
      await usuario.save();

      return res.status(200).json({ authenticated: true, message: `Bem-vindo ${usuario.nome}!`, session: idTemp });
      // return res.status(200).json({ Message: `Bem vindo ${usuario.nome}!`, Session: idTemp });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ authenticated: false, error: 'Erro interno no servidor' });
    }

  }

  async buscarTudo(req, res) {
    let lista = await User.find();
    return res.json(lista);
  }

  async buscarUser(req, res) {
    const Id = req.query.id;
    let usuario = await User.findOne({ _id: String(Id) });
    return res.json(usuario);
  }

  async deletarUser(req, res) {
    const { id } = req.headers;

    const usuario = await User.findOneAndDelete({ _id: id });

    return res.json(usuario);
  }

  async atualizarSenha(req, res) {
    const { id } = req.headers;
    const { senha } = req.body;
    const usuario = await User.findOneAndUpdate({ _id: id }, { senha: senha });
    return res.json(usuario);
  }
}

export default new cadastroUsuario();
