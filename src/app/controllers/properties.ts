import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { PropertyPurposeEnum } from '../../core/enums';

import { getPropertyPurposesUseCase } from '../usecases/get-property-purposes';
import { getPropertyTypeByPurposeUseCase } from '../usecases/get-property-type-by-purpose';

export async function save(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        // await savePropertyUseCase.execute(req.body);
        console.log(req.body);
        res.status(httpStatus.CREATED).send();
    } catch (err) {
        next(err);
    }
}

export async function getPurposes(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await getPropertyPurposesUseCase.execute();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getTypesByPurpose(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { purpose } = req.params;
    try {
        const result = await getPropertyTypeByPurposeUseCase.execute({
            purpose: purpose as PropertyPurposeEnum,
        });
        res.json(result);
    } catch (err) {
        next(err);
    }
}
