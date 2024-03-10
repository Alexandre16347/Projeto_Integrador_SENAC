const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes'); // Importa as rotas definidas em outro arquivo
import mongoose from 'mongoose'; // Importa o Mongoose para interagir com o MongoDB
import path from 'path'

class App {
    constructor() {
        // Conecta-se ao banco de dados MongoDB utilizando o Mongoose
        mongoose.connect('mongodb+srv://SemiFinal:SemiFinal123@karaqualquer.fg0uojx.mongodb.net/?retryWrites=true&w=majority');

        // Inicializa o servidor Express
        this.server = express();

        // Configura os middlewares
        this.middlewares();

        // Configura as rotas
        this.routes();
    };

    // Configuração dos middlewares
    middlewares() {
        // Define uma rota estática para servir arquivos estáticos, como imagens
        this.server.use('/files', express.static(path.resolve(__dirname, 'Uploads')));

        // Habilita o uso de JSON para lidar com dados de requisição
        this.server.use(express.json());

        // Habilita o uso de cookies
        this.server.use(cookieParser());

        // Habilita o CORS para permitir requisições de diferentes origens
        this.server.use('/', cors(), routes);
        // Habilita o CORS para permitir requisições de diferentes origens
        this.server.use(
            cors({
                origin: ['54.207.33.250:80'],
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            }),
        );

        this.server.use(express.static(path.resolve(__dirname, '.', 'Public')));
        this.server.use(express.static(path.resolve(__dirname, '.', 'Uploads')));

        // Habilita o uso de JSON para lidar com dados de requisição
        this.server.use(express.urlencoded({ extended: true }));


    };

    // Configuração das rotas
    routes() {
        // Utiliza as rotas definidas em outro arquivo
        this.server.use(routes);
    };
};

// Exporta uma instância do servidor Express configurado
module.exports = new App().server;
