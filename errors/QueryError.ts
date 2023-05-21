/**
 * Usuário (client-side) informa expressões incompatíveis e/ou inválidas em relação ao sistema.
 */
export class QueryError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'QueryError';
    }
}
  
module.exports = QueryError;