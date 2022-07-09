import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import _morgan, { token } from 'morgan';

import { config } from './config';
import { logger } from './logger';

token('message', (req, res) => res.locals.message || '');
token('date', (req, res, tz) =>
    format(zonedTimeToUtc(new Date(), tz as string), 'yyyy-MM-dd HH:mm:ss')
);

const getIpFormat = () =>
    config.env === 'production'
        ? '[:date[America/Sao_Paulo]] addr=:remote-addr '
        : '';

const successResponseFormat = `${getIpFormat()}method=:method url=:url status=:status ms=:response-time`;
const errorResponseFormat = `${getIpFormat()}${successResponseFormat} msg=:message`;

const successHandler = _morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: {
        write: (message) => logger.info(message.trim()),
    },
});

const errorHandler = _morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: {
        write: (message) => logger.error(message.trim()),
    },
});

export const morgan = {
    successHandler,
    errorHandler,
};
