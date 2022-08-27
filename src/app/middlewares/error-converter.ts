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
        return next(err);
    }
    const code = httpStatus.INTERNAL_SERVER_ERROR;
    const stack = err.stack || JSON.stringify(err);
    return next(new ApiError(code, httpStatus[code], stack));
};
