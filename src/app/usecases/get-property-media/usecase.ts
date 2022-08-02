import { config } from '../../../config/config';
import { PropertyOwnerNotFoundError } from '../../api-errors/PropertyOwnerNotFoundError';
import { IAWSProvider } from '../../providers/interfaces/IAWSProvider';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';

type RequestDTO = {
    id: string;
};

export class GetPropertyMediaUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private awsProvider: IAWSProvider
    ) {}

    async execute(data: RequestDTO): Promise<Array<string>> {
        const property = await this.propertiesRepository.findById(data.id);
        if (!property) throw new PropertyOwnerNotFoundError();

        const result = await this.awsProvider.listObjects(
            config.aws.s3.bucketName,
            data.id
        );
        return result;
    }
}
