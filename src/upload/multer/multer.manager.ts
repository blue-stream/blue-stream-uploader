import * as multer from 'multer';
import { Request } from 'express';
import { DiskStorage } from './storage/disk.storage';
import { S3Storage } from './storage/s3.storage';
import { config, StorageType } from '../../config';
import * as path from 'path';
import { UnsupportedMediaTypeError } from '../../utils/errors/applicationErrors';
import { Storage } from './storage/storage';

export class MulterManager {
    private storage!: Storage;
    private limits: multer.Options['limits'];
    private multerInstance!: multer.Instance;

    constructor(storage: StorageType) {
        this.initStorage(storage);
        this.setLimits();
        this.initMulterInstance();
    }

    public getInstance(): multer.Instance {
        return this.multerInstance;
    }

    private initMulterInstance() {
        this.multerInstance = multer({
            storage: this.storage.getStorage(),
            fileFilter: this.fileFilter,
            limits: this.limits,
        });
    }

    private initStorage(storage: StorageType) {
        if (storage === StorageType.Disk) {
            this.storage = new DiskStorage();
        } else {
            this.storage = new S3Storage();
        }
    }

    private fileFilter(req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) {
        if (config.upload.formats.indexOf(path.extname(file.originalname)) > -1) {
            cb(null, true);
        } else {
            cb(new UnsupportedMediaTypeError(path.extname(file.originalname)), false);
        }
    }

    removeFile(fileKey: string) {
        this.storage.removeFile(fileKey);
    }

    private setLimits() {
        this.limits = {
            fields: 1,
            files: config.upload.maxFilesAmount,
            fileSize: config.upload.maxSize,
        };
    }
}
