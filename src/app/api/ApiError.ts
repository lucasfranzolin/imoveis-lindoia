import { HttpStatusClasses, HttpStatusExtra } from 'http-status';

export class ApiError extends Error {
    public statusCode;

    constructor(
        statusCode: number,
        message: string | number | HttpStatusClasses | HttpStatusExtra,
        stack: string = ''
    ) {
        super(message as string);
        this.statusCode = statusCode;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
