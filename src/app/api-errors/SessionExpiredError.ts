import { ApiError } from '../ApiError';
import { AccessDeniedError } from './AccessDeniedError';

export class SessionExpiredError extends AccessDeniedError {
    constructor() {
        super('Sessão expirada.');
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
