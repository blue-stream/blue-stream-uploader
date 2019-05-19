import { Request, Response, NextFunction } from 'express';
import { UploadPublishBroker } from './upload.broker.publish';
import { config } from '../config';
import { RequestValidationError } from '../utils/errors/applicationErrors';
import { log } from '../utils/logger';
import { verify } from 'jsonwebtoken';
import { UploadManager } from './upload.manager';

export class UploadController {
    static uploadSingle(req: Request, res: Response, next: NextFunction) {
        req.on('aborted', async () => {
            await UploadManager.removeFile((req as any)['fileKey']);
            const tokenData = verify(req.query.videoToken, config.authentication.secret) as { user: string, video: string };
            UploadPublishBroker.publishUploadCanceled(tokenData.video);
        });

        return UploadManager.multerInstance.single(config.upload.fileKey)(req, res, next);
    }

    static upload(req: Request, res: Response) {

        if (!req.file) {
            throw new RequestValidationError();
        }

        let key = (req.file as Express.MulterS3.File).key;
        if (!key) {
            key = req.file.filename;
        }

        const tokenData = verify(req.query.videoToken, config.authentication.secret) as { user: string, video: string };
        const userId: string = req.user ? req.user.id : 'unknown';

        UploadPublishBroker.publishUploadSuccessful(tokenData.video, key, userId);
        log('info' , 'File uploaded', `file with key ${key} was uploaded to ${config.upload.storage}`, '', userId);

        return res.json(key);
    }
}
