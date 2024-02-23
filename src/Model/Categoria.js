import { Schema, model } from 'mongoose';

const CategoriaShema = new Schema({

    nome: {
        required: true,
        type: String,
    },

})

export default new model('Categoria', CategoriaShema);
