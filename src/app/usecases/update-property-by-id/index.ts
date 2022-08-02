import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { MongoPropertiesRepository } from '../../repositories/mongo/MongoPropertiesRepository';
import { UpdateProperyByIdUseCase } from './usecase';

const propertiesRepository = new MongoPropertiesRepository();
const customersRepository = new MongoCustomersRepository();

const updatePropertyByIdUseCase = new UpdateProperyByIdUseCase(
    propertiesRepository,
    customersRepository
);

export { updatePropertyByIdUseCase };
