import { TokenProvider } from '../../providers/TokenProvider';
import { MongoSessionsRepository } from '../../repositories/mongo/MongoSessionsRepository';
import { RefreshTokenUseCase } from './usecase';

const sessionsRepository = new MongoSessionsRepository();
const tokenProvider = new TokenProvider();

const refreshTokenUseCase = new RefreshTokenUseCase(
    sessionsRepository,
    tokenProvider
);

export { refreshTokenUseCase };
