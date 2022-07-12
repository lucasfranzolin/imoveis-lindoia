import { PasswordProvider } from '../../providers/PasswordProvider';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { RegisterRealtorUseCase } from './usecase';
import { MailProvider } from '../../providers/MailProvider';

const realtorsRepository = new MongoRealtorsRepository();
const passwordProvider = new PasswordProvider();
const mailProvider = new MailProvider();

const registerRealtorUseCase = new RegisterRealtorUseCase(
    realtorsRepository,
    passwordProvider,
    mailProvider
);

export { registerRealtorUseCase };
