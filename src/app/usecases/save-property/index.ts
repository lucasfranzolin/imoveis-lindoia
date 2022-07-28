import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { MongoPropertiesRepository } from '../../repositories/mongo/MongoPropertiesRepository';
import { SavePropertyUseCase } from './usecase';

const propertiesRepository = new MongoPropertiesRepository();
const customersRepository = new MongoCustomersRepository();

const savePropertyUseCase = new SavePropertyUseCase(
    propertiesRepository,
    customersRepository
);

export { savePropertyUseCase };
