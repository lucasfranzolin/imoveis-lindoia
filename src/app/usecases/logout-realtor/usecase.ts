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
            throw new Error('Sessão inválida.');
        }
        await this.sessionsRepository.deleteById(sessionId);
    }
}
