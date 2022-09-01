import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { config } from '../../config/config';
import { refreshTokenUseCase } from '../usecases/refresh-token';
import { signInUseCase } from '../usecases/sign-in';
import { signOutUseCase } from '../usecases/sign-out';
import { signUpUseCase } from '../usecases/sign-up';
import { verifyConfirmationTokenUseCase } from '../usecases/verify-confirmation-token';

export async function signUp(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        await signUpUseCase.execute(req.body);
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}

export async function signIn(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await signInUseCase.execute(req.body);
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export async function signOut(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        await signOutUseCase.execute(req.body);
        res.status(httpStatus.NO_CONTENT).send();
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
        const result = await refreshTokenUseCase.execute(req.body);
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export async function session(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { auth } = res.locals;
        res.status(httpStatus.OK).json(auth);
    } catch (err) {
        next(err);
    }
}

export async function verify(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { confirmationToken } = req.params;
        await verifyConfirmationTokenUseCase.execute({ confirmationToken });
        res.status(httpStatus.FOUND).redirect(config.signInPageUrl);
    } catch (err) {
        next(err);
    }
}
