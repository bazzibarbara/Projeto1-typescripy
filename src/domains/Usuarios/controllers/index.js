/* eslint-disable no-unused-vars */
const router =  require('express').Router();
const statusCodes = require('../../../../constants/statusCodes');
const UsuarioService = require('../service/UsuarioService');
const {loginMiddleware, verifyJWT, checkRole, notLoggedIn} = require('../../../middlewares/auth-middlewares.js');
const userRoles = require('../constants/userRoles');

router.post('/login', notLoggedIn, loginMiddleware);

router.post('/logout', 
    verifyJWT,
    async (req, res, next) => {
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
    async(req,res, next) => {
        try{
            await UsuarioService.update(req.params.id, req.body, req.user);
            res.status(statusCodes.noContent).end();
        }   catch (error) {
            next(error);
        }
    },
);

//cria usuario(C do CRUD)
router.post('/add',
    async(req,res, next) => {
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
    async (req,res, next) => {
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
    async (req,res, next) => {
        const { id } = req.params;
        try{
            const lerUsuarioId = await UsuarioService.findByPk(id);
            res.status(statusCodes.success).json(lerUsuarioId);
        }catch(error) {
            next(error);
        }
    }
);

//atualiza um usuario (U do crud)
router.put('/edit/:nome/:novoNome',
    verifyJWT,
    async (req,res, next) =>{
        const { nome, novoNome } = req.params;
        
        try{
            await UsuarioService.editarNome(nome, novoNome);
            res.status(statusCodes.success).send(`Nome do usuario ${nome} editado com sucesso.`);
        }catch(error) {
            next(error);
        }
    }
);


//deleta um usuario pelo nome (D do crud)
router.delete('/delete/:id',
    verifyJWT,
    checkRole([userRoles.admin]),
    async(req,res, next) =>{
        const { id } = req.params;
        try{
            await UsuarioService.deletarUsuario(id);
            res.status(statusCodes.noContent).json({message: 'Usuario deletado com sucesso'});
        } catch(error) {
            next(error);
        }
    }
);

module.exports = router;