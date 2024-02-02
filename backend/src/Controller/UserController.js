import User from '../Model/User';

class cadastroUsuario {
  async store(req, res) {
    const { Nome, idade, email, senha } = req.body;

    let usuarioCadastra = await User.findOne({ Nome, idade, email, senha });

    if (!usuarioCadastra) {
      usuarioCadastra = await User.create({ Nome, idade, email, senha });
    }
    return res.json(usuarioCadastra);
  }

  async buscarTudo(req, res) {
    let lista = await User.find();
    return res.json(lista);
  }

  async buscarUser(req, res) {
    const Id = req.query.id;
    let usuario = await User.findOne({_id:String(Id)});
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
    const usuario = await User.findOneAndUpdate({ _id: id }, {senha:senha});
    return res.json(usuario);
  }
}

export default new cadastroUsuario();
