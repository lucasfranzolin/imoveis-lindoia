import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';

type RequestDTO = {
    refreshToken: string;
};

export class RefreshTokenUseCase {
    constructor() {}

    async execute({ refreshToken }: RequestDTO): Promise<{
        accessToken: string;
        refreshed: boolean;
    }> {
        jwt.verify(refreshToken, config.jwt.refreshToken.secret);
        const accessToken = jwt.sign(
            {}, //
            config.jwt.accessToken.secret,
            {
                expiresIn: config.jwt.accessToken.expiresIn,
            }
        );
        return {
            accessToken,
            refreshed: true,
        };
    }
}
