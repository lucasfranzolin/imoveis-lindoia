import jwt from 'jsonwebtoken';

import { config } from '../../../config/config';
import { SessionExpiredError } from '../../api-errors/SessionExpiredError';
import { SessionNotFoundError } from '../../api-errors/SessionNotFoundError';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    refreshToken: string;
};

export class RefreshTokenUseCase {
    constructor(private sessionsRepository: ISessionsRepository) {}

    async execute({ refreshToken }: RequestDTO): Promise<{
        accessToken: string;
    }> {
        const session = await this.sessionsRepository.get(refreshToken);
        if (!session) throw new SessionNotFoundError();

        try {
            jwt.verify(
                session.props.refreshToken,
                config.jwt.refreshToken.secret
            );
        } catch (err) {
            await this.sessionsRepository.delete(session);
            throw new SessionExpiredError();
        }

        const accessToken = jwt.sign(
            {
                email: session.props.email,
            },
            config.jwt.accessToken.secret,
            {
                expiresIn: config.jwt.accessToken.expiresIn,
            }
        );
        return {
            accessToken,
        };
    }
}
