import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { deleteCustomerByIdUseCase } from '../usecases/delete-customer-by-id';
import { findCustomerByIdUseCase } from '../usecases/find-customer-by-id';
import { listCustomersUseCase } from '../usecases/list-customers';
import { saveCustomerUseCase } from '../usecases/save-customer';
import { updateCustomerByIdUseCase } from '../usecases/update-customer-by-id';

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
    try {
        const result = await saveCustomerUseCase.execute(req.body);
        res.status(httpStatus.CREATED).json(result);
    } catch (err) {
        next(err);
    }
}

export async function get(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    try {
        const result = await findCustomerByIdUseCase.execute({ id });
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export async function update(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    try {
        const result = await updateCustomerByIdUseCase.execute({
            id,
            ...req.body,
        });
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export async function _delete(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    try {
        await deleteCustomerByIdUseCase.execute({ id });
        res.status(httpStatus.OK).send();
    } catch (err) {
        next(err);
    }
}
