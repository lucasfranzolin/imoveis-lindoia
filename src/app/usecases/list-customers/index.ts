import { MongoCustomersRepository } from '../../repositories/mongo/MongoCustomersRepository';
import { ListCustomersUseCase } from './usecase';

const customersRepository = new MongoCustomersRepository();

const listCustomersUseCase = new ListCustomersUseCase(customersRepository);

export { listCustomersUseCase };
