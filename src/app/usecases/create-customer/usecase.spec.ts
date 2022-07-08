import { InMemoryCustomersRepository } from '../../../test-utils/repositories/InMemoryCustomersRepository';
import { IPhoneProvider } from '../../providers/interfaces/IPhoneProvider';
import { PhoneProvider } from '../../providers/PhoneProvider';
import { CreateCustomerUseCase } from './usecase';

describe('create-customer', () => {
    let customerRepository: InMemoryCustomersRepository;
    let phoneProvider: IPhoneProvider;
    let sut: CreateCustomerUseCase;

    beforeEach(() => {
        customerRepository = new InMemoryCustomersRepository();
        phoneProvider = new PhoneProvider();
        sut = new CreateCustomerUseCase(customerRepository, phoneProvider);
    });

    afterEach(() => {
        customerRepository.items = [];
    });
});
