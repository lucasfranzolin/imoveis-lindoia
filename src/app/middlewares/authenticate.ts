import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { AccessDeniedError } from '../api-errors/AccessDeniedError';

export const authHeaderKey = 'authorization';

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (config.env === 'dev') return next();

    const bearerToken = req.header(authHeaderKey);
    if (!bearerToken) {
        return next(
            new AccessDeniedError(
                `O token não foi encontrado no '${authHeaderKey} header' da requisição.`
            )
        );
    }

    try {
        const [, token] = bearerToken.split(' ');
        res.locals.auth = jwt.verify(token, config.jwt.accessToken.secret);
        return next();
    } catch {
        return next(new AccessDeniedError('Bearer token inválido.'));
    }
};
