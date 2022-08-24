import { ApiError } from '../ApiError';
import { AccessDeniedError } from './AccessDeniedError';

export class InvalidPasswordError extends AccessDeniedError {
    constructor() {
        super('Senha inválida.');
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
