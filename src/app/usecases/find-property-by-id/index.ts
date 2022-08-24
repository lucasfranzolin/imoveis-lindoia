import { PropertiesRepository } from '../../repositories/mongo-http/PropertiesRepository';
import { FindPropertyByIdUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();

const findPropertyByIdUseCase = new FindPropertyByIdUseCase(
    propertiesRepository
);

export { findPropertyByIdUseCase };
