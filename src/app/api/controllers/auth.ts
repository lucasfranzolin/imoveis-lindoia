import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { loginRealtorUseCase } from '../../usecases/login-realtor';
import { logoutRealtorUseCase } from '../../usecases/logout-realtor';
import { refreshTokenUseCase } from '../../usecases/refresh-token';

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
