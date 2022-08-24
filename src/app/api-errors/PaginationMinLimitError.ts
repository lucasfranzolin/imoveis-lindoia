import { ApiError } from '../ApiError';
import { PaginationError } from './PaginationError';

export class PaginationMinLimitError extends PaginationError {
    constructor(minLimit: number) {
        super(`Valor de 'limit' deve ser no mínimo ${minLimit}.`);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
