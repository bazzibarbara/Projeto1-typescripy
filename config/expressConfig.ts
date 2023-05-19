import dotenv from 'dotenv';
dotenv.config();


import express from 'express';

const app: express.Application = express();
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import musicaRouter from '../src/domains/Musicas/controllers/MusicaController.ts';
import artistaRouter from '../src/domains/Artistas/controllers/ArtistaController.ts';
import usuarioRouter from '../src/domains/Usuarios/controllers/UsuarioController.ts';
import usuarioMusicaRouter from '../src/domains/UsuariosMusicas/controllers/index.ts';
import errorHandler from '../src/middlewares/error-handler.ts';

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
