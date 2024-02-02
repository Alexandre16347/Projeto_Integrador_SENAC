import {Schema, model} from "mongoose";

const CardShema = new Schema({
    Titulo: String,
    nomeDoChef: String,
    // imagemReceita: File,
    // imagemChef: File,
})

export default new model('Card', CardShema)