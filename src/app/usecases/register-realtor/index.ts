import { PasswordProvider } from '../../providers/PasswordProvider';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { RegisterRealtorUseCase } from './usecase';

const realtorsRepository = new MongoRealtorsRepository();
const passwordProvider = new PasswordProvider();

const registerRealtorUseCase = new RegisterRealtorUseCase(
    realtorsRepository,
    passwordProvider
);

export { registerRealtorUseCase };
