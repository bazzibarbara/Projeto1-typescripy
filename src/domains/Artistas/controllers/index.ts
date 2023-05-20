const router = require('express').Router();
const ArtistaService = require('../services/ArtistaService');
const {verifyJWT, checkRole } = require('../../../middlewares/auth-middlewares.js');
const statusCodes = require('../../../../constants/statusCodes.js');
const userRoles = require('../../Usuarios/constants/userRoles');

router.get('/all', 
    verifyJWT,
    async(req,res, next) =>{
        try {
            const artistas = await ArtistaService.obterArtistas();
            res.status(statusCodes.success).send(artistas);
        } catch(error) {
            next(error);
        }
    },
);

router.get('/all/:nome', 
    verifyJWT,
    async(req, res, next) =>{
        const { nome } = req.params;
        try{
            const artista = await ArtistaService.obterArtistaPorNome(nome);
            res.status(statusCodes.success).send(artista);
        }catch(error){
            next(error);
        }
    },
);

router.get('/all/:nome/musicas',
    verifyJWT,
    async(req, res, next) =>{
        const { nome } = req.params;

        try{
            const musica = await ArtistaService.obterMusicasPorArtista(nome);
            res.status(statusCodes.success).send(musica);
        }catch(error) {
            next(error);
        }
    }
);

router.post('/add',
    verifyJWT,
    async(req, res, next) => {
        const body = req.body;
        try {
            await ArtistaService.adicionarArtista(body);
            return res.status(statusCodes.created).json('Artista criado com sucesso');
        } catch(error){
            next(error);
        }
    },
);

router.put('/:id',
    verifyJWT,
    checkRole([userRoles.admin]),
    async (req, res, next) => {
        try{
            await ArtistaService.editarArtista(req.params.id, req.body);
            res.status(statusCodes.success).end();
        }catch(error){
            next(error);
        }
    }
);

router.delete('/delete/:id',
    verifyJWT,
    checkRole([userRoles.admin]),
    async (req, res, next) => {
        try{
            await ArtistaService.deletarArtista(req.params.id);
            res.status(statusCodes.success).end();
        }
        catch(error){
            next(error);
        }
    }
);

module.exports = router;