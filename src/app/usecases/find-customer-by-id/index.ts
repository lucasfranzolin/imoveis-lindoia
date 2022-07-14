import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { FindCustomerByIdUseCase } from './usecase';

const customersRepository = new MongoCustomersRepository();

const findCustomerByIdUseCase = new FindCustomerByIdUseCase(
    customersRepository
);

export { findCustomerByIdUseCase };
