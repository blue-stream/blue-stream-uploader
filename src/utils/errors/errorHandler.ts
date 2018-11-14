import * as express from 'express';
import { ServerError, UserError } from './applicationError';
import { Logger } from '../logger';
import { syslogSeverityLevels } from 'llamajs/dist';
import { UploadBroker } from '../../upload/upload.broker';

export function userErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof UserError) {

        UploadBroker.publishUploadFailed(req.body.videoId);

        Logger.log(
            syslogSeverityLevels.Notice,
            'User Error',
            `${error.name} was thrown with status ${error.status} and message ${error.message}`);

        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function serverErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof ServerError) {
        Logger.log(
            syslogSeverityLevels.Alert,
            'Server Error',
            `${error.name} was thrown with status ${error.status} and message ${error.message}`);

        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function unknownErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    Logger.log(
        syslogSeverityLevels.Critical,
        'Unknown Error',
        `${error.name} was thrown with status 500 and message ${error.message}`);

    res.status(500).send({
        type: error.name,
        message: error.message,
    });

    next(error);
}
