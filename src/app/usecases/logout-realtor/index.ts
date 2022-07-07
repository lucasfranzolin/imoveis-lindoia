import { MongoSessionsRepository } from '../../repositories/mongo/MongoSessionsRepository';
import { LogoutRealtorUseCase } from './usecase';

const sessionsRepository = new MongoSessionsRepository();

const logoutRealtorUseCase = new LogoutRealtorUseCase(sessionsRepository);

export { logoutRealtorUseCase };
