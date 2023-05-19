/**
 * Usuário realiza uma ação proibida.
 */
class PermissionError extends Error {
    constructor(string msg) {
        super(msg);
        this.name = 'PermissionError';
    }
}
  
export default PermissionError;
