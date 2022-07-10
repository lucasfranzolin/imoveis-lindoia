import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';

import { config } from '../config/config';
import { morgan } from '../config/morgan';
import { ApiError } from './ApiError';
import { errorConverter } from './middlewares/error-converter';
import { errorHandler } from './middlewares/error-handler';
import { router } from './router';

const app: Application = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use(router);
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Route not found.'));
});

app.use(errorConverter);
app.use(errorHandler);

export { app };
