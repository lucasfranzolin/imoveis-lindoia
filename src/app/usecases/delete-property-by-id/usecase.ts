import { config } from '../../../config/config';
import { DeletePropertyConflictError } from '../../api-errors/DeletePropertyConflictError';
import { PropertyNotFoundError } from '../../api-errors/PropertyNotFoundError';
import { IAWSProvider } from '../../providers/interfaces/IAWSProvider';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';

type RequestDTO = {
    id: string;
};

export class DeletePropertyByIdUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private awsProvider: IAWSProvider
    ) {}

    async execute({ id }: RequestDTO): Promise<void> {
        const property = await this.propertiesRepository.findById(id);
        if (!property) throw new PropertyNotFoundError();

        const ownedProperties = await this.propertiesRepository.findByOwnerId(
            id
        );
        if (ownedProperties.length > 0) throw new DeletePropertyConflictError();

        const { Contents } = await this.awsProvider.listObjects(
            config.aws.s3.bucketName,
            id
        );
        if (Contents) {
            await this.awsProvider.deleteMany(
                config.aws.s3.bucketName,
                Contents
            );
        }

        await this.propertiesRepository.deleteById(id);
    }
}
