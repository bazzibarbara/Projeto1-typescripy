/* eslint-disable no-unused-vars */
const InvalidParamError = require('../../errors/InvalidParamError');
const NotAuthorizedError = require('../../errors/NotAuthorizedError.ts');
const TokenError = require('../../errors/TokenError');
const QueryError = require('../../errors/QueryError');
const statusCodes = require('../../constants/statusCodes.ts');

function errorHandler(error, req, res, next){
    let message = error.message;
    let status = statusCodes.internalServerError;
  
    if (error instanceof InvalidParamError) {
        status = statusCodes.badRequest;
    }

    if (error instanceof NotAuthorizedError) {
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

module.exports = errorHandler;