import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { InvalidTokenError } from '../api-errors/InvalidTokenError';
import { TokenIsMissingError } from '../api-errors/TokenIsMissingError';

export const authHeaderKey = 'authorization';

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearerToken = req.header(authHeaderKey);
    if (!bearerToken) return next(new TokenIsMissingError());

    try {
        const [, token] = bearerToken.split(' ');
        res.locals.auth = jwt.verify(token, config.jwt.accessToken.secret);
        return next();
    } catch {
        return next(new InvalidTokenError());
    }
};
