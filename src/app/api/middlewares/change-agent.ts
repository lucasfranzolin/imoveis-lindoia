import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { logger } from '../../../config/logger';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { ApiError } from '../ApiError';

export const headerKey = 'x-change-agent';

export const changeAgent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const changeAgent = req.header(headerKey);
    if (!changeAgent) {
        return next(
            new ApiError(
                httpStatus.BAD_REQUEST,
                httpStatus[httpStatus.BAD_REQUEST],
                `Missing header '${headerKey}'.`
            )
        );
    }

    logger.info(`${headerKey}=${changeAgent}`);

    if (process.env.NODE_ENV === 'production') {
        const mongoRealtorsRepository = new MongoRealtorsRepository();
        const agent = await mongoRealtorsRepository.findById(changeAgent);
        if (!agent) {
            return next(
                new ApiError(
                    httpStatus.NOT_FOUND,
                    httpStatus[httpStatus.NOT_FOUND],
                    `'${headerKey}' is not valid!`
                )
            );
        }
    }

    Object.assign(req, { changeAgent });
    return next();
};
