import formidable from 'formidable';
import { PropertyMediaMetadata } from '../../../core/types';

export interface IAWSProvider {
    listObjects(bucketName: string, folder: string): Promise<Array<string>>;
    uploadToS3(
        bucketName: string,
        referenceId: string,
        files: Array<formidable.File>
    ): Promise<string[]>;
}
