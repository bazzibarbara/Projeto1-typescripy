import { Request, Response, NextFunction } from 'express';
import InvalidParamError from '../../errors/InvalidParamError';
import NotAuthorizedError from '../../errors/NotAuthorizedError';
import TokenError from '../../errors/TokenError';
import QueryError from '../../errors/QueryError';
import { internalServerError, badRequest, forbidden, notFound } from '../../constants/statusCodes';

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  let message = error.message;
  let status = internalServerError;
  
  if (error instanceof InvalidParamError) {
    status = badRequest;
  }

  if (error instanceof NotAuthorizedError) {
    status = forbidden;
  }

  if (error instanceof TokenError) {
    status = notFound;
  }

  if (error instanceof QueryError) {
    status = badRequest;
  }

  console.log(error);
  res.status(status).json(message);
}

export default errorHandler;
