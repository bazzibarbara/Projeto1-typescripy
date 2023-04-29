const router = require('express').Router();
const ArtistaService = require('../services/ArtistaService');

router.get('/all', async(req,res) =>{
    try {
        const artistas = await ArtistaService.obterArtistas();
        res.status(200).send(artistas);
    } catch {
        res.status(400);
    }
});

router.get('/all/:nome', async (req, res) => {
    const { nome } = req.params;

    try{
        const artista = await ArtistaService.obterArtistaPorNome(nome);
        res.status(200).send(artista);
    }catch{
        res.status(400).json('Artista nao encontrado.');
    }
});

router.get('/all/:nome/musicas', async (req, res) => {
    const { nome } = req.params;

    try{
        const musica = await ArtistaService.obterMusicasPorArtista(nome);
        res.status(200).send(musica);
    }catch{
        res.status(400).json('Artista nao encontrado.');
    }
});

router.post('/add', async(req,res) =>{
    const body = req.body;
    try {
        await ArtistaService.adicionarArtista(body);
        return res.status(201).json('Artista criado com sucesso');
    } catch {
        return res.status(400);
    }
});

router.put('/edit/:nome/:novafoto', async (req, res) => {
    const { nome, novafoto } = req.params;
    
    try{
        await ArtistaService.editarFoto(nome, novafoto);
        res.status(200).send(`Foto do artista ${nome} editado com sucesso.`);
    }catch{
        res.status(400).json();
    }

});

router.delete('/delete/:nome', async (req, res) => {
    const { nome } = req.params;
    
    try{
        await ArtistaService.deletarArtista(nome);
        res.status(200).send('Artista deletado com sucesso');
    }
    catch{
        res.status(400).send('Artista nao encontrado.');
    }
});

module.exports = router;