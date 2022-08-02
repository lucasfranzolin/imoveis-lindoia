import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';
import httpStatus from 'http-status';
import path from 'path';
import { config } from '../../config/config';
import { PropertyPurposeEnum } from '../../core/enums';
import fs from 'fs';

import { getPropertyPurposesUseCase } from '../usecases/get-property-purposes';
import { getPropertyTypeByPurposeUseCase } from '../usecases/get-property-type-by-purpose';
import { savePropertyUseCase } from '../usecases/save-property';
import { storePropertyMediaUseCase } from '../usecases/store-property-media';
import { listPropertiesUseCase } from '../usecases/list-properties';
import { getPropertyMediaUseCase } from '../usecases/get-property-media';
import { findPropertyByIdUseCase } from '../usecases/find-property-by-id';
import { updatePropertyByIdUseCase } from '../usecases/update-property-by-id';

export async function save(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await savePropertyUseCase.execute(req.body);
        res.status(httpStatus.CREATED).json(result);
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
        res.status(httpStatus.OK).json(result);
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
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export async function storeMedia(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    try {
        const mb = 1024 * 1024;
        const options: formidable.Options = {
            multiples: true,
            maxFileSize: 1 * mb,
            filter: ({ mimetype }) => {
                return !!mimetype && mimetype.includes('image');
            },
        };

        const debug = false;
        if (config.env === 'development' && debug) {
            const uploadDir = path.join(__dirname, '/tmp');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            options.uploadDir = uploadDir;
            options.keepExtensions = true;
        }

        const files: any = await new Promise((resolve, reject) =>
            new formidable.IncomingForm(options).parse(
                req,
                (err, fields, files) => {
                    if (err) reject(err);
                    resolve(
                        Array.isArray(files.files)
                            ? (files.files as Array<formidable.File>)
                            : [files.files]
                    );
                }
            )
        );
        const result = await storePropertyMediaUseCase.execute({
            id,
            files,
        });
        res.status(httpStatus.CREATED).json(result);
    } catch (err) {
        next(err);
    }
}

export async function paginate(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await listPropertiesUseCase.execute(req.query as any);
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export async function getMedia(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    try {
        const result = await getPropertyMediaUseCase.execute({ id });
        res.status(httpStatus.OK).json(result);
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
        const result = await findPropertyByIdUseCase.execute({ id });
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
        const result = await updatePropertyByIdUseCase.execute({
            id,
            ...req.body,
        });
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        next(err);
    }
}
