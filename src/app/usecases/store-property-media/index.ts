import { PropertiesRepository } from '../../repositories/mongo/PropertiesRepository';
import { AWSProvider } from '../../providers/AWSProvider';
import { StorePropertyMediaUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();
const awsProvider = new AWSProvider();

const storePropertyMediaUseCase = new StorePropertyMediaUseCase(
    propertiesRepository,
    awsProvider
);

export { storePropertyMediaUseCase };
