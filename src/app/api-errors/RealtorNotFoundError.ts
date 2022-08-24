import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class RealtorNotFoundError extends ApiError {
    constructor() {
        super(httpStatus.NOT_FOUND, 'Corretor não encontrado.');
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
