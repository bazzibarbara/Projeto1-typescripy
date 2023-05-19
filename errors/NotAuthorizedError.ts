/**
 * Usuário realiza uma ação proibida.
 */
class NotAuthorizedError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'NotAuthorizedError';
  }
}

export default NotAuthorizedError;
