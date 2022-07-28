import { MongoPropertiesRepository } from '../../repositories/mongo/MongoPropertiesRepository';
import { AWSProvider } from '../../providers/AWSProvider';
import { StorePropertyMediaUseCase } from './usecase';

const propertiesRepository = new MongoPropertiesRepository();
const awsProvider = new AWSProvider();

const storePropertyMediaUseCase = new StorePropertyMediaUseCase(
    propertiesRepository,
    awsProvider
);

export { storePropertyMediaUseCase };
