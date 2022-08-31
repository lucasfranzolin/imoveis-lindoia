import AWS from 'aws-sdk';
import crypto from 'crypto';
import formidable from 'formidable';
import fs from 'fs';
import { Observable } from 'rxjs';

import { config } from '../../config/config';
import { IAWSProvider, UploadProgress } from './interfaces/IAWSProvider';

export class AWSProvider implements IAWSProvider {
    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            region: config.aws.s3.bucketRegion,
            accessKeyId: config.aws.s3.accessKey,
            secretAccessKey: config.aws.s3.secretKey,
        });
    }

    async listObjects(
        bucketName: string,
        folder: string
    ): Promise<AWS.S3.ListObjectsV2Output> {
        const params: AWS.S3.ListObjectsV2Request = {
            Bucket: bucketName,
            Delimiter: '/',
            Prefix: folder + '/',
        };
        return await this.s3.listObjectsV2(params).promise();
    }

    uploadToS3(
        bucketName: string,
        folder: string,
        files: Array<formidable.File>
    ): Array<Observable<UploadProgress>> {
        return files.map((data) =>
            this.getUploadObservable(bucketName, folder, data)
        );
    }

    async deleteMany(
        bucketName: string,
        contents: AWS.S3.ObjectList
    ): Promise<void> {
        const deleteParams: AWS.S3.DeleteObjectsRequest = {
            Bucket: bucketName,
            Delete: {
                Objects: contents.map(({ Key }) => ({ Key: Key! })),
            },
        };
        await this.s3.deleteObjects(deleteParams).promise();
    }

    async getObjectUrl(bucketName: string, filename: string): Promise<string> {
        const params = {
            Bucket: bucketName,
            Key: filename,
        };
        const fullUrl = await this.s3.getSignedUrlPromise('putObject', params);
        const [objectUrl] = fullUrl.split('?');
        return objectUrl;
    }

    generateObjectKey(folder: string, data: formidable.File): string {
        const fileName = this.generateFilename(data.originalFilename!);
        return `${folder}/${fileName}`;
    }

    private getUploadObservable(
        bucketName: string,
        folder: string,
        data: formidable.File
    ): Observable<UploadProgress> {
        const Key = this.generateObjectKey(folder, data);

        const params: AWS.S3.PutObjectRequest = {
            ACL: 'public-read',
            Body: fs.readFileSync(data.filepath),
            Bucket: bucketName,
            Key,
        };

        const emitter = new Observable<UploadProgress>((subscriber) => {
            this.s3
                .putObject(params)
                .on('httpUploadProgress', ({ loaded, total }) => {
                    subscriber.next({
                        percentage: Math.round((loaded * 100) / total),
                        objectKey: Key,
                    });
                })
                .send((err, data) => {
                    if (err) subscriber.error(err);
                    subscriber.complete();
                });
        });
        return emitter;
    }

    private generateFilename(originalFilename: string): string {
        const rawBytes = crypto.randomBytes(16);
        const imageName = rawBytes.toString('hex');
        const extension = originalFilename!.slice(
            originalFilename!.lastIndexOf('.') + 1
        );
        return `${imageName}.${extension}`;
    }
}
