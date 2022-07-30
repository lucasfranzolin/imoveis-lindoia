import { MongoPropertiesRepository } from '../../repositories/mongo/MongoPropertiesRepository';
import { FindPropertyByIdUseCase } from './usecase';

const propertiesRepository = new MongoPropertiesRepository();

const findPropertyByIdUseCase = new FindPropertyByIdUseCase(
    propertiesRepository
);

export { findPropertyByIdUseCase };
