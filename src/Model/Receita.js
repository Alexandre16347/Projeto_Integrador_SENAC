import { Schema, model } from 'mongoose';
import User from './User';
import Categoria from './Categoria';

const ReceitaShema = new Schema(
  {
    Titulo: {
      type: String,
      required: true,
    },
    ingredientes: {
      type: Array,
      required: true,
    },
    modoDePreparo: {
      type: Array,
      required: true,
    },
    tempo: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    nomeDoChef: String,
    imagem: String,
    //   video: File,
    descricao: {
      type: String,
      required: true,
    },
    porcoes: {
      type: Number,
      required: true,
    },
    categorias: {
      type: [Schema.Types.ObjectId],
      ref: Categoria,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

ReceitaShema.virtual('ImagemUrl').get(function () {
  return `http://localhost:3333/files/${this.imagem}`;
});
export default new model('Receita', ReceitaShema);
