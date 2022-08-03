import { SignUpRealtorUseCase } from './usecase';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';

const realtorsRepository = new MongoRealtorsRepository();

const signUpRealtorUseCase = new SignUpRealtorUseCase(realtorsRepository);

export { signUpRealtorUseCase };
