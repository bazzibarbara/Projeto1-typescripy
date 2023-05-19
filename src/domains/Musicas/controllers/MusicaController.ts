import express, { Request, Response } from 'express';
import MusicaService from '../services/MusicaService.ts';

const router = express.Router();

router.get('/all', async (req: Request, res: Response): Promise<Response> => {
  try {
    const musicas = await MusicaService.obterMusicas();
    return res.status(200).send(musicas);
  } catch {
    return res.status(400).json('Nao foi possivel acessar a tabela de musicas.');
  }
});

router.get('/all/:nome', async (req: Request, res: Response): Promise<Response> => {
  const { nome } = req.params;

  try {
    const musica = await MusicaService.obterMusicaPorNome(nome);
    return res.status(200).json(musica);
  } catch {
    return res.status(400).json(`Nao foi encontrada musica com o nome ${nome}.`);
  }
});

router.get('/all/:nome/artista', async (req: Request, res: Response): Promise<Response> => {
  const { nome } = req.params;

  try {
    const artista = await MusicaService.obterArtistaPorMusica(nome);
    return res.status(200).json(artista);
  } catch {
    return res.status(400).json(`Nao foi encontrada musica com o nome ${nome}.`);
  }
});

router.post('/add', async (req: Request, res: Response): Promise<Response> => {
  try {
    await MusicaService.adicionarMusica(req.body);
    return res.status(201).json('Nova musica criada com sucesso!');
  } catch {
    return res.status(400).send('Nao foi possivel adicionar a musica.');
  }
});

router.put('/edit/:nome/:foto_str', async (req: Request, res: Response): Promise<Response> => {
  const { nome, foto_str } = req.params;

  try {
    await MusicaService.editarFoto(nome, foto_str);
    return res.status(200).send(`A foto da musica ${nome} editado com sucesso.`);
  } catch {
    return res.status(400).json();
  }
});

router.delete('/delete/:nome', async (req: Request, res: Response): Promise<Response> => {
  const { nome } = req.params;

  try {
    await MusicaService.deletarMusica(nome);
    return res.status(200).send('Musica deletada com sucesso');
  } catch {
    return res.status(400).send('Musica nao encontrada');
  }
});

export default router;
