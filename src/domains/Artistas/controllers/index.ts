import { Router, Request, Response, NextFunction } from 'express';
import { ArtistaService } from '../services/ArtistaService';
import { verifyJWT, checkRole } from'../../../middlewares/auth-middlewares';
import {userRoles } from '../../Usuarios/constants/userRoles';
import { statusCodes } from '../../../../constants/statusCodes';

export const router = Router();

router.get('/all', 
    verifyJWT,
    async(req:Request, res:Response, next:NextFunction) =>{
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
    async(req:Request, res:Response, next:NextFunction) =>{
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
    async(req:Request, res:Response, next:NextFunction) =>{
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
    async(req:Request, res:Response, next:NextFunction) => {
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
    async (req:Request, res:Response, next:NextFunction) => {
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
    async (req:Request, res:Response, next:NextFunction) => {
        try{
            await ArtistaService.deletarArtista(req.params.id);
            res.status(statusCodes.success).end();
        }
        catch(error){
            next(error);
        }
    }
);