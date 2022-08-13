import { PaginationError } from './PaginationError';

export class PaginationMinLimitError extends PaginationError {
    constructor(minLimit: number) {
        super(`Valor de 'limit' deve ser no mínimo ${minLimit}.`);
    }
}
