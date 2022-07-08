import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { CreateCustomerUseCase } from './usecase';
import { PhoneProvider } from '../../providers/PhoneProvider';

const customerRepository = new MongoCustomersRepository();
const phoneProvider = new PhoneProvider();

const createCustomerUseCase = new CreateCustomerUseCase(
    customerRepository,
    phoneProvider
);

export { createCustomerUseCase };
