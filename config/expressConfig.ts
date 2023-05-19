import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import musicaRouter from '../src/domains/Musicas/controllers/index';
import artistaRouter from '../src/domains/Artistas/controllers/index';
import usuarioRouter from '../src/domains/Usuarios/controllers/index';
import usuarioMusicaRouter from '../src/domains/UsuariosMusicas/controllers/index';
import errorHandler from '../src/middlewares/error-handler';

const app: Application = express();
const client_url: string | undefined = process.env.CLIENT_URL;

app.use(cors(
  {
    origin: client_url,
    credentials: true,
  },
));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api/musica', musicaRouter);
app.use('/api/artista', artistaRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/usuariosMusicas', usuarioMusicaRouter);

app.use(errorHandler);

export default app;
