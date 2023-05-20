/**
 * Usuário (client-side) informa expressões incompatíveis e/ou inválidas em relação ao sistema.
 */
class QueryError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'QueryError';
    }
}
  
module.exports = QueryError;