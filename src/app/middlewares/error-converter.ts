import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { ApiError } from '../ApiError';

export const errorConverter = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        next(err);
    }
    const { statusCode, message, stack } = err;
    const code = statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
    const msg = message ?? httpStatus[code];
    next(new ApiError(code, msg, stack));
};
