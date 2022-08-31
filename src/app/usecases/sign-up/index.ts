import { MailProvider } from '../../providers/MailProvider';
import { RealtorsRepository } from '../../repositories/mongo/RealtorsRepository';
import { SignUpUseCase } from './usecase';

const realtorsRepository = new RealtorsRepository();
const mailProvider = new MailProvider();

const signUpUseCase = new SignUpUseCase(realtorsRepository, mailProvider);

export { signUpUseCase };
