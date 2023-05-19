import { Router, Request, Response } from 'express';
import statusCodes from '../../../../constants/statusCodes';
import UsuarioService from '../service/UsuarioService';
import { loginMiddleware, verifyJWT, checkRole, notLoggedIn } from '../../../middlewares/auth-middlewares';

const router = Router();

router.post('/login', notLoggedIn, loginMiddleware);

router.post('/logout', verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('jwt');
    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UsuarioService.update(req.params.id, req.body, req.user);
    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req: Request, res: Response) => {
  const body = req.body;

  try {
    await UsuarioService.adicionarUsuario(body);
    return res.status(201).json('Usuario criado com sucesso');
  } catch {
    return res.status(400);
  }
});

router.get('/all', async (req: Request, res: Response) => {
  try {
    const usuarios = await UsuarioService.obterUsuarios();
    res.status(200).send(usuarios);
  } catch {
    res.status(400).json('Nao foi possivel acessar a tabela de usuarios.');
  }
});

router.get('/all/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lerUsuarioId = await UsuarioService.findByPk(id);
    res.status(200).json(lerUsuarioId);
  } catch {
    res.status(400).json(`Nao foi encontrado usuario com o id ${id}.`);
  }
});

router.put('/edit/:nome/:novoNome', async (req: Request, res: Response) => {
  const { nome, novoNome } = req.params;

  try {
    await UsuarioService.editarNome(nome, novoNome);
    res.status(200).send(`Nome do usuario ${nome} editado com sucesso.`);
  } catch {
    res.status(400).json();
  }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await UsuarioService.deletarUsuario(id);
    res.status(200).json({ message: 'Usuario deletado com sucesso' });
  } catch {
    res.status(404).send('Usuario nao encontrado');
  }
});

export default router;
