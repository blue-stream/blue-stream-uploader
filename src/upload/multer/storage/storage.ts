import { StorageEngine } from 'multer';

export abstract class Storage {
    abstract removeFile(fileKey: string): any;
    abstract getStorage(): StorageEngine;
}