import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { ApiError } from '../ApiError';

const headerKey = 'Authorization';

const unauthorize = (next: NextFunction, message: string) =>
    next(new ApiError(httpStatus.UNAUTHORIZED, message));

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearerToken = req.header(headerKey);
    if (!bearerToken) {
        return unauthorize(
            next,
            `O token não foi encontrado no '${headerKey} header' da requisição.`
        );
    }
    // const [, token] = bearerToken.split(' ');
    try {
        // verify(token, config.jwt.secret);
        return next();
    } catch {
        return unauthorize(next, 'Token inválido.');
    }
};
