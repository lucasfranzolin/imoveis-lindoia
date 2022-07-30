import { AWSProvider } from '../../providers/AWSProvider';
import { MongoPropertiesRepository } from '../../repositories/mongo/MongoPropertiesRepository';
import { GetPropertyMediaUseCase } from './usecase';

const propertiesRepository = new MongoPropertiesRepository();
const awsProvider = new AWSProvider();

const getPropertyMediaUseCase = new GetPropertyMediaUseCase(
    propertiesRepository,
    awsProvider
);

export { getPropertyMediaUseCase };
