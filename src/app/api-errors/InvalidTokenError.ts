import { ApiError } from '../ApiError';
import { AccessDeniedError } from './AccessDeniedError';

export class InvalidTokenError extends AccessDeniedError {
    constructor() {
        super('Link de verificação inválido.');
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
