import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { SaveCustomerUseCase } from './usecase';

const customerRepository = new MongoCustomersRepository();

const saveCustomerUseCase = new SaveCustomerUseCase(customerRepository);

export { saveCustomerUseCase };
