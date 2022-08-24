import { CustomersRepository } from '../../repositories/mongo-http/CustomersRepository';
import { FindCustomerByIdUseCase } from './usecase';

const customersRepository = new CustomersRepository();

const findCustomerByIdUseCase = new FindCustomerByIdUseCase(
    customersRepository
);

export { findCustomerByIdUseCase };
