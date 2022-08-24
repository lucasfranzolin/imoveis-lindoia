import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class RouteNotFoundError extends ApiError {
    constructor(method: string, path: string) {
        super(httpStatus.NOT_FOUND, `Route not found: ${method} ${path}.`);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
