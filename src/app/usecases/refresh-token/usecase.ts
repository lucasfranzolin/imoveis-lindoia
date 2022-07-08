import { Session } from '../../../core/entities/Session';
import { ITokenProvider } from '../../providers/interfaces/ITokenProvider';
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
        private tokenProvider: ITokenProvider
    ) {}

    async execute({ sessionId }: RequestDTO): ResponseDTO {
        const currentSession = await this.sessionsRepository.findById(
            sessionId
        );
        if (!currentSession) {
            throw new Error('Sessão inválida.');
        }
        const { realtorId, expiresIn } = currentSession.props;
        const token = this.tokenProvider.generate(realtorId);
        if (this.tokenProvider.isExpired(expiresIn)) {
            const newSession = await this.sessionsRepository.refresh(
                sessionId,
                this.tokenProvider.calcExpireTime()
            );
            return {
                token,
                session: newSession!,
            };
        }
        return {
            token,
            session: currentSession,
        };
    }
}
