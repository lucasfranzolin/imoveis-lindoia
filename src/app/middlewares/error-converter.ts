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
    const { status, data } = err.response;
    const code = status
        ? status
        : err.statusCode
        ? err.statusCode
        : httpStatus.INTERNAL_SERVER_ERROR;
    const msg = data
        ? JSON.stringify(data)
        : err.message
        ? err.message
        : httpStatus[code];
    next(new ApiError(code, msg, err.stack));
};
