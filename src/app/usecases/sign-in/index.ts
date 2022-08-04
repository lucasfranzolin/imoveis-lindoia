import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { MongoSessionsRepository } from '../../repositories/mongo/MongoSessionsRepository';
import { SignInUseCase } from './usecase';

const realtorsRepository = new MongoRealtorsRepository();
const sessionsRepository = new MongoSessionsRepository();

const signInUseCase = new SignInUseCase(realtorsRepository, sessionsRepository);

export { signInUseCase };
