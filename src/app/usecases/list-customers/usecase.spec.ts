import { InMemoryCustomersRepository } from '../../../test-utils/repositories/InMemoryCustomersRepository';
import { IPaginationProvider } from '../../providers/interfaces/IPaginationProvider';
import { PaginationProvider } from '../../providers/PaginationProvider';
import { ListCustomersUseCase } from './usecase';

describe('list-customers', () => {
    let customersRepository: InMemoryCustomersRepository;
    let paginationProvider: IPaginationProvider;
    let sut: ListCustomersUseCase;

    beforeEach(() => {
        customersRepository = new InMemoryCustomersRepository();
        paginationProvider = new PaginationProvider();
        sut = new ListCustomersUseCase(customersRepository, paginationProvider);
    });

    afterEach(() => {
        customersRepository.items = [];
    });
});
