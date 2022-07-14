import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { config } from '../../config/config';

import { ApiError } from '../ApiError';
import { findRealtorByIdUseCase } from '../usecases/find-realtor-by-id';

export const headerKey = 'x-change-agent';

export const changeAgent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const changeAgent = req.header(headerKey);
    if (!changeAgent) {
        next(
            new ApiError(
                httpStatus.BAD_REQUEST,
                httpStatus[httpStatus.BAD_REQUEST],
                `Missing header '${headerKey}'.`
            )
        );
    }

    if (config.env === 'production') {
        const agent = await findRealtorByIdUseCase.execute({
            realtorId: changeAgent!,
        });
        if (!agent) {
            next(
                new ApiError(
                    httpStatus.NOT_FOUND,
                    httpStatus[httpStatus.NOT_FOUND],
                    `'${headerKey}: ${changeAgent}' is not a valid realtor!`
                )
            );
        }
    }
    Object.assign(req, { changeAgent });
    return next();
};
