import formidable from 'formidable';
import { PropertyMediaMetadata } from '../../../core/types';

export interface IAWSProvider {
    uploadToS3(
        bucketName: string,
        referenceId: string,
        dataArr: Array<{
            file: formidable.File;
            metadata: PropertyMediaMetadata;
        }>
    ): Promise<string[]>;
}
