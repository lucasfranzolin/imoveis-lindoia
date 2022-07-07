import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

// import { getRealtorUseCase } from '../../usecases/get-realtor';
import { signUpRealtorUseCase } from '../../usecases/signup-realtor';

export async function save(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { email, password } = req.body;
    try {
        await signUpRealtorUseCase.execute({ email, password });
        res.status(httpStatus.OK);
    } catch (err) {
        next(err);
    }
}
