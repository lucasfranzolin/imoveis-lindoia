import { PasswordProvider } from '../../providers/PasswordProvider';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { SignUpRealtorUseCase } from './usecase';

const realtorsRepository = new MongoRealtorsRepository();
const passwordProvider = new PasswordProvider();

const signUpRealtorUseCase = new SignUpRealtorUseCase(
    realtorsRepository,
    passwordProvider
);

export { signUpRealtorUseCase };
