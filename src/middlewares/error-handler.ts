import { Request, Response, NextFunction } from 'express';
import InvalidParamError from '../../errors/InvalidParamError.ts';
import NotAuthorizedError from '../../errors/NotAuthorizedError.ts';
import TokenError from '../../errors/TokenError.ts';
import QueryError from '../../errors/QueryError.ts';
import { JsonWebTokenError } from 'jsonwebtoken';
import statusCodes from '../../constants/statusCodes.ts';

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  let message = error.message;
  let status = statusCodes.internalServerError;

  if (error instanceof InvalidParamError) {
    status = statusCodes.badRequest;
  }

  if (error instanceof NotAuthorizedError || error instanceof JsonWebTokenError) {
    status = statusCodes.forbidden;
  }

  if (error instanceof TokenError) {
    status = statusCodes.notFound;
  }

  if (error instanceof QueryError) {
    status = statusCodes.badRequest;
  }

  console.log(error);
  res.status(status).json(message);
}

export default errorHandler;
