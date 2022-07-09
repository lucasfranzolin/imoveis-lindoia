import httpStatus from 'http-status';
import { ApiError } from '../../ApiError';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    sessionId: string;
};

type ResponseDTO = Promise<void>;

export class LogoutRealtorUseCase {
    constructor(private sessionsRepository: ISessionsRepository) {}

    async execute({ sessionId }: RequestDTO): ResponseDTO {
        const currentSession = await this.sessionsRepository.findById(
            sessionId
        );
        if (!currentSession) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Sessão inválida.');
        }
        await this.sessionsRepository.deleteAllByRealtorId(
            currentSession.props.realtorId
        );
    }
}
