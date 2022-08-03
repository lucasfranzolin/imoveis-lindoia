import { MongoPropertiesRepository } from '../../repositories/mongo/MongoPropertiesRepository';
import { DeletePropertyByIdUseCase } from './usecase';
import { AWSProvider } from '../../providers/AWSProvider';

const propertiesRepository = new MongoPropertiesRepository();
const awsProvider = new AWSProvider();

const deletePropertyByIdUseCase = new DeletePropertyByIdUseCase(
    propertiesRepository,
    awsProvider
);

export { deletePropertyByIdUseCase };
