import httpStatus from 'http-status';
import { ApiError } from '../ApiError';

export class PropertyOwnerNotFoundError extends ApiError {
    constructor() {
        super(
            httpStatus.NOT_FOUND,
            'O proprietário do imóvel não foi encontrado.'
        );
    }
}
