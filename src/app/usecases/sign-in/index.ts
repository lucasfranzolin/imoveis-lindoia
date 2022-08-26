import { RealtorsRepository } from '../../repositories/mongo/RealtorsRepository';
import { SessionsRepository } from '../../repositories/mongo/SessionsRepository';
import { SignInUseCase } from './usecase';

const realtorsRepository = new RealtorsRepository();
const sessionsRepository = new SessionsRepository();

const signInUseCase = new SignInUseCase(realtorsRepository, sessionsRepository);

export { signInUseCase };
