import { PropertiesRepository } from '../../repositories/mongo/PropertiesRepository';
import { FindPropertyByIdUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();

const findPropertyByIdUseCase = new FindPropertyByIdUseCase(
    propertiesRepository
);

export { findPropertyByIdUseCase };
