/**
 * Token de requisição inválido.
 */
class TokenError extends Error {
    constructor(string msg) {
        super(msg);
        this.name = 'TokenError';
    }
}
  
export default TokenError;
