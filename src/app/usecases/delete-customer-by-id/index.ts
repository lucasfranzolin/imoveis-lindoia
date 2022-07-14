import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { DeleteCustomerByIdUseCase } from './usecase';

const customersRepository = new MongoCustomersRepository();

const deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(
    customersRepository
);

export { deleteCustomerByIdUseCase };
