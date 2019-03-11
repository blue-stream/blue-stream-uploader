import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../utils/errors/applicationErrors';

export function canUpload(req: Request, res: Response, next: NextFunction) {
    if (!req.query.videoToken) {
        throw new RequestValidationError();
    }

    next();
}
