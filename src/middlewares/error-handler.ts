/* eslint-disable no-unused-vars */
import { InvalidParamError } from '../../errors/InvalidParamError';
import { NotAuthorizedError } from '../../errors/NotAuthorizedError';
import { TokenError } from '../../errors/TokenError';
import { QueryError } from '../../errors/QueryError';
import { JsonWebTokenError } from 'jsonwebtoken';
import { statusCodes } from '../../constants/statusCodes';
import { Request, Response, NextFunction } from 'express'

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction){
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