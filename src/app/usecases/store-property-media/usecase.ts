import formidable from 'formidable';
import httpStatus from 'http-status';

import { config } from '../../../config/config';
import { IAWSProvider } from '../../providers/interfaces/IAWSProvider';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';
import { ApiError } from '../../ApiError';
import { PropertyMediaMetadata } from '../../../core/types';

type RequestDTO = {
    id: string;
    files: Array<formidable.File>;
    metadataList: Array<PropertyMediaMetadata>;
};

export class StorePropertyMediaUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private awsProvider: IAWSProvider
    ) {}

    async execute(data: RequestDTO): Promise<Array<string>> {
        const property = await this.propertiesRepository.findById(data.id);
        if (!property) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Imóvel não encontrado.');
        }

        return await this.awsProvider.uploadToS3(
            config.aws.s3.bucketName,
            data.id,
            data.files.map((file, index) => ({
                file,
                metadata: data.metadataList[index],
            }))
        );
    }
}
