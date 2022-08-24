import { CustomersRepository } from '../../repositories/mongo-http/CustomersRepository';
import { SaveCustomerUseCase } from './usecase';

const customerRepository = new CustomersRepository();

const saveCustomerUseCase = new SaveCustomerUseCase(customerRepository);

export { saveCustomerUseCase };
