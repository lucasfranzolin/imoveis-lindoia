import httpStatus from 'http-status';

import { ApiError } from '../ApiError';

export class CustomerNotFoundError extends ApiError {
    constructor() {
        super(httpStatus.NOT_FOUND, 'Cliente não encontrado.');
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
