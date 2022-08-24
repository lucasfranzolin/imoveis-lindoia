import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class DeleteCustomerConflictError extends ApiError {
    constructor() {
        super(httpStatus.CONFLICT, 'Não foi possível remover o cliente.');
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
