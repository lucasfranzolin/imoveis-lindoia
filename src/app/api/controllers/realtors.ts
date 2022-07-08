import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { signUpRealtorUseCase } from '../../usecases/signup-realtor';

export async function save(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { email, password } = req.body;
    try {
        await signUpRealtorUseCase.execute({ email, password });
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}
