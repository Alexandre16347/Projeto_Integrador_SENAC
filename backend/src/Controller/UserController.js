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
        // Validar entrada
        if (!Nome || !idade || !email || !senha) {
            return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
        }

        // Validar formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'E-mail inválido.' });
        }

        // Validar comprimento da senha
        if (senha.length < 8) {
            return res.status(400).json({ error: 'A senha deve ter pelo menos 8 caracteres.' });
        }

        // Verificar se o usuário já está cadastrado
        let usuarioCadastra = await User.findOne({ email });
        if (usuarioCadastra) {
            return res.status(400).json({ error: 'Usuário já cadastrado.' });
        }

        // Gerar um hash para a senha usando bcrypt
        const hashedSenha = await bcrypt.hash(senha, 10); // O número 10 é o custo do hash

        // Salvar o usuário no banco de dados com a senha criptografada
        usuarioCadastra = await User.create({
            Nome,
            idade,
            email,
            senha: hashedSenha,
            imagem: filename
        });

        return res.status(201).json({
            success: true,
            message: 'Usuário cadastrado com sucesso.',
            usuarioCadastra
        });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }

  async login(req, res) {
    const { email, senha } = req.body;

    try {
        // Verificar se o e-mail e a senha foram fornecidos
        if (!email || !senha) {
            return res.status(400).json({ error: 'Por favor, forneça o e-mail e a senha.' });
        }

        // Encontrar o usuário no banco de dados
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Verificar se a senha está correta
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Gerar um token temporário (session)
        const idTemp = uuidv4();
        usuario.idTemp = idTemp;
        await usuario.save();

        return res.status(200).json({
            success: true,
            message: `Bem-vindo ${usuario.Nome}!`,
            session: idTemp
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
}

async buscarTudo(req, res) {
  try {
      const lista = await User.find();
      return res.json(lista);
  } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async buscaPorToken(req, res) {
  try {
      const idTemp = req.headers.authorization;
      const usuario = await User.findOne({ idTemp });
      if (!usuario) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json({ id: usuario.id });
  } catch (error) {
      console.error('Erro ao buscar usuário por token:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async buscarUser(req, res) {
  try {
      const id = req.query.id;
      const usuario = await User.findOne({ _id: id });
      if (!usuario) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json(usuario);
  } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

static deleteImageInUploadsFolder(imageName) {
  const uploadsFolderPath = path.join(__dirname, '..', 'Uploads');
  const imagePath = path.join(uploadsFolderPath, imageName);

  try {
    // Verifica se o arquivo existe antes de tentar excluir
    fs.accessSync(imagePath, fs.constants.F_OK);

    // Exclui o arquivo
    fs.unlinkSync(imagePath);
    console.log(`Arquivo ${imageName} excluído com sucesso.`);
  } catch (err) {
    console.error(`Erro ao excluir o arquivo ${imageName}:`, err);
  }
}

async deletarUsuario(req, res) {
  const { id } = req.headers;

  try {
    const usuario = await User.findOneAndDelete({ _id: id });

    if (usuario) {
      UserController.deleteImageInUploadsFolder(usuario.imagem);
    }

    return res.json(usuario);
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async atualizarSenha(req, res) {
  try {
      const { id } = req.headers;
      const { senha } = req.body;
      const usuario = await User.findOneAndUpdate({ _id: id }, { senha });
      if (!usuario) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json(usuario);
  } catch (error) {
      console.error('Erro ao atualizar senha do usuário:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
  }

}

// Atualizar nome do usuário
async atualizaNome(req, res) {
  try {
    const { id } = req.params; // Obtém o ID do usuário a ser atualizado
    const { Nome } = req.body; // Obtém o novo nome do usuário a partir do corpo da requisição

    // Verifica se o usuário existe no banco de dados
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza o nome do usuário
    usuario.Nome = Nome;

    // Salva a alteração no banco de dados
    await usuario.save();

    // Retorna uma resposta de sucesso com o usuário atualizado
    return res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar nome do usuário:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// Atualizar idade do usuário
async atualizaIdade(req, res) {
  try {
    const { id } = req.params; // Obtém o ID do usuário a ser atualizado
    const { idade } = req.body; // Obtém a nova idade do usuário a partir do corpo da requisição

    // Verifica se o usuário existe no banco de dados
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza a idade do usuário
    usuario.idade = idade;

    // Salva a alteração no banco de dados
    await usuario.save();

    // Retorna uma resposta de sucesso com o usuário atualizado
    return res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar idade do usuário:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// Atualizar imagem do usuário
async atualizaImagem(req, res) {
  try {
    const { id } = req.params; // Obtém o ID do usuário a ser atualizado
    const { filename } = req.file; // Obtém o nome do arquivo de imagem enviado na requisição

    // Verifica se o usuário existe no banco de dados
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza a imagem do usuário
    usuario.imagem = filename;

    // Salva a alteração no banco de dados
    await usuario.save();

    // Retorna uma resposta de sucesso com o usuário atualizado
    return res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar imagem do usuário:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async verificarIdTemp(req, res) {
  try {
      const idTemp = req.headers.authorization;
      if (!idTemp) {
          return res.status(401).json({ error: 'ID Temporário não fornecido' });
      }
      const usuario = await User.findOne({ idTemp });
      if (!usuario) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json({ message: 'ID Temporário válido' });
  } catch (error) {
      console.error('Erro na verificação do ID Temporário:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

}

export default new cadastroUsuario();
