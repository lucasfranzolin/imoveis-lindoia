import { MongoSessionsRepository } from '../../repositories/mongo/MongoSessionsRepository';
import { VerifySessionUseCase } from './usecase';

const sessionsRepository = new MongoSessionsRepository();

const verifySessionUseCase = new VerifySessionUseCase(sessionsRepository);

export { verifySessionUseCase };
