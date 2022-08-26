import { SignUpUseCase } from './usecase';
import { RealtorsRepository } from '../../repositories/mongo/RealtorsRepository';
import { MailProvider } from '../../providers/MailProvider';

const realtorsRepository = new RealtorsRepository();
const mailProvider = new MailProvider();

const signUpUseCase = new SignUpUseCase(realtorsRepository, mailProvider);

export { signUpUseCase };
