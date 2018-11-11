import { Request, Response } from 'express';
import { UploadBroker } from './upload.broker';
import { config } from '../config';
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

        UploadController.publishUploadMessage(req.body.videoId, key);

        return res.json(key);
    }

    public static publishUploadMessage(videoId: string, videoKey: string) {
        const serverName: string = config.server.name;
        const action: string = 'upload';
        const status: string = 'started';

        const routingKey = `${serverName}.${action}.${status}`;

        const message: string = JSON.stringify({
            videoId,
            videoKey,
        });

        UploadBroker.publish(routingKey, message);
    }
}
