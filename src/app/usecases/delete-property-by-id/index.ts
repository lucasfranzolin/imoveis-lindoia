import { AWSProvider } from '../../providers/AWSProvider';
import { PropertiesRepository } from '../../repositories/mongo/PropertiesRepository';
import { DeletePropertyByIdUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();
const awsProvider = new AWSProvider();

const deletePropertyByIdUseCase = new DeletePropertyByIdUseCase(
    propertiesRepository,
    awsProvider
);

export { deletePropertyByIdUseCase };
