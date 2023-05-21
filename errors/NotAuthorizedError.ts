/**
 * Usuário realiza uma ação proibida.
 */
export class NotAuthorizedError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'NotAuthorizedError';
    }
}