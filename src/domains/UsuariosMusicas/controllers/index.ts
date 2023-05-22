/* eslint-disable no-unused-vars */

import { Router, Request, Response, NextFunction } from 'express';
import { statusCodes } from '../../../../constants/statusCodes';
import { verifyJWT } from '../../../middlewares/auth-middlewares';
import { UsuarioMusicaService } from '../service/UsuarioMusicaService';
import { MusicaService } from '../../Musicas/services/MusicaService';

export const router = Router();

router.post('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await UsuarioMusicaService.adicionarUsuarioMusica(req.user.id, req.params.id);
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
            const songs = await UsuarioMusicaService.obterMusicasPorUsuario(req.params.id);
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
            const users = await UsuarioMusicaService.obterUsuariosPorMusica(req.params.id);
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
            await MusicaService.deletarMusicaPorId(req.params.id);
            res.status(statusCodes.noContent).end();
        } catch (err) {
            next(err);
        }
    }
);