import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';
import { Session } from '../../../core/entities/Session';
import { AccessDeniedError } from '../../api-errors/AccessDeniedError';
import { RealtorNotFoundError } from '../../api-errors/RealtorNotFoundError';
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

        const match = await bcrypt.compare(password, realtor.props.password);
        if (!match) throw new AccessDeniedError('Senha incorreta.');

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
