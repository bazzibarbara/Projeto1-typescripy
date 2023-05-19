/**
 * Rota inválida acessada.
 */
class InvalidRouteError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'InvalidRouteError';
  }
}

export default InvalidRouteError;
