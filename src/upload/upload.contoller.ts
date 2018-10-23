import { Request, Response } from 'express';
import { RequestValidationError } from '../utils/errors/applicationErrors';

export class UploadController {
    static async upload(req: Request, res: Response) {

        if (!req.file) {
            throw new RequestValidationError();
        }

        let key = (req.file as Express.MulterS3.File).key;
        if (!key) {
            key = req.file.filename;
        }

        return res.json(key);
    }
}
