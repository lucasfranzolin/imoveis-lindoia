import { MongoPropertiesRepository } from '../../repositories/mongo/MongoPropertiesRepository';
import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { DeleteCustomerByIdUseCase } from './usecase';

const customersRepository = new MongoCustomersRepository();
const propertiesRepository = new MongoPropertiesRepository();

const deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(
    customersRepository,
    propertiesRepository
);

export { deleteCustomerByIdUseCase };
