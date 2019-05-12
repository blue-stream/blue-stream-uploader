import * as multer from 'multer';
import { MulterManager } from "./multer/multer.manager";
import { config } from "../config";

export class UploadManager {
    static multerManager: MulterManager = (new MulterManager(config.upload.storage as 'Disk' | 'S3'));
    static multerInstance : multer.Instance = UploadManager.multerManager.getInstance();

    static removeFile(fileKey: string) {
        return UploadManager.multerManager.removeFile(fileKey);
    }
}
