import formidable from 'formidable';
import { combineLatest, map, Observable } from 'rxjs';

import { config } from '../../../config/config';
import { PropertyNotFoundError } from '../../api-errors/PropertyNotFoundError';
import { IAWSProvider } from '../../providers/interfaces/IAWSProvider';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';

type RequestDTO = {
    id: string;
    files: Array<formidable.File>;
};

export class StorePropertyMediaUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private awsProvider: IAWSProvider
    ) {}

    async execute(data: RequestDTO): Promise<Observable<number>> {
        const property = await this.propertiesRepository.findById(data.id);
        if (!property) throw new PropertyNotFoundError();

        const emitters$ = this.awsProvider.uploadToS3(
            config.aws.s3.bucketName,
            data.id,
            data.files
        );
        return combineLatest(emitters$).pipe(
            map(
                (array) =>
                    array.reduce(
                        (prev, cur) => Number(cur.percentage) + prev,
                        0
                    ) / array.length
            )
        );
    }
}
