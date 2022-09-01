import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../../../config/config';
import { Session } from '../../../core/entities/Session';
import { RealtorStatus } from '../../../core/enums';
import { InvalidPasswordError } from '../../api-errors/InvalidPasswordError';
import { RealtorNotFoundError } from '../../api-errors/RealtorNotFoundError';
import { UnverifiedEmailError } from '../../api-errors/UnverifiedEmailError';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    email: string;
    password: string;
};

export class SignInUseCase {
    constructor(
        private realtorsRepository: IRealtorsRepository,
        private sessionsRepository: ISessionsRepository
    ) {}

    async execute({ email, password }: RequestDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (!realtor) throw new RealtorNotFoundError();

        const isPending = realtor.props.status === RealtorStatus.PENDING;
        if (isPending) throw new UnverifiedEmailError();

        const match = await bcrypt.compare(password, realtor.props.password);
        if (!match) throw new InvalidPasswordError();

        const refreshToken = jwt.sign(
            {}, //
            config.jwt.refreshToken.secret,
            {
                expiresIn: config.jwt.refreshToken.expiresIn,
            }
        );

        const newSession = Session.create({
            email: realtor.props.email,
            refreshToken,
        });
        await this.sessionsRepository.save(newSession);

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
            refreshToken,
        };
    }
}
