import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class DeletePropertyConflictError extends ApiError {
    constructor() {
        super(httpStatus.CONFLICT, 'Não foi possível remover o imóvel.');
    }
}
