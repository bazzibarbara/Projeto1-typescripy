/**
 * Usuário realiza uma ação proibida.
 */
class PermissionError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'PermissionError';
    }
}
  
module.exports = PermissionError;