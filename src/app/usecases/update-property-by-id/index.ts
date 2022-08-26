import { CustomersRepository } from '../../repositories/mongo/CustomersRepository';
import { PropertiesRepository } from '../../repositories/mongo/PropertiesRepository';
import { UpdateProperyByIdUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();
const customersRepository = new CustomersRepository();

const updatePropertyByIdUseCase = new UpdateProperyByIdUseCase(
    propertiesRepository,
    customersRepository
);

export { updatePropertyByIdUseCase };
