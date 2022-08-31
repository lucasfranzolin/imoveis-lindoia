import jwt from 'jsonwebtoken';

import { config } from '../../../config/config';
import { Realtor } from '../../../core/entities/Realtor';
import { RealtorStatus } from '../../../core/enums';
import { InvalidTokenError } from '../../api-errors/InvalidTokenError';
import { RealtorNotFoundError } from '../../api-errors/RealtorNotFoundError';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    confirmationToken: string;
};

export class VerifyConfirmationTokenUseCase {
    constructor(private realtorsRepository: IRealtorsRepository) {}

    async execute({ confirmationToken }: RequestDTO): Promise<void> {
        try {
            jwt.verify(confirmationToken, config.jwt.confirmationToken.secret);
        } catch {
            throw new InvalidTokenError();
        }
        const realtor = await this.realtorsRepository.findByConfirmationToken(
            confirmationToken
        );
        if (!realtor) throw new RealtorNotFoundError();

        const verifiedRealtor = new Realtor(
            {
                ...realtor.props,
                status: RealtorStatus.ACTIVE,
            },
            realtor.id
        );
        await this.realtorsRepository.update(verifiedRealtor);
    }
}
