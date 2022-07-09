import httpStatus from 'http-status';
import { Session } from '../../../core/entities/Session';
import { ApiError } from '../../ApiError';
import { IPasswordProvider } from '../../providers/interfaces/IPasswordProvider';
import { ITokenProvider } from '../../providers/interfaces/ITokenProvider';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    email: string;
    password: string;
};

type ResponseDTO = Promise<{
    token: string;
    session: Session;
}>;

export class LoginRealtorUseCase {
    constructor(
        private realtorsRepository: IRealtorsRepository,
        private sessionsRepository: ISessionsRepository,
        private passwordProvider: IPasswordProvider,
        private tokenProvider: ITokenProvider
    ) {}

    async execute({ email, password }: RequestDTO): ResponseDTO {
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (!realtor) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                'O email não está cadastrado.'
            );
        }
        await this.passwordProvider.verify(password, realtor.props.password);
        await this.sessionsRepository.deleteAllByRealtorId(realtor.id);
        const session = Session.create({
            realtorId: realtor.id,
            expiresIn: this.tokenProvider.calcExpireTime(),
        });
        await this.sessionsRepository.save(session);
        const token = this.tokenProvider.generate(realtor);
        return { token, session };
    }
}
