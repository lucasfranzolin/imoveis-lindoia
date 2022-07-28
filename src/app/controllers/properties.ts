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
import { ApiError } from '../ApiError';
import { PropertyMediaMetadata } from '../../core/types';

export async function save(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await savePropertyUseCase.execute(req.body);
        res.json(result);
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

        const formData: any = await new Promise((resolve, reject) =>
            new formidable.IncomingForm(options).parse(
                req,
                (err, fields, files) => {
                    if (err) reject(err);
                    const metadataList = JSON.parse(fields.metadata as string);
                    resolve({
                        files: Array.isArray(files.files)
                            ? (files.files as Array<formidable.File>)
                            : [files.files],
                        metadataList,
                    });
                }
            )
        );
        const result = await storePropertyMediaUseCase.execute({
            id,
            ...formData,
        });
        res.json(result);
    } catch (err) {
        next(err);
    }
}
