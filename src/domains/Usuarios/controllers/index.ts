/* eslint-disable no-unused-vars */
import { Router, Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../service/UsuarioService';
import { loginMiddleware, verifyJWT, checkRole, notLoggedIn } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../constants/userRoles';
import { statusCodes } from '../../../../constants/statusCodes';

export const router = Router();

router.post('/login', notLoggedIn, loginMiddleware);

router.post('/logout', 
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('jwt');
            res.status(statusCodes.noContent).end();
        } catch (error) {
            next(error);
        }
    },
);

router.put('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            await UsuarioService.update(req.params.id!, req.body, req.user!);
            res.status(statusCodes.noContent).end();
        }   catch (error) {
            next(error);
        }
    },
);

//cria usuario(C do CRUD)
router.post('/add',
    async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;

        try {
            await UsuarioService.adicionarUsuario(body);
            return res.status(statusCodes.created).json('Usuario criado com sucesso');
        } catch(error) {
            next(error);
        }
    }
);

//modulo read todos os usuarios (R DO CRUD)
router.get('/all', 
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            const usuarios = await UsuarioService.obterUsuarios();
            res.status(statusCodes.success).send(usuarios);
        }catch(error) {
            next(error);
        }
    }
);

//modulo read pelo id do usuario 
router.get('/all/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try{
            const lerUsuarioId = await UsuarioService.obterUsuarioPorId(id);
            res.status(statusCodes.success).json(lerUsuarioId);
        }catch(error) {
            next(error);
        }
    }
);

//atualiza um usuario (U do crud)
router.put('/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        const { nome, novoNome } = req.params;
        
        try{
            await UsuarioService.update(req.params.id!, req.body, req.user!);
            res.status(statusCodes.success).send(`Nome do usuario ${nome} editado com sucesso.`);
        }catch(error) {
            next(error);
        }
    }
);


//deleta um usuario pelo nome (ID do crud)
router.delete(':id',
    verifyJWT,
    checkRole([userRoles.admin]),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try{
            await UsuarioService.delete(req.params.id!, req.user!.id);
            res.status(statusCodes.noContent).json({message: 'Usuario deletado com sucesso'});
        } catch(error) {
            next(error);
        }
    }
);

module.exports = router;