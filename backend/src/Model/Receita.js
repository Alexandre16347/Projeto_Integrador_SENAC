import { Schema, model } from 'mongoose';
import User from './User';

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
      type: String,
      required: true,
    },
    tempo: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    nomeDoChef: String,
    imagem: String,
    //   video: File,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

ReceitaShema.virtual('ImagemUrl').get(function(){
  return `http://localhost:3333/files/${this.imagem}`
})
export default new model('Receita', ReceitaShema);
