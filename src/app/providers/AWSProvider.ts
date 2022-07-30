import AWS from 'aws-sdk';
import crypto from 'crypto';
import formidable from 'formidable';
import fs from 'fs';

import { config } from '../../config/config';
import { IAWSProvider } from './interfaces/IAWSProvider';

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
    ): Promise<Array<string>> {
        const params: AWS.S3.ListObjectsV2Request = {
            Bucket: bucketName,
            Delimiter: '/',
            Prefix: folder + '/',
        };
        const data = await this.s3.listObjectsV2(params).promise();
        const Keys = data.Contents!.map((content) => content.Key);
        const downloadUrls = await Promise.all(
            Keys.map((key) => this.getObjectUrl(bucketName, key!))
        );
        return downloadUrls;
    }

    async uploadToS3<T>(
        bucketName: string,
        referenceId: string,
        files: Array<formidable.File>
    ): Promise<string[]> {
        return await Promise.all(
            files.map((data) =>
                this.execUploadToS3(bucketName, referenceId, data)
            )
        );
    }

    private async execUploadToS3(
        bucketName: string,
        referenceId: string,
        data: formidable.File
    ): Promise<string> {
        const { filepath, originalFilename } = data;

        const rawBytes = crypto.randomBytes(16);
        const imageName = rawBytes.toString('hex');
        const extension = originalFilename!.slice(
            originalFilename!.lastIndexOf('.') + 1
        );

        const Key = `${referenceId}/${imageName}.${extension}`;

        const params: AWS.S3.PutObjectRequest = {
            ACL: 'public-read',
            Body: fs.readFileSync(filepath),
            Bucket: bucketName,
            Key,
        };

        const downloadUrl: string = await new Promise((resolve, reject) => {
            this.s3
                .putObject(params)
                .on('httpUploadProgress', ({ loaded, total }) => {
                    const pct = Math.round((loaded * 100) / total);
                })
                .send((err, data) => {
                    if (err) reject(err);
                    this.getObjectUrl(bucketName, Key)
                        .then(resolve)
                        .catch(reject);
                });
        });
        return downloadUrl;
    }

    private async getObjectUrl(
        bucketName: string,
        filename: string
    ): Promise<string> {
        const params = {
            Bucket: bucketName,
            Key: filename,
        };
        const fullUrl = await this.s3.getSignedUrlPromise('putObject', params);
        const [objectUrl] = fullUrl.split('?');
        return objectUrl;
    }

    private async getObjectMetadata<T>(
        bucketName: string,
        Key: string
    ): Promise<T> {
        const params: AWS.S3.HeadObjectRequest = {
            Bucket: bucketName,
            Key,
        };
        const attr = await this.s3.headObject(params).promise();
        return attr.Metadata as T;
    }
}
