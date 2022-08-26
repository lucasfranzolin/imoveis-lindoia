import { CustomersRepository } from '../../repositories/mongo/CustomersRepository';
import { UpdateCustomerByIdUseCase } from './usecase';

const customersRepository = new CustomersRepository();

const updateCustomerByIdUseCase = new UpdateCustomerByIdUseCase(
    customersRepository
);

export { updateCustomerByIdUseCase };
