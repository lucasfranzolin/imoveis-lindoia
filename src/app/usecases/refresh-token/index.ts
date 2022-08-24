import { SessionsRepository } from '../../repositories/mongo-http/SessionsRepository';
import { RefreshTokenUseCase } from './usecase';

const sessionsRepository = new SessionsRepository();

const refreshTokenUseCase = new RefreshTokenUseCase(sessionsRepository);

export { refreshTokenUseCase };
