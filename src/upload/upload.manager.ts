import { IUpload } from './upload.interface';

export class UploadManager {
    static async create(upload: IUpload) {
        return { created: upload.property };
    }
}
