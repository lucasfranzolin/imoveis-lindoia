import { MongoPropertiesRepository } from '../../repositories/mongo/MongoPropertiesRepository';
import { PaginationProvider } from '../../providers/PaginationProvider';
import { ListPropertiesUseCase } from './usecase';

const propertiesRepository = new MongoPropertiesRepository();
const paginationProvider = new PaginationProvider();

const listPropertiesUseCase = new ListPropertiesUseCase(
    propertiesRepository,
    paginationProvider
);

export { listPropertiesUseCase };
