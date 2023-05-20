/**
 * Token de requisição inválido.
 */
class TokenError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'TokenError';
    }
}
  
module.exports = TokenError;