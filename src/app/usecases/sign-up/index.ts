import { SignUpUseCase } from './usecase';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { MailProvider } from '../../providers/MailProvider';

const realtorsRepository = new MongoRealtorsRepository();
const mailProvider = new MailProvider();

const signUpUseCase = new SignUpUseCase(realtorsRepository, mailProvider);

export { signUpUseCase };
