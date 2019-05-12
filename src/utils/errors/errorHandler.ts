import * as express from 'express';
import { ServerError, UserError } from './applicationError';
import { log } from '../logger';
import { UploadPublishBroker } from '../../upload/upload.broker.publish';
import { config } from '../../config';
import { verify, TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';

export function tokenErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError ||
        error instanceof NotBeforeError
    ) {
        log('warn' , 'Authorization Error', `${req.user ? req.user.id : 'User'} tried to access unauthorized resource`, '', req.user ? req.user.id : 'unknown');

        res.status(403).send();

        next();
    } else {
        next(error);
    }
}

export function userErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof UserError) {
        if (req.query.videoToken) {
            const tokenData = verify(req.query.videoToken, config.authentication.secret) as { user: string, video: string };
            UploadPublishBroker.publishUploadFailed(tokenData.video);
        }

        log('info' , 'User Error', `${error.name} was thrown with status ${error.status} and message ${error.message}`, '', req.user ? req.user.id : 'unknown');

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
        log('warn' , 'Server Error', `${error.name} was thrown with status ${error.status} and message ${error.message}`, '', req.user.id);

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
    log('error' , 'Unknown Error', `${error.name} was thrown with status 500 and message ${error.message}`, '', req.user.id);

    res.status(500).send({
        type: error.name,
        message: error.message,
    });

    next(error);
}
