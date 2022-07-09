import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { PaginationProvider } from '../../providers/PaginationProvider';
import { ListCustomersUseCase } from './usecase';

const customersRepository = new MongoCustomersRepository();
const paginationProvider = new PaginationProvider();

const listCustomersUseCase = new ListCustomersUseCase(
    customersRepository,
    paginationProvider
);

export { listCustomersUseCase };
