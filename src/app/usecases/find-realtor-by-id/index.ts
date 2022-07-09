import { MongoRealtorsRepository } from '../../repositories/mongo/MongoRealtorsRepository';
import { FindRealtorByIdUseCase } from './usecase';

const realtorsRepository = new MongoRealtorsRepository();

const findRealtorByIdUseCase = new FindRealtorByIdUseCase(realtorsRepository);

export { findRealtorByIdUseCase };
