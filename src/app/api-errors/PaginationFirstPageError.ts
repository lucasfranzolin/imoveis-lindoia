import { PaginationError } from './PaginationError';

export class PaginationFirstPageError extends PaginationError {
    constructor(firstPage: number) {
        super(`A primeira página sempre será a ${firstPage}.`);
    }
}
