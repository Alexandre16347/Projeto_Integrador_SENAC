const express = require('express');
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
    };
    routes(){
        this.server.use(routes);
    };
};
module.exports = new App().server;