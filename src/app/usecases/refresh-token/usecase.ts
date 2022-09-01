import jwt from 'jsonwebtoken';

import { config } from '../../../config/config';
import { RealtorNotFoundError } from '../../api-errors/RealtorNotFoundError';
import { SessionExpiredError } from '../../api-errors/SessionExpiredError';
import { SessionNotFoundError } from '../../api-errors/SessionNotFoundError';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    refreshToken: string;
};

export class RefreshTokenUseCase {
    constructor(
        private sessionsRepository: ISessionsRepository,
        private realtorsRepository: IRealtorsRepository
    ) {}

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

        const realtor = await this.realtorsRepository.findByEmail(
            session.props.email
        );
        if (!realtor) throw new RealtorNotFoundError();

        const accessToken = jwt.sign(
            {
                email: realtor.props.email,
                roles: realtor.props.roles,
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
