import { S3, AWSError } from 'aws-sdk';
import { config } from '../config';
import * as rimraf from 'rimraf';

export function removeTestingFiles(keys: string[]) {
    if (config.upload.storage === 'S3') {
        const params = {
            Bucket: config.upload.s3.bucket,
            Delete: {
                Objects: keys.map((key: string) => ({ Key: key })),
            },
        };

        const s3 = new S3({
            s3ForcePathStyle: true,
            region: config.upload.s3.region,
            accessKeyId: config.upload.s3.accessKeyId,
            secretAccessKey: config.upload.s3.secretAccessKey,
            signatureVersion:  config.upload.s3.signatureVersion,
            endpoint: config.upload.s3.endpoint,
        });

        return s3.deleteObjects(params).promise();
    }

    return rimraf.__promisify__(config.upload.disk.path);
}
