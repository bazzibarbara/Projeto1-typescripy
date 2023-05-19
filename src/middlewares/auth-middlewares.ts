import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { User } from '../domains/Usuarios/models/Usuario.ts';
import PermissionError from '../../errors/InvalidParamError.ts';
import statusCodes from '../../constants/statusCodes.ts';

interface DecodedToken {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

function generateJWT(user: User, res: Response): void {
  const body = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  });
}

function cookieExtractor(req: Request): string | null {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

function verifyJWT(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = cookieExtractor(req);

    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY) as DecodedToken;
      req.user = decoded.user;
    }

    if (!req.user) {
      throw new PermissionError('Você precisa estar logado para realizar essa ação!');
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function loginMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      throw new PermissionError('E-mail e/ou senha incorretos');
    } else {
      const matchingPassword = await bcrypt.compare(req.body.password, user.password);

      if (!matchingPassword) {
        throw new PermissionError('E-mail e/ou senha incorretos');
      }
    }

    generateJWT(user, res);

    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
}

function notLoggedIn(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = cookieExtractor(req);

    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY) as DecodedToken;

      if (decoded) {
        throw new PermissionError('Você já está logado no sistema!');
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}

const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      !roles.includes(req.user.role) ? res.json('Sem permissão para realizar comando') : next();
    } catch (error) {
      next(error);
    }
  };
};

export {
  loginMiddleware,
  notLoggedIn,
  verifyJWT,
  checkRole,
};
