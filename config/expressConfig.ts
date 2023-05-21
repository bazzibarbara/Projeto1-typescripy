/* eslint-disable no-undef */
import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
    origin: process.env.APP_URL,
    credentials: true
  };
app.use(cors(options));
  
app.use(cookieParser());
  
app.use(express.urlencoded({
    extended: true,
}));
  
app.use(express.json());

import { router as musicaRouter } from '../src/domains/Musicas/controllers/index';
app.use('/api/musica', musicaRouter);

import { router as artistaRouter } from '../src/domains/Artistas/controllers/index';
app.use('/api/artista', artistaRouter);

import { router as usuarioRouter } from '../src/domains/Usuarios/controllers/index';
app.use('/api/usuario', usuarioRouter);

import { router as usuarioMusicaRouter } from '../src/domains/UsuariosMusicas/controllers/index';
app.use('/api/usuariosMusicas', usuarioMusicaRouter);

import { errorHandler } from '../src/middlewares/error-handler';
app.use(errorHandler);