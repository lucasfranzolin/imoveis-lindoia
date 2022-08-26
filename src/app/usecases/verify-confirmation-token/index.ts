import { VerifyConfirmationTokenUseCase } from './usecase';
import { RealtorsRepository } from '../../repositories/mongo/RealtorsRepository';

const realtorsRepository = new RealtorsRepository();

const verifyConfirmationTokenUseCase = new VerifyConfirmationTokenUseCase(
    realtorsRepository
);

export { verifyConfirmationTokenUseCase };
