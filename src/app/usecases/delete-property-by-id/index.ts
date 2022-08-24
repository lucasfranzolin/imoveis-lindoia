import { PropertiesRepository } from '../../repositories/mongo-http/PropertiesRepository';
import { DeletePropertyByIdUseCase } from './usecase';
import { AWSProvider } from '../../providers/AWSProvider';

const propertiesRepository = new PropertiesRepository();
const awsProvider = new AWSProvider();

const deletePropertyByIdUseCase = new DeletePropertyByIdUseCase(
    propertiesRepository,
    awsProvider
);

export { deletePropertyByIdUseCase };
