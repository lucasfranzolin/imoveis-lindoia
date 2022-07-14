import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { UpdateCustomerByIdUseCase } from './usecase';

const customersRepository = new MongoCustomersRepository();

const updateCustomerByIdUseCase = new UpdateCustomerByIdUseCase(
    customersRepository
);

export { updateCustomerByIdUseCase };
