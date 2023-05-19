/**
 * Usuário (client-side) informa expressões incompatíveis e/ou inválidas em relação ao sistema.
 */
class QueryError extends Error {
    constructor(string msg) {
        super(msg);
        this.name = 'QueryError';
    }
}
  
export default QueryError;
