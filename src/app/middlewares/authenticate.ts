import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { AccessDeniedError } from '../api-errors/AccessDeniedError';
import { findRealtorByIdUseCase } from '../usecases/find-realtor-by-id';

export const headerKey = 'authorization';

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (config.env === 'development') return next();

    const bearerToken = req.header(headerKey);
    if (!bearerToken) {
        return next(
            new AccessDeniedError(
                `O token não foi encontrado no '${headerKey} header' da requisição.`
            )
        );
    }

    try {
        const [, token] = bearerToken.split(' ');
        jwt.verify(token, config.jwt.accessToken.secret);
        return next();
    } catch {
        return next(new AccessDeniedError('Bearer token inválido.'));
    }
};
