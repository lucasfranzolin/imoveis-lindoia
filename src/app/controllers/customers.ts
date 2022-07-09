import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { listCustomersUseCase } from '../usecases/list-customers';
import { saveCustomerUseCase } from '../usecases/save-customer';

export async function paginate(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await listCustomersUseCase.execute(req.query as any);
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export async function save(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { email, fullName, phone } = req.body;
    try {
        await saveCustomerUseCase.execute({ email, fullName, phone });
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}
