import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class RouteNotFoundError extends ApiError {
    constructor() {
        super(httpStatus.NOT_FOUND, 'Route not found.');
    }
}
