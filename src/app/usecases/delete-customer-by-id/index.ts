import { PropertiesRepository } from '../../repositories/mongo/PropertiesRepository';
import { CustomersRepository } from '../../repositories/mongo/CustomersRepository';
import { DeleteCustomerByIdUseCase } from './usecase';

const customersRepository = new CustomersRepository();
const propertiesRepository = new PropertiesRepository();

const deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(
    customersRepository,
    propertiesRepository
);

export { deleteCustomerByIdUseCase };
