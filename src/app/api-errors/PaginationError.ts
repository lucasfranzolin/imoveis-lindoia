import httpStatus from 'http-status';

import { ApiError } from '../ApiError';

export abstract class PaginationError extends ApiError {
    constructor(reason: string) {
        super(httpStatus.BAD_REQUEST, `Erro de paginação. ${reason}`);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
