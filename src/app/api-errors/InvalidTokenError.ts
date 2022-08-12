import { AccessDeniedError } from './AccessDeniedError';

export class InvalidTokenError extends AccessDeniedError {
    constructor() {
        super('Senha inválida.');
    }
}
