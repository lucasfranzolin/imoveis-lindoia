import { VerifyConfirmationTokenUseCase } from './usecase';
import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';

const realtorsRepository = new MongoRealtorsRepository();

const verifyConfirmationTokenUseCase = new VerifyConfirmationTokenUseCase(
    realtorsRepository
);

export { verifyConfirmationTokenUseCase };
