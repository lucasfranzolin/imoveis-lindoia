/* eslint-disable no-unused-vars */
import { Request } from 'express';
import { ServerResponse } from 'http';

declare module 'http' {
    export interface ServerResponse {
        locals: {
            message?: string;
        };
    }
}

declare module 'express' {
    export interface Request {
        changeAgent?: string;
    }
}
