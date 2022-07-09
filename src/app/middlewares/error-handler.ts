import type { NextFunction, Request, Response } from 'express';

import { config } from '../../config/config';
import { ApiError } from '../ApiError';

export const errorHandler = (
    apiErr: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { statusCode, message } = apiErr;
    const response: Record<string, any> = {
        code: statusCode,
        message,
    };
    if (config.env !== 'production') {
        response.stack = apiErr.stack;
    }
    res.locals.message = message;
    res.status(response.code).json(response);
};
