const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
import mongoose from 'mongoose';
import path from 'path'

class App{
    constructor(){
        mongoose.connect('mongodb+srv://SemiFinal:SemiFinal123@karaqualquer.fg0uojx.mongodb.net/?retryWrites=true&w=majority');

        this.server = express();
        this.middlewares();
        this.routes();
    };
    middlewares(){
        this.server.use('/files',express.static(path.resolve(__dirname,'Uploads')))
        this.server.use(express.json());
        this.server.use(cookieParser());
        this.server.use(cors()); // Adicione essa linha para habilitar o CORS

    };
    routes(){
        this.server.use(routes);
    };
};
module.exports = new App().server;