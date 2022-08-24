import { SessionsRepository } from '../../repositories/mongo-http/SessionsRepository';
import { SignOutUseCase } from './usecase';

const sessionsRepository = new SessionsRepository();

const signOutUseCase = new SignOutUseCase(sessionsRepository);

export { signOutUseCase };
