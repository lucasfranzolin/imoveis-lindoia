import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { signInRealtorUseCase } from '../usecases/signin-realtor';
import { refreshTokenUseCase } from '../usecases/refresh-token';
import { signUpRealtorUseCase } from '../usecases/signup-realtor';
import { config } from '../../config/config';
import { AccessDeniedError } from '../api-errors/AccessDeniedError';

export async function signup(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await signUpRealtorUseCase.execute(req.body);
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export async function signin(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { refreshToken, ...rest } = await signInRealtorUseCase.execute(
            req.body
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: config.jwt.refreshToken.expiresIn * 1000,
        });

        res.status(httpStatus.OK).json(rest);
    } catch (err) {
        next(err);
    }
}

export async function refresh(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            throw new AccessDeniedError(
                `O 'refreshToken' não foi encontrado nos cookies da requisição.`
            );

        const result = await refreshTokenUseCase.execute({
            refreshToken,
        });
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}
