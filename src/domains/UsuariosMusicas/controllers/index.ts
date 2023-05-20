/* eslint-disable no-unused-vars */
const router =  require('express').Router();
const statusCodes = require('../../../../constants/statusCodes');
const { verifyJWT } = require('../../../middlewares/auth-middlewares');
const UsuariosMusicasService = require('../service/UsuarioMusicaService');
const MusicaService = require('../../Musicas/services/MusicaService');

router.post('/:id',
    verifyJWT,
    async (req, res, next) => {
        try {
            await UsuariosMusicasService.adicionarUsuarioMusica(req.user.id, req.params.id);
            res.status(statusCodes.created).end();
        } catch (error) {
            next(error);
        }
    },
);

router.get('/users/:id',
    verifyJWT,
    async (req, res, next) => {
        try{
            const songs = await UsuariosMusicasService.obterMusicasPorUsuario(req.params.id);
            res.status(statusCodes.success).json(songs);
        }catch (error){
            next(error);
        }
    },
);

router.get('/songs/:id',
    verifyJWT,
    async (req, res, next) => {
        try {
            const users = await UsuariosMusicasService.ObterUsuariosPorMusica(req.params.id);
            res.status(statusCodes.success).json(users);
        } catch (error) {
            next(error);
        }
    },
);

router.delete('/songs/:id',
    verifyJWT,
    async (req, res, next) => {
        try {
            await MusicaService.delete(req.params.id);
            res.status(statusCodes.noContent).end();
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;