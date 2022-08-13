import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class RouteNotFoundError extends ApiError {
    constructor(path: string) {
        super(httpStatus.NOT_FOUND, `Route '${path}' was not found.`);
    }
}
