/**
 * Rota inválida acessada.
 */
class InvalidRouteError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'InvalidRouteError';
    }
}
  
module.exports = InvalidRouteError;