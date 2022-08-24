import { VerifyConfirmationTokenUseCase } from './usecase';
import { RealtorsRepository } from '../../repositories/mongo-http/RealtorsRepository';

const realtorsRepository = new RealtorsRepository();

const verifyConfirmationTokenUseCase = new VerifyConfirmationTokenUseCase(
    realtorsRepository
);

export { verifyConfirmationTokenUseCase };
