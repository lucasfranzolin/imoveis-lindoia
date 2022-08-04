import { MongoSessionsRepository } from '../../repositories/mongo/MongoSessionsRepository';
import { SignOutUseCase } from './usecase';

const sessionsRepository = new MongoSessionsRepository();

const signOutUseCase = new SignOutUseCase(sessionsRepository);

export { signOutUseCase };
