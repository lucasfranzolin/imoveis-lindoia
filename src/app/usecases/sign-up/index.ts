import { SignUpUseCase } from './usecase';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';

const realtorsRepository = new MongoRealtorsRepository();

const signUpUseCase = new SignUpUseCase(realtorsRepository);

export { signUpUseCase };
