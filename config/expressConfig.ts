/* eslint-disable no-undef */
require('dotenv').config();
const client_url = process.env.CLIENT_URL;

require('express-async-errors');
const express = require ('express');
const app = express();

const cors = require('cors');
app.use(cors(
    {
        origin: client_url,
        credentials: true,
    },
));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

const musicaRouter = require('../src/domains/Musicas/controllers/MusicaController');
app.use('/api/musica', musicaRouter);

const artistaRouter = require('../src/domains/Artistas/controllers/ArtistaController');
app.use('/api/artista', artistaRouter);

const usuarioRouter = require('../src/domains/Usuarios/controllers/UsuarioController');
app.use('/api/usuario', usuarioRouter);

const errorHandler = require('../src/middlewares/error-handler.js');
app.use(errorHandler);

module.exports = app;