import { SessionNotFoundError } from '../../api-errors/SessionNotFoundError';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    refreshToken: string;
};

export class SignOutUseCase {
    constructor(private sessionsRepository: ISessionsRepository) {}

    async execute({ refreshToken }: RequestDTO): Promise<void> {
        const session = await this.sessionsRepository.get(refreshToken);
        if (!session) throw new SessionNotFoundError();
        await this.sessionsRepository.delete(session);
    }
}
