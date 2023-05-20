/* eslint-disable no-undef */
import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

export const app: Express = express();

const musicaRouter = require('../src/domains/Musicas/controllers/index.js');
app.use('/api/musica', musicaRouter);

const artistaRouter = require('../src/domains/Artistas/controllers/index.js');
app.use('/api/artista', artistaRouter);

const usuarioRouter = require('../src/domains/Usuarios/controllers/index.js');
app.use('/api/usuario', usuarioRouter);

const usuarioMusicaRouter = require('../src/domains/UsuariosMusicas/controllers/index.js');
app.use('/api/usuariosMusicas', usuarioMusicaRouter);

const errorHandler = require('../src/middlewares/error-handler.js');
app.use(errorHandler);

module.exports = app;