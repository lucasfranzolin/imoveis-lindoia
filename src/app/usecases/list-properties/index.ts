import { PropertiesRepository } from '../../repositories/mongo-http/PropertiesRepository';
import { PaginationProvider } from '../../providers/PaginationProvider';
import { ListPropertiesUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();
const paginationProvider = new PaginationProvider();

const listPropertiesUseCase = new ListPropertiesUseCase(
    propertiesRepository,
    paginationProvider
);

export { listPropertiesUseCase };
