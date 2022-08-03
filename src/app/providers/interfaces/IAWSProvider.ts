import formidable from 'formidable';

export interface IAWSProvider {
    listObjects(
        bucketName: string,
        folder: string
    ): Promise<AWS.S3.ListObjectsV2Output>;
    uploadToS3(
        bucketName: string,
        folder: string,
        files: Array<formidable.File>
    ): Promise<string[]>;
    deleteMany(bucketName: string, contents: AWS.S3.ObjectList): Promise<void>;
    getObjectUrl(bucketName: string, filename: string): Promise<string>;
}
