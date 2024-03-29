import { CustomersRepository } from '../../repositories/mongo/CustomersRepository';
import { PaginationProvider } from '../../providers/PaginationProvider';
import { ListCustomersUseCase } from './usecase';

const customersRepository = new CustomersRepository();
const paginationProvider = new PaginationProvider();

const listCustomersUseCase = new ListCustomersUseCase(
    customersRepository,
    paginationProvider
);

export { listCustomersUseCase };
