import { RealtorsRepository } from '../../repositories/mongo/RealtorsRepository';
import { SessionsRepository } from '../../repositories/mongo/SessionsRepository';
import { RefreshTokenUseCase } from './usecase';

const sessionsRepository = new SessionsRepository();
const realtorsRepository = new RealtorsRepository();

const refreshTokenUseCase = new RefreshTokenUseCase(
    sessionsRepository,
    realtorsRepository
);

export { refreshTokenUseCase };
