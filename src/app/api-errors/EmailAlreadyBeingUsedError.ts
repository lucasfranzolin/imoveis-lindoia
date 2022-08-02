import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class EmailAlreadyBeingUsedError extends ApiError {
    constructor(email: string) {
        super(httpStatus.CONFLICT, `O email '${email}' já está em uso.`);
    }
}
