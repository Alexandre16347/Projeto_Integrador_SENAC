import Categoria from "../Model/Categoria";
import Receita from "../Model/Receita";

class RetornarReceita {
    // Método para buscar uma receita pela categoria
    async buscarPorId(req, res) {
        const { id } = req.headers;
        try {
            const categorias = await Categoria.find()
            const receitas = await Receita.find({ categorias: id });
            return res.json(receitas);
        } catch (error) {
            console.error("Erro ao buscar receitas por categoria:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export default new RetornarReceita();
