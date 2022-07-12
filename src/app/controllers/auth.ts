import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { registerRealtorUseCase } from '../usecases/register-realtor';

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        await registerRealtorUseCase.execute(req.body);
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}
