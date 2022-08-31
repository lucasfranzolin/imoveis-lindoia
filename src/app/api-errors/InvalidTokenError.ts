import { ApiError } from '../ApiError';
import { AccessDeniedError } from './AccessDeniedError';

export class InvalidTokenError extends AccessDeniedError {
    constructor() {
        super('Token inválido.');
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
