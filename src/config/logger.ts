import * as winston from 'winston';
import { ApiError } from '../app/ApiError';

import { config } from './config';

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error || info instanceof ApiError) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

export const logger = winston.createLogger({
    level: config.env === 'dev' ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        config.env === 'dev'
            ? winston.format.colorize()
            : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});
