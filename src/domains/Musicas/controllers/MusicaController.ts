const express = require ('express');
const router = express.Router();
const MusicaService = require('../services/MusicaService');

router.get('/all', async (req, res) => {
    try{
        const musicas = await MusicaService.obterMusicas();
        res.status(200).send(musicas);
    }catch{
        res.status(400).json('Nao foi possivel acessar a tabela de musicas.');
    }
});

// retorna dados de uma musica pelo nome
router.get('/all/:nome', async (req,res) =>{  //obrigatoriamente precisa passar o parametro
    const { nome } = req.params;
    
    try{
        const musica = await MusicaService.obterMusicaPorNome(nome);
        res.status(200).json(musica);
    }catch{
        res.status(400).json(`Nao foi encontrada musica com o nome ${nome}.`);
    }
});

router.get('/all/:nome/artista', async (req, res) => {
    const { nome } = req.params;
    
    try{
        const artista = await MusicaService.obterArtistaPorMusica(nome);
        res.status(200).json(artista);
    }catch{
        res.status(400).json(`Nao foi encontrada musica com o nome ${nome}.`);
    }
});

// adiciona uma musica na lista
router.post('/add', async (req, res) => {
    try{
        await MusicaService.adicionarMusica(req.body);
        res.status(201).json('Nova musica criada com sucesso!');
    }catch{
        res.status(400).send('Nao foi possivel adicionar a musica.');
    }
});

// edita a quantidade de downloads de uma musica pelo nome
router.put('/edit/:nome/:foto_str', async (req, res) => {
    const { nome, foto_str } = req.params;
    
    try{
        await MusicaService.editarFoto(nome, foto_str);
        res.status(200).send(`A foto da musica ${nome} editado com sucesso.`);
    }catch{
        res.status(400).json();
    }

});

// deleta uma musica pelo nome
router.delete('/delete/:nome', async (req, res) => {
    const { nome } = req.params;
    
    try{
        await MusicaService.deletarMusica(nome);
        res.status(200).send('Musica deletada com sucesso');
    }
    catch{
        res.status(400).send('Musica nao encontrada');
    }
});

module.exports = router;
