import type { NextFunction, Request, Response } from 'express';

import { logger } from '../../config/logger';
import { ApiError } from '../ApiError';

export const errorHandler = (
    apiErr: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { statusCode, message, stack } = apiErr;
    const response: Record<string, any> = {
        code: statusCode,
        message,
    };
    logger.error(stack);
    res.statusMessage = message; // use by ../../config/morgan.ts
    res.status(response.code).json(response);
};
