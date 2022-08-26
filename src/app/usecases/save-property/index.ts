import { CustomersRepository } from '../../repositories/mongo/CustomersRepository';
import { PropertiesRepository } from '../../repositories/mongo/PropertiesRepository';
import { SavePropertyUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();
const customersRepository = new CustomersRepository();

const savePropertyUseCase = new SavePropertyUseCase(
    propertiesRepository,
    customersRepository
);

export { savePropertyUseCase };
