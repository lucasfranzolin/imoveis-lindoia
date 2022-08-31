import { RealtorsRepository } from '../../repositories/mongo/RealtorsRepository';
import { VerifyConfirmationTokenUseCase } from './usecase';

const realtorsRepository = new RealtorsRepository();

const verifyConfirmationTokenUseCase = new VerifyConfirmationTokenUseCase(
    realtorsRepository
);

export { verifyConfirmationTokenUseCase };
