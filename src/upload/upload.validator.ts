import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../utils/errors/applicationErrors';
import { verify } from 'jsonwebtoken';
import { config } from '../config';

export function canUpload(req: Request, res: Response, next: NextFunction) {
    if (!req.query.videoToken) throw new RequestValidationError();

    const token = verify(req.query.videoToken, config.authentication.secret) as { user: string, video: string };
    if (!token.video) throw new RequestValidationError();

    next();
}
