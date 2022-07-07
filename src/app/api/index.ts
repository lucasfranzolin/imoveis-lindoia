import { Server } from 'http';

import { config } from '../../config/config';
import { logger } from '../../config/logger';
import { mongo } from '../../config/mongo';
import { app } from './app';

let server: Server;

mongo.connect(config.mongo.url).then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
        logger.info(`Server is listening on port ${config.port}`);
    });
});

const exitHandler = () => {
    if (server) {
        mongo.disconnect();
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const uncaughtException = (error: any) => {
    logger.error('Uncaught exception: ' + error);
    exitHandler();
};

const unhandledRejection = (error: any) => {
    logger.error('Unhandled rejection: ' + error);
    exitHandler();
};

process.on('uncaughtException', uncaughtException);
process.on('unhandledRejection', unhandledRejection);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        mongo.disconnect();
        server.close();
    }
});
