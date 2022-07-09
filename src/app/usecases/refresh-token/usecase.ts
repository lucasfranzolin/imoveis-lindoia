import httpStatus from 'http-status';
import { Session } from '../../../core/entities/Session';
import { ApiError } from '../../ApiError';
import { ITokenProvider } from '../../providers/interfaces/ITokenProvider';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    sessionId: string;
};

type ResponseDTO = Promise<{
    token: string;
    session: Session;
}>;

export class RefreshTokenUseCase {
    constructor(
        private sessionsRepository: ISessionsRepository,
        private realtorsRepository: IRealtorsRepository,
        private tokenProvider: ITokenProvider
    ) {}

    async execute({ sessionId }: RequestDTO): ResponseDTO {
        const currentSession = await this.sessionsRepository.findById(
            sessionId
        );
        if (!currentSession) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Sessão inválida.');
        }
        const realtor = await this.realtorsRepository.findById(
            currentSession.props.realtorId
        );
        if (!realtor) {
            throw new ApiError(httpStatus.NOT_FOUND, 'O corretor não existe.');
        }
        const token = this.tokenProvider.generate(realtor);
        if (this.tokenProvider.isExpired(currentSession.props.expiresIn)) {
            const newSession = Session.create(
                {
                    ...currentSession.props,
                    expiresIn: this.tokenProvider.calcExpireTime(),
                },
                sessionId
            );
            await this.sessionsRepository.update(newSession);
            return {
                token,
                session: newSession,
            };
        }
        return {
            token,
            session: currentSession,
        };
    }
}
