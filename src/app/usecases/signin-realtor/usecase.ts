import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';
import { AccessDeniedError } from '../../api-errors/AccessDeniedError';
import { RealtorNotFoundError } from '../../api-errors/RealtorNotFoundError';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    email: string;
    password: string;
};

export class SignInRealtorUseCase {
    constructor(private realtorsRepository: IRealtorsRepository) {}

    async execute({ email, password }: RequestDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        permissions: Array<number>;
        refreshed: boolean;
    }> {
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (!realtor) throw new RealtorNotFoundError();

        const match = await bcrypt.compare(password, realtor.props.password);
        if (!match) throw new AccessDeniedError('Senha incorreta.');

        const accessToken = jwt.sign(
            {}, //
            config.jwt.accessToken.secret,
            {
                expiresIn: config.jwt.accessToken.expiresIn,
            }
        );

        const refreshToken = jwt.sign(
            {}, //
            config.jwt.refreshToken.secret,
            {
                expiresIn: config.jwt.refreshToken.expiresIn,
            }
        );

        return {
            accessToken,
            refreshToken,
            permissions: [],
            refreshed: false,
        };
    }
}
