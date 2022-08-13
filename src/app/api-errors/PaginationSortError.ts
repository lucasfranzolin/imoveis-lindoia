import { PaginationError } from './PaginationError';

export class PaginationSortError extends PaginationError {
    constructor(sortBy: string) {
        super(`Não é possível ordernar por '${sortBy}'.`);
    }
}
