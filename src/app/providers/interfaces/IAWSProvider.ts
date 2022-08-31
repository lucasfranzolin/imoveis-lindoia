import AWS from 'aws-sdk';
import formidable from 'formidable';
import { Observable } from 'rxjs';

export type UploadProgress = {
    percentage: number;
    objectKey: string;
};

export interface IAWSProvider {
    listObjects(
        bucketName: string,
        folder: string
    ): Promise<AWS.S3.ListObjectsV2Output>;
    uploadToS3(
        bucketName: string,
        folder: string,
        files: Array<formidable.File>
    ): Array<Observable<UploadProgress>>;
    deleteMany(bucketName: string, contents: AWS.S3.ObjectList): Promise<void>;
    getObjectUrl(bucketName: string, filename: string): Promise<string>;
    generateObjectKey(folder: string, data: formidable.File): string;
}
