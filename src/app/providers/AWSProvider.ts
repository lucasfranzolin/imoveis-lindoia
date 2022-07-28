import AWS from 'aws-sdk';
import crypto from 'crypto';
import formidable from 'formidable';
import fs from 'fs';

import { config } from '../../config/config';
import { logger } from '../../config/logger';
import { PropertyMediaMetadata } from '../../core/types';
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

    uploadToS3(
        bucketName: string,
        referenceId: string,
        dataArr: Array<{
            file: formidable.File;
            metadata: PropertyMediaMetadata;
        }>
    ): Promise<string[]> {
        return Promise.all(
            dataArr.map((data) =>
                this.execUploadToS3(bucketName, referenceId, data)
            )
        );
    }

    private async execUploadToS3(
        bucketName: string,
        referenceId: string,
        data: {
            file: formidable.File;
            metadata: PropertyMediaMetadata;
        }
    ): Promise<string> {
        const { filepath, originalFilename } = data.file;

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
            Metadata: data.metadata,
        };

        const downloadUrl: string = await new Promise((resolve, reject) => {
            this.s3
                .putObject(params)
                .on('httpUploadProgress', ({ loaded, total }) => {
                    const pct = Math.round((loaded * 100) / total);
                    logger.info(Key, pct);
                })
                .send((err, data) => {
                    if (err) reject(err);
                    this.getObjectUrl(Key).then(resolve).catch(reject);
                });
        });
        return downloadUrl;
    }

    private async getObjectUrl(filename: string): Promise<string> {
        const params = {
            Bucket: config.aws.s3.bucketName,
            Key: filename,
        };
        const fullUrl = await this.s3.getSignedUrlPromise('putObject', params);
        const [objectUrl] = fullUrl.split('?');
        return objectUrl;
    }
}
