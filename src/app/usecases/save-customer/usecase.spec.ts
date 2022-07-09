import { InMemoryCustomersRepository } from '../../../test-utils/repositories/InMemoryCustomersRepository';
import { IPhoneProvider } from '../../providers/interfaces/IPhoneProvider';
import { PhoneProvider } from '../../providers/PhoneProvider';
import { SaveCustomerUseCase } from './usecase';

describe('create-customer', () => {
    let customerRepository: InMemoryCustomersRepository;
    let phoneProvider: IPhoneProvider;
    let sut: SaveCustomerUseCase;

    beforeEach(() => {
        customerRepository = new InMemoryCustomersRepository();
        phoneProvider = new PhoneProvider();
        sut = new SaveCustomerUseCase(customerRepository, phoneProvider);
    });

    afterEach(() => {
        customerRepository.items = [];
    });
});
