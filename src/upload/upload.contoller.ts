import { Request, Response } from 'express';
import { UploadManager } from './upload.manager';

export class UploadController {
    static async create(req: Request, res: Response) {
        res.json(await UploadManager.create(req.body));
    }
}
