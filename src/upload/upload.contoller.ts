import { Request, Response, NextFunction } from 'express';
import { UploadBroker } from './upload.broker';
import { config } from '../config';
import { RequestValidationError } from '../utils/errors/applicationErrors';
import { Logger } from '../utils/logger';
import { syslogSeverityLevels } from 'llamajs';
import { MulterManager } from './multer/multer.manager';
import * as multer from 'multer';

export class UploadController {
    static uploadSingle(req: Request, res: Response, next: NextFunction) {
        const multerManager: MulterManager = (new MulterManager(config.upload.storage as 'Disk' | 'S3'));
        const upload: multer.Instance = multerManager.getInstance();

        req.on('aborted', async () => {
            await multerManager.removeFile((req as any)['fileKey']);
            UploadBroker.publishUploadCanceled(req.body.videoId);
        });

        return upload.single(config.upload.fileKey)(req, res, next);
    }

    static upload(req: Request, res: Response) {

        if (!req.file) {
            throw new RequestValidationError();
        }

        let key = (req.file as Express.MulterS3.File).key;
        if (!key) {
            key = req.file.filename;
        }

        UploadBroker.publishUploadSuccessful(req.body.videoId, key);
        Logger.log(
            syslogSeverityLevels.Informational,
            'File uploaded',
            `file with key ${key} was uploaded to ${config.upload.storage}`);

        return res.json(key);
    }
}
