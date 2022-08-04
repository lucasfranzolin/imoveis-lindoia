import { AccessDeniedError } from './AccessDeniedError';

export class SessionExpiredError extends AccessDeniedError {
    constructor() {
        super('Sessão expirada.');
    }
}
