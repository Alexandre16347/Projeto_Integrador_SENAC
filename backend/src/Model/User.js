import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  Nome: {
    required: true,
    type: String,
    max: 100,
  },
  // imagem: File,
  idade: {
    required: true,
    type: Number,
  },
  //   cpf: {
  //     type: true,
  //   },
  email: {
    required: true,
    type: String,
    match: /^[a-zA-B0-9._-]+@[a-zA-B0-9.-]+\.[a-zA-B]{2,4}$/,
    unique: true,
  },
  senha: {
    required: true,
    match: /^[@a-zA-B0-9._-]{8,}$/,
    type: String,
  },
  imagem: String,
  //   video: File,
},
  {
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.virtual('ImagemUrl').get(function(){
  return `http://localhost:3333/files/${this.imagem}`
})

export default new model('Usuario', UserSchema);
