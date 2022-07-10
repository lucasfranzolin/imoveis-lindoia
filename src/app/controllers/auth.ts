import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { loginRealtorUseCase } from '../usecases/login-realtor';
import { logoutRealtorUseCase } from '../usecases/logout-realtor';
import { refreshTokenUseCase } from '../usecases/refresh-token';
import { verifySessionUseCase } from '../usecases/verify-session';
import { registerRealtorUseCase } from '../usecases/register-realtor';

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { email, password } = req.body;
    try {
        const result = await loginRealtorUseCase.execute({ email, password });
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { sessionId } = req.body;
    try {
        const result = await refreshTokenUseCase.execute({ sessionId });
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function logout(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { sessionId } = req.body;
    try {
        await logoutRealtorUseCase.execute({ sessionId });
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}

export async function verify(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { sessionId } = req.body;
    try {
        await verifySessionUseCase.execute({ sessionId });
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { email, password } = req.body;
    try {
        await registerRealtorUseCase.execute({ email, password });
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}
