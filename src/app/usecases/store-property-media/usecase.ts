import formidable from 'formidable';

import { config } from '../../../config/config';
import { IAWSProvider } from '../../providers/interfaces/IAWSProvider';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';
import { PropertyNotFoundError } from '../../api-errors/PropertyNotFoundError';

type RequestDTO = {
    id: string;
    files: Array<formidable.File>;
};

export class StorePropertyMediaUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private awsProvider: IAWSProvider
    ) {}

    async execute(data: RequestDTO): Promise<Array<string>> {
        const property = await this.propertiesRepository.findById(data.id);
        if (!property) throw new PropertyNotFoundError();

        return await this.awsProvider.uploadToS3(
            config.aws.s3.bucketName,
            data.id,
            data.files
        );
    }
}
