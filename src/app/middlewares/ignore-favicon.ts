import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const authHeaderKey = 'authorization';

export const ignoreFavicon = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(httpStatus.NO_CONTENT).end();
    }
    next();
};
