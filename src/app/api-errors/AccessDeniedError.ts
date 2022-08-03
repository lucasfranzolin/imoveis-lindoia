import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class AccessDeniedError extends ApiError {
    constructor(reason?: string) {
        let message = 'Acesso negado.';
        if (!!reason) message += ' ' + reason;
        super(httpStatus.UNAUTHORIZED, message);
    }
}
