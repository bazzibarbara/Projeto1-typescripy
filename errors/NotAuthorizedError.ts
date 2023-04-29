/**
 * Usuário realiza uma ação proibida.
 */
class NotAuthorizedError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'NotAuthorizedError';
    }
}
  
module.exports = NotAuthorizedError;