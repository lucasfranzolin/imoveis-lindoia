import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class AccessDeniedError extends ApiError {
    constructor(reason: string) {
        super(httpStatus.UNAUTHORIZED, `Acesso negado. ${reason}`);
    }
}
