/**
 * Usuário realiza uma ação proibida.
 */
export class PermissionError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'PermissionError';
    }
}