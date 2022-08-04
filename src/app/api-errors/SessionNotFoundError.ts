import { AccessDeniedError } from './AccessDeniedError';

export class SessionNotFoundError extends AccessDeniedError {
    constructor() {
        super('Sessão não encontrada.');
    }
}
