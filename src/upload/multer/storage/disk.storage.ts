import * as path from 'path';
import * as multer from 'multer';
import * as fs from 'fs';
import { pseudoRandomBytes } from 'crypto';
import { Request } from 'express';
import { config } from '../../../config';
import { Storage } from './storage';

export class DiskStorage extends Storage {
    destination: string;

    constructor(path?: string) {
        super();
        this.destination = path || config.upload.disk.path;
    }

    private getFileName(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        pseudoRandomBytes(16, (error, raw) => {
            if (error) {
                return error;
            }

            const fileKey: string = raw.toString('hex') + path.extname(file.originalname);
            (req as any)['fileKey'] = fileKey;

            cb(null, fileKey);

            return null;
        });
    }

    public removeFile(fileKey: string) {
        return fs.unlink(`${config.upload.disk.path}/${fileKey}`, (error) => {
            if (error) {
                throw error;
            }
        });
    }

    public getStorage() {
        const storage: multer.DiskStorageOptions = {
            destination: this.destination,
            filename: this.getFileName,
        };

        return multer.diskStorage(storage);
    }
}
