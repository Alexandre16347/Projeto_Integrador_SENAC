import fs from 'fs';
import path from 'path';
import Receita from '../Model/Receita';
import User from '../Model/User';

// Função para aguardar X segundos
// function esperarSegundos(segundos) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, segundos * 1000); // Multiplica por 1000 para converter segundos em milissegundos
//   });
// }

class CadastroReceita {
  // Método para cadastrar uma nova receita
  async store(req, res) {
    console.log(req.body)
    const {
      Titulo,
      modoDePreparo = JSON.parse(modoDePreparo),
      ingredientes = JSON.parse(ingredientes),
      tempo,
      porcoes,
      categoria,
      descricao,
    } = req.body;
    const { filename } = req.file;
    const { user } = req.headers;

    const categorias = categoria

    

    try {
      // Verifica se o usuário existe
      const usuario = await User.findById(user, 'Nome');

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Cria a nova receita
      const novaReceita = await Receita.create({
        Titulo,
        ingredientes,
        modoDePreparo,
        tempo,
        nomeDoChef: usuario.Nome,
        user,
        imagem: filename,
        porcoes,
        categorias,
        descricao,
      });

      return res.status(201).json(novaReceita);
    } catch (error) {
      console.error('Erro no cadastro de receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para buscar todas as receitas
  async buscarTudo(req, res) {
    try {
      let lista = await Receita.find();

      // Verifica e ajusta as receitas que não possuem categorias, porções ou descrição
      for (let i = 0; i < lista.length; i++) {
        const receita = lista[i];

        if (!receita.categorias || !receita.porcoes || !receita.descricao) {
          receita.categorias = 'gostosa';
          receita.porcoes = 1;
          receita.descricao = 'Muito gostoso';
          await receita.save();
        }
      }

      return res.json(lista);
    } catch (error) {
      console.error('Erro ao buscar todas as receitas:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para buscar uma receita pelo ID
  async buscarPorId(req, res) {
    const { id } = req.query;

    try {
      let receita = await Receita.findById(id);

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao buscar receita por ID:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para deletar uma receita
  async deletarReceita(req, res) {
    const { id } = req.headers;

    try {
      const receita = await Receita.findByIdAndDelete(id);

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      // Deleta a imagem associada à receita
      CadastroReceita.deleteImageInUploadsFolder(receita.imagem);

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao deletar receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para buscar receitas por usuário
  async buscaReceitaPorUsuario(req, res) {
    const { user } = req.headers;

    try {
      const lista = await Receita.find({ user });
      return res.json(lista);
    } catch (error) {
      console.error('Erro ao buscar receitas por usuário:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para deletar todas as receitas de um usuário
  async deletarReceitasPorUsuario(req, res) {
    const { user } = req.headers;

    try {
      const lista = await Receita.find({ user });
      const excluidas = [];

      for (let index = 0; index < lista.length; index++) {
        const id = lista[index]._id;
        const receita = await Receita.findByIdAndDelete(id);

        if (receita) {
          // Deleta a imagem associada à receita
          CadastroReceita.deleteImageInUploadsFolder(receita.imagem);
          excluidas.push(receita);
        }
      }

      return res.json(excluidas);
    } catch (error) {
      console.error('Erro ao deletar receitas por usuário:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método estático para deletar imagem da pasta de uploads
  static deleteImageInUploadsFolder(imageName) {
    const uploadsFolderPath = path.join(__dirname, '..', 'Uploads');
    
    const imagePath = path.join(uploadsFolderPath, imageName);

    try {
      // Verifica se o arquivo existe antes de tentar excluir
      fs.accessSync(imagePath, fs.constants.F_OK);

      // Exclui o arquivo
      fs.unlinkSync(imagePath);
      console.log(`Arquivo ${imageName} excluído com sucesso.`);
    } catch (error) {
      console.error(`Erro ao excluir o arquivo ${imageName}:`, error);
    }
  }

  // Método para atualizar o título da receita
  async atualizarTitulo(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;

    try {
      const receita = await Receita.findByIdAndUpdate(
        id,
        { Titulo: titulo },
        { new: true },
      );

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar título da receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para atualizar os ingredientes da receita
  async atualizarIngredientes(req, res) {
    const { id } = req.params;
    const { ingredientes } = req.body;

    try {
      const receita = await Receita.findByIdAndUpdate(
        id,
        { ingredientes },
        { new: true },
      );

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar ingredientes da receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para atualizar o modo de preparo da receita
  async atualizarModoDePreparo(req, res) {
    const { id } = req.params;
    const { modoDePreparo } = req.body;

    try {
      const receita = await Receita.findByIdAndUpdate(
        id,
        { modoDePreparo },
        { new: true },
      );

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar modo de preparo da receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para atualizar o tempo de preparo da receita
  async atualizarTempo(req, res) {
    const { id } = req.params;
    const { tempo } = req.body;

    try {
      const receita = await Receita.findByIdAndUpdate(
        id,
        { tempo },
        { new: true },
      );

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar tempo da receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para atualizar as porções da receita
  async atualizarPorcoes(req, res) {
    const { id } = req.params;
    const { porcoes } = req.body;

    try {
      const receita = await Receita.findByIdAndUpdate(
        id,
        { porcoes },
        { new: true },
      );

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar porções da receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para atualizar as categorias da receita
  async atualizarCategorias(req, res) {
    const { id } = req.params;
    const { categorias } = req.body;

    try {
      const receita = await Receita.findByIdAndUpdate(
        id,
        { categorias },
        { new: true },
      );

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar categorias da receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Método para atualizar a descrição da receita
  async atualizarDescricao(req, res) {
    const { id } = req.params;
    const { descricao } = req.body;

    try {
      const receita = await Receita.findByIdAndUpdate(
        id,
        { descricao },
        { new: true },
      );

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar descrição da receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Função para atualizar a imagem da receita com o ID fornecido
  async atualizarImagem(req, res) {
    const { id } = req.params;
    const { filename } = req.file;

    try {
      const receita = await Receita.findById(id);

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      // Se a receita já tinha uma imagem, exclui ela
      if (receita.imagem) {
        this.deleteImageInUploadsFolder(receita.imagem);
      }

      // Atualiza a imagem da receita
      receita.imagem = filename;

      // Salva a receita atualizada no banco de dados
      await receita.save();

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar imagem da receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  // Função para atualizar todos os atributos da receita de uma vez com o ID fornecido
  async atualizarTudo(req, res) {
    const { id } = req.query;
    const novosDados = req.body;

    console.log({id, novosDados})

    try {
      const receita = await Receita.findByIdAndUpdate(id, novosDados, {
        new: true,
      });

      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      return res.json(receita);
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}

export default new CadastroReceita();
