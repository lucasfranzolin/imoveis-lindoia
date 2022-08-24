import { CustomersRepository } from '../../repositories/mongo-http/CustomersRepository';
import { PropertiesRepository } from '../../repositories/mongo-http/PropertiesRepository';
import { UpdateProperyByIdUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();
const customersRepository = new CustomersRepository();

const updatePropertyByIdUseCase = new UpdateProperyByIdUseCase(
    propertiesRepository,
    customersRepository
);

export { updatePropertyByIdUseCase };
