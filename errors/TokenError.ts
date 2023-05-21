/**
 * Token de requisição inválido.
 */
export class TokenError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'TokenError';
    }
}
  
module.exports = TokenError;