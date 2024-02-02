import fs from 'fs';
import path from 'path';
import Receita from '../Model/Receita';
import User from '../Model/User';

class cadastroReceita {
  async store(req, res) {
    const { Titulo, ingredientes, modoDePreparo, tempo } = req.body;
    const { filename } = req.file;
    const { user } = req.headers;
    const id = String(user);
    const usuario = await User.findOne({ _id: id }, 'Nome');
    const nomeDoChef = usuario.Nome;

    let receitaCadastra = await Receita.findOne({
      Titulo,
      user,
    });

    if (!receitaCadastra) {
      receitaCadastra = await Receita.create({
        Titulo,
        ingredientes,
        modoDePreparo,
        tempo,
        nomeDoChef,
        user,
        imagem: filename,
      });
    }
    return res.json(receitaCadastra);
  }

  async buscarTudo(req, res) {
    let lista = await Receita.find();
    return res.json(lista);
  }

  async buscarPorId(req, res) {
    const Id = req.query.id;
    let receita = await Receita.findOne({ _id: String(Id) });
    return res.json(receita);
  }

  static deleteImageInUploadsFolder(imageName) {
    this.imageName = imageName;
    const uploadsFolderPath = path.join(__dirname, '..', 'Uploads');
    const imagePath = path.join(uploadsFolderPath, this.imageName);

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

  async deletarReceita(req, res) {
    const { id } = req.headers;

    try {
      const receita = await Receita.findOneAndDelete({ _id: id });

      if (receita) {
        cadastroReceita.deleteImageInUploadsFolder(receita.imagem);
      }

      return res.json(receita);
    } catch (err) {
      console.error('Erro ao deletar receita:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async BuscaReceitaPorUsuario(req, res) {
    const { user } = req.headers;

    const lista = await Receita.find({ user: user });

    return res.json(lista);
  }

  async deletarReceitaPorUsuario(req, res) {
    const { user } = req.headers;

    const lista = await Receita.find({ user: user });
    let excluidas = [];

    for (let index = 0; index < lista.length; index++) {
      const id = lista[index]._id;
      const receita = await Receita.findOneAndDelete({ _id: id });
      cadastroReceita.deleteImageInUploadsFolder(receita.imagem);

      excluidas.push(receita)
    }

    return res.json(excluidas);
  }
}

export default new cadastroReceita();
