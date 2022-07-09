import { TokenProvider } from '../../providers/TokenProvider';
import { MongoSessionsRepository } from '../../repositories/mongo/MongoSessionsRepository';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { RefreshTokenUseCase } from './usecase';

const sessionsRepository = new MongoSessionsRepository();
const realtorsRepository = new MongoRealtorsRepository();
const tokenProvider = new TokenProvider();

const refreshTokenUseCase = new RefreshTokenUseCase(
    sessionsRepository,
    realtorsRepository,
    tokenProvider
);

export { refreshTokenUseCase };
