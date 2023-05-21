/* eslint-disable no-unused-vars */

import { Router, Request, Response, NextFunction } from 'express';
import {statusCodes} from '../../../../constants/statusCodes';
import { verifyJWT } from '../../../middlewares/auth-middlewares';
import {UsuariosMusicasService } from '../service/UsuarioMusicaService';
import { MusicaService } from '../../Musicas/services/MusicaService';

export const router = Router();

router.post('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
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
    async (req: Request, res: Response, next: NextFunction) => {
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
    async (req: Request, res: Response, next: NextFunction) => {
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
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await MusicaService.delete(req.params.id);
            res.status(statusCodes.noContent).end();
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;