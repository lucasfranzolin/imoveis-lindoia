import { RealtorsRepository } from '../../repositories/mongo/RealtorsRepository';
import { FindRealtorByIdUseCase } from './usecase';

const realtorsRepository = new RealtorsRepository();

const findRealtorByIdUseCase = new FindRealtorByIdUseCase(realtorsRepository);

export { findRealtorByIdUseCase };
