import Categoria from '../Model/Categoria';
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
  


  async deletarCategoria(req, res) {
    const { id } = req.headers;

    try {
      const categoria = await Categoria.findByIdAndDelete(id);

      if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      return res.json(categoria);
    } catch (error) {
      console.error("Erro ao deletar Categoria:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }


  async buscarPorNome(req, res) {
    const { nome } = req.query;
  
    const cards = [];
  
    try {
      // Busca por receitas que correspondem ao nome fornecido
      const receitasPorNome = await Receita.find({ Titulo: { $regex: new RegExp(nome, 'i') } });
  
      // Busca por categorias que correspondem ao nome fornecido
      const categorias = await Categoria.find({ nome: { $regex: new RegExp(nome, 'i') } });
  
      // Adiciona as receitas encontradas pelo nome
      for (let i = 0; i < receitasPorNome.length; i++) {
        const receita = receitasPorNome[i];
  
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
  
      // Adiciona as receitas encontradas pelas categorias
      for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
  
        const receitasPorCategoria = await Receita.find({ categorias: categoria._id });
  
        for (let j = 0; j < receitasPorCategoria.length; j++) {
          const receita = receitasPorCategoria[j];
  
          // Verifica se a receita já foi adicionada para evitar duplicatas
          if (!cards.some(card => card.idReceita === String(receita._id))) {
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
        }
      }
  
      // Se não houver receitas encontradas, retorna um array vazio
      if (cards.length === 0) {
        return res.status(404).json({ error: "Nenhuma receita encontrada" });
      }
  
      return res.json(cards);
    } catch (error) {
      console.error("Erro ao buscar receitas por nome:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }


}

export default new cards();
