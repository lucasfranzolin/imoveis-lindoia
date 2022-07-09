import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { SaveCustomerUseCase } from './usecase';
import { PhoneProvider } from '../../providers/PhoneProvider';

const customerRepository = new MongoCustomersRepository();
const phoneProvider = new PhoneProvider();

const saveCustomerUseCase = new SaveCustomerUseCase(
    customerRepository,
    phoneProvider
);

export { saveCustomerUseCase };
