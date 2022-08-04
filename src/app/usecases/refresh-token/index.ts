import { MongoSessionsRepository } from '../../repositories/mongo/MongoSessionsRepository';
import { RefreshTokenUseCase } from './usecase';

const sessionsRepository = new MongoSessionsRepository();

const refreshTokenUseCase = new RefreshTokenUseCase(sessionsRepository);

export { refreshTokenUseCase };
