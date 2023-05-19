import express, { Request, Response } from 'express';
import { ArtistaService } from '../services/ArtistaService.ts';

const router = express.Router();

router.get('/all', async (req: Request, res: Response): Promise<Response> => {
  try {
    const artistas = await ArtistaService.obterArtistas();
    return res.status(200).send(artistas);
  } catch (error) {
    return res.status(400);
  }
});

router.get('/all/:nome', async (req: Request, res: Response): Promise<Response> => {
  const { nome } = req.params;

  try {
    const artista = await ArtistaService.obterArtistaPorNome(nome);
    return res.status(200).send(artista);
  } catch (error) {
    return res.status(400).json('Artista nao encontrado.');
  }
});

router.get('/all/:nome/musicas', async (req: Request, res: Response): Promise<Response> => {
  const { nome } = req.params;

  try {
    const musica = await ArtistaService.obterMusicasPorArtista(nome);
    return res.status(200).send(musica);
  } catch (error) {
    return res.status(400).json('Artista nao encontrado.');
  }
});

router.post('/add', async (req: Request, res: Response): Promise<Response> => {
  const body = req.body;

  try {
    await ArtistaService.adicionarArtista(body);
    return res.status(201).json('Artista criado com sucesso');
  } catch (error) {
    return res.status(400);
  }
});

router.put('/edit/:nome/:novafoto', async (req: Request, res: Response): Promise<Response> => {
  const { nome, novafoto } = req.params;

  try {
    await ArtistaService.editarFoto(nome, novafoto);
    return res.status(200).send(`Foto do artista ${nome} editado com sucesso.`);
  } catch (error) {
    return res.status(400).json();
  }
});

router.delete('/delete/:nome', async (req: Request, res: Response): Promise<Response> => {
  const { nome } = req.params;

  try {
    await ArtistaService.deletarArtista(nome);
    return res.status(200).send('Artista deletado com sucesso');
  } catch (error) {
    return res.status(400).send('Artista nao encontrado.');
  }
});

export { router };
