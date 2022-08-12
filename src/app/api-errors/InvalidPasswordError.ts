import { AccessDeniedError } from './AccessDeniedError';

export class InvalidPasswordError extends AccessDeniedError {
    constructor() {
        super('Senha inválida.');
    }
}
