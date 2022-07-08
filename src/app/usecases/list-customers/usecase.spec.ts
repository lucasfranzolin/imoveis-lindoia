import { InMemoryCustomersRepository } from '../../../test-utils/repositories/InMemoryCustomersRepository';
import { ListCustomersUseCase } from './usecase';

describe('list-customers', () => {
    let customersRepository: InMemoryCustomersRepository;
    let sut: ListCustomersUseCase;

    beforeEach(() => {
        customersRepository = new InMemoryCustomersRepository();
        sut = new ListCustomersUseCase(customersRepository);
    });

    afterEach(() => {
        customersRepository.items = [];
    });
});
