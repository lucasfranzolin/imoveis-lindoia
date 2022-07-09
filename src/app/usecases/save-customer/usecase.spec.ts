import dcopy from 'deep-copy';
import { Customer } from '../../../core/entities/Customer';
import { InMemoryCustomersRepository } from '../../../test-utils/repositories/InMemoryCustomersRepository';
import { IPhoneProvider } from '../../providers/interfaces/IPhoneProvider';
import { PhoneProvider } from '../../providers/PhoneProvider';
import { SaveCustomerUseCase } from './usecase';

const mockData = {
    email: 'email@test.com',
    fullName: 'tester',
    phone: '19988803452',
};

describe('save-customer', () => {
    let data: any;
    let customerRepository: InMemoryCustomersRepository;
    let phoneProvider: IPhoneProvider;
    let sut: SaveCustomerUseCase;

    beforeEach(() => {
        data = dcopy(mockData);
        customerRepository = new InMemoryCustomersRepository();
        phoneProvider = new PhoneProvider();
        sut = new SaveCustomerUseCase(customerRepository, phoneProvider);
    });

    afterEach(() => {
        customerRepository.items = [];
    });

    it('should throw if phone is invalid', async () => {
        data.phone = '11111111111111';
        await expect(sut.execute(data)).rejects.toThrow();
    });

    it('should throw if email is already being used', async () => {
        const customer = Customer.create({
            email: data.email,
            fullName: 'test',
            phone: '01234567891',
        });
        expect(customerRepository.items.length).toBe(0);
        customerRepository.items.push(customer);
        expect(customerRepository.items.length).toBe(1);
        await expect(sut.execute(data)).rejects.toThrow();
    });
    it('should save new customer', async () => {
        expect(customerRepository.items.length).toBe(0);
        await sut.execute(data);
        expect(customerRepository.items.length).toBe(1);
    });
});
