import { PaginationError } from './PaginationError';

export class PaginationOrderError extends PaginationError {
    constructor([asc, desc]: [number, number]) {
        super(
            `O parametro 'order' é inválido, valores permitidos: ${asc} (ASC) ou ${desc} (DESC).`
        );
    }
}
