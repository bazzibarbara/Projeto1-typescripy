/* eslint-disable no-undef */
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { Usuario } from '../domains/Usuarios/models/Usuario';
import { PermissionError } from '../../errors/PermissionError';
import { statusCodes } from '../../constants/statusCodes';
import { Request, Response, NextFunction } from 'express';
import { getEnv } from '../../database/index';
import { PayloadParams  } from '../domains/Usuarios/types/PayloadParam';

function generateJWT(user: PayloadParams, res: Response){
    const body = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
    };

    const token = sign({ user: body }, getEnv('SECRECT_KEY'),
        {   expiresIn: process.env.JWT_EXPIRATION });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
    });
}

function cookieExtractor(req: Request) {
    let token = null;

    if(req && req.cookies){
        token = req.cookies['jwt'];
    }

    return token;
}

export function verifyJWT(req: Request, res: Response, next: NextFunction){
    try{
        const token = cookieExtractor(req);

        if(token){
            const decoded = verify(token, getEnv('SECRECT_KEY')) as JwtPayload;
            req.user = decoded.user;
        }

        if(!req.user){
            throw new PermissionError(
                'Você precisa estar logado para realizar essa ação!');
        }
        next();
    } catch(error) {
        next(error);
    }
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const user = await Usuario.findOne({ where: {email: req.body.email}});
        if (!user) {
            throw new PermissionError('E-mail e/ou senha incorretos');
        } else {
            const matchingPassword = await compare(req.body.password, user.senha);
            
            if(!matchingPassword) {
                throw new PermissionError('E-mail e/ou senha incorretos');
            }
        }
        
        generateJWT(user, res);

        res.status(statusCodes.noContent).end();
    } catch (error) {
        next(error);
    }
}

//checagem se o usuario ja esta logado
export function notLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
  
        if (token) {
            const decoded = verify(token, getEnv('SECRECT_KEY'));
            if (decoded) {
                throw new PermissionError('Você já está logado no sistema!');
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            !roles.includes(req.user!.role) ? res.json('Você não possui permissão para realizar essa ação') : next();
        } catch(error){
            next(error);
        }
    };
};