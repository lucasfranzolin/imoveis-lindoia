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
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function save(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        await saveCustomerUseCase.execute(req.body);
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}
