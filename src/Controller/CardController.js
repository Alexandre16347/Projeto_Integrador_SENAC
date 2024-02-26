import Receita from '../Model/Receita';
import User from '../Model/User';

class cards {
  async buscarCards(req, res) {
    // const { user, id } = req.headers;

    // let receita = await Receita.findOne({ _id: String(id) });
    // let usuario = await User.findOne({ _id: String(user) });

    let cards = [];

    const lista = await Receita.find();

    for (let i = 0; i < lista.length; i++) {
      const receita = lista[i];

      const id = String(receita.user);

      const usuario = await User.findOne({ _id: id });

      const card = {
        Titulo: receita.Titulo,
        imagem: receita.imagem,
        idReceita: String(receita._id),
        idUsuario: id,
        nomeDoChef: receita.nomeDoChef,
        fotoDoChef: (usuario && usuario.imagem) ? usuario.imagem : null,
      };

      cards.push(card);
    }

    return res.json(cards);
  }

  async buscaReceitaPorUsuario(req, res) {
    const { user } = req.headers;

    // let receita = await Receita.findOne({ _id: String(id) });
    // let usuario = await User.findOne({ _id: String(user) });

    let cards = [];

    const lista = await Receita.find({ user });

    for (let i = 0; i < lista.length; i++) {
      const receita = lista[i];

      const usuario = await User.findOne({ _id: user });

      const card = {
        Titulo: receita.Titulo,
        imagem: receita.imagem,
        idReceita: String(receita._id),
        idUsuario: user,
        nomeDoChef: receita.nomeDoChef,
        fotoDoChef: (usuario && usuario.imagem) ? usuario.imagem : null,
      };

      cards.push(card);
    }

    return res.json(cards);
  }

  // Método para buscar uma receita pela categoria
  async buscarPorId(req, res) {
    const { id } = req.headers;

    const cards = []

    try {
      const receitas = await Receita.find({ categorias: id });

      for (let i = 0; i < receitas.length; i++) {
        const receita = receitas[i];

        const usuario = await User.findOne({ _id: receita.user });

        const card = {
          Titulo: receita.Titulo,
          imagem: receita.imagem,
          idReceita: String(receita._id),
          idUsuario: receita.user,
          nomeDoChef: receita.nomeDoChef,
          fotoDoChef: (usuario && usuario.imagem) ? usuario.imagem : null,
        };

        cards.push(card);

      }

      return res.json(cards);
    } catch (error) {
      console.error("Erro ao buscar receitas por categoria:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export default new cards();
