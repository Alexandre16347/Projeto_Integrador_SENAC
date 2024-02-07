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
        fotoDoChef: usuario.imagem,
      };

      cards.push(card);
    }

    return res.json(cards);
  }
}

export default new cards();
