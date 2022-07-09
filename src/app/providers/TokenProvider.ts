import { addDays, getUnixTime, isAfter, fromUnixTime } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { sign } from 'jsonwebtoken';

import { config } from '../../config/config';
import { Realtor } from '../../core/entities/Realtor';
import { ITokenProvider } from './interfaces/ITokenProvider';

const timeZone = 'America/Sao_Paulo';

export class TokenProvider implements ITokenProvider {
    calcExpireTime(): number {
        const now = zonedTimeToUtc(new Date(), timeZone);
        const future = addDays(now, config.jwt.refreshExpiresIn);
        return getUnixTime(future);
    }

    generate(realtor: Realtor): string {
        const minutes = config.jwt.tokenExpiresIn;
        const token = sign({}, config.jwt.secret, {
            subject: realtor.id,
            expiresIn: minutes * 60,
        });
        return token;
    }

    isExpired(reference: number): boolean {
        const now = getUnixTime(zonedTimeToUtc(new Date(), timeZone));
        const dateToCompare = fromUnixTime(reference);
        return isAfter(now, dateToCompare);
    }
}
