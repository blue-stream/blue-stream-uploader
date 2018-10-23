import * as path from 'path';
import * as multer from 'multer';
import { pseudoRandomBytes } from 'crypto';
import { Request } from 'express';
import { config } from "../../../config";

export class DiskStorage {
    destination: string;

    constructor(path?: string) {
        this.destination = path || config.upload.disk.path;
    }

    private getFileName(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        pseudoRandomBytes(16, (error, raw) => {
            if (error) {
                return error;
            }

            cb(null, raw.toString('hex') + path.extname(file.originalname));

            return null;
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
