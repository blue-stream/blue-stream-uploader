import { Request, Response } from 'express';
import { UploadBroker } from './upload.broker';
import { config } from '../config';
import { RequestValidationError } from '../utils/errors/applicationErrors';
import { Logger } from '../utils/logger';
import { syslogSeverityLevels } from 'llamajs';

export class UploadController {
    static async upload(req: Request, res: Response) {
        if (!req.file) {
            throw new RequestValidationError();
        }

        let key = (req.file as Express.MulterS3.File).key;
        if (!key) {
            key = req.file.filename;
        }

        UploadController.publishUploadMessage(req.body.videoId, key);
        Logger.log(
            syslogSeverityLevels.Informational,
            'File uploaded',
            `file with key ${key} was uploaded to ${config.upload.storage}`);

        return res.json(key);
    }

    public static publishUploadMessage(videoId: string, videoKey: string) {
        const serverName: string = config.server.name;
        const action: string = 'upload';
        const status: string = 'successful';

        const routingKey = `${serverName}.${action}.${status}`;

        const message: string = JSON.stringify({
            videoId,
            videoKey,
        });

        UploadBroker.publish(routingKey, message);
    }
}
