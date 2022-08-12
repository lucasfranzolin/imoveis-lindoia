import { AccessDeniedError } from './AccessDeniedError';

export class UnverifiedEmailError extends AccessDeniedError {
    constructor() {
        super('O endereço de email não foi verificado.');
    }
}
