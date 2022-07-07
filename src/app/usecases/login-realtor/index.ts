import { PasswordProvider } from '../../providers/PasswordProvider';
import { TokenProvider } from '../../providers/TokenProvider';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { MongoSessionsRepository } from '../../repositories/mongo/MongoSessionsRepository';
import { LoginRealtorUseCase } from './usecase';

const realtorsRepository = new MongoRealtorsRepository();
const sessionsRepository = new MongoSessionsRepository();
const passwordProvider = new PasswordProvider();
const tokenProvider = new TokenProvider();

const loginRealtorUseCase = new LoginRealtorUseCase(
    realtorsRepository,
    sessionsRepository,
    passwordProvider,
    tokenProvider
);

export { loginRealtorUseCase };
