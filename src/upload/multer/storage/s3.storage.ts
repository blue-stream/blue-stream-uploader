import * as aws from 'aws-sdk';
import * as path from 'path';
import * as multerS3 from 'multer-s3';
import { pseudoRandomBytes } from 'crypto';
import { Request } from 'express';
import { config } from '../../../config';

export class S3Storage {
    s3: aws.S3;
    bucket: string;

    constructor() {
        this.s3 = new aws.S3({
            accessKeyId: config.upload.s3.accessKeyId,
            region: config.upload.s3.region,
            secretAccessKey: config.upload.s3.secretAccessKey,
            signatureVersion: 'v3',
        });

        this.bucket = config.upload.s3.bucket;
    }

    private getFieldName(req: Request, file: Express.MulterS3.File,
                         callback: (error: Error | null, fieldName: { fieldName: string }) => void) {
        callback(null, { fieldName: file.fieldname });
    }

    // File's key, a unique value generated with the current date & random bytes
    private getKey(req: Request, file: Express.MulterS3.File,
                   callback: (error: Error | null, fileKey: string) => void) {
        pseudoRandomBytes(2, (error, raw) => {
            if (error) {
                return error;
            }

            const date: string = Date.now().toString();
            const randomBytes: string = raw.toString('hex');
            const fileExtension: string = path.extname(file.originalname);
            const fileKey: string = `${date}_${randomBytes}${fileExtension}`;
            callback(null, fileKey);

            return null;
        });
    }

    public getStorage() {
        const storage: any = {
            s3: this.s3,
            bucket: this.bucket,
            metadata: this.getFieldName,
            key: this.getKey,
        };

        return multerS3(storage);
    }
}
