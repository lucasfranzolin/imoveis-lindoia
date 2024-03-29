import { ApiError } from '../ApiError';
import { AccessDeniedError } from './AccessDeniedError';

export class TokenIsMissingError extends AccessDeniedError {
    constructor() {
        super(
            `O token não foi encontrado no 'authorization header' da requisição.`
        );
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
