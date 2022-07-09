import httpStatus from 'http-status';
import { ApiError } from '../../ApiError';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    sessionId: string;
};

type ResponseDTO = Promise<void>;

export class VerifySessionUseCase {
    constructor(private sessionsRepository: ISessionsRepository) {}

    async execute({ sessionId }: RequestDTO): ResponseDTO {
        const session = await this.sessionsRepository.findById(sessionId);
        if (!session) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Sessão não encontrada.');
        }
    }
}
