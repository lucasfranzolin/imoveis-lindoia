import { AWSProvider } from '../../providers/AWSProvider';
import { PropertiesRepository } from '../../repositories/mongo-http/PropertiesRepository';
import { GetPropertyMediaUseCase } from './usecase';

const propertiesRepository = new PropertiesRepository();
const awsProvider = new AWSProvider();

const getPropertyMediaUseCase = new GetPropertyMediaUseCase(
    propertiesRepository,
    awsProvider
);

export { getPropertyMediaUseCase };
