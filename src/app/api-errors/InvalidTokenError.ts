import { AccessDeniedError } from './AccessDeniedError';

export class InvalidTokenError extends AccessDeniedError {
    constructor() {
        super('Link de verificação inválido.');
    }
}
