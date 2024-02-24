import Categoria from "../Model/Categoria";

class crudCategoria {

    async store(req, res) {

        const { nome } = req.body;

        try {
            // Verifica se a categoria existe
            let categoria = await Categoria.findOne({ nome });

            if (categoria) {
                return res.status(400).json({ error: 'Categoria já cadastrada' });
            }
            // console.log("vou cadastrar")
            // Cria a nova categoria
            categoria = await Categoria.create({ nome });

            return res.status(201).json(categoria);
        } catch (error) {
            console.error('Erro no cadastro da categoria:', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }

    }

    async buscarPorId(req, res) {
        const { id } = req.query;

        try {
            let categoria = await Categoria.findById(id);

            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            return res.json(categoria);
        } catch (error) {
            console.error('Erro ao buscar categoria por ID:', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }

    async buscarTudo(req, res) {
        try {
          const lista = await Categoria.find();
          return res.json(lista);
        } catch (error) {
          console.error('Erro ao buscar categorias', error);
          return res.status(500).json({ error: 'Erro interno no servidor' });
        }
      }

      async atualizaNome(req, res) {
        try {
           
          const { id, nome } = req.body; // Obtém o novo nome do usuário a partir do corpo da requisição
    
          // Verifica se o usuário existe no banco de dados
          const categoria = await Categoria.findById(id);
          if (!categoria) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
          }
    
          // Atualiza o nome do usuário
          categoria.nome = nome;
    
          // Salva a alteração no banco de dados
          await categoria.save();
    
          // Retorna uma resposta de sucesso com o usuário atualizado
          return res.json(categoria);
        } catch (error) {
          console.error('Erro ao atualizar nome do usuário:', error);
          return res.status(500).json({ error: 'Erro interno no servidor' });
        }
      }
    


}

export default new crudCategoria();