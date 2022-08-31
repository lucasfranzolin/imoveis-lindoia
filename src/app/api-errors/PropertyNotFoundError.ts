import httpStatus from 'http-status';

import { ApiError } from '../ApiError';

export class PropertyNotFoundError extends ApiError {
    constructor() {
        super(httpStatus.NOT_FOUND, 'Imóvel não encontrado.');
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
