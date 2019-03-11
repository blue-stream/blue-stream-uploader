import { Router } from 'express';
import { UploadController } from './upload.contoller';
import { canUpload } from './upload.validator';

const UploadRouter: Router = Router();

UploadRouter.post('/', canUpload, UploadController.uploadSingle, UploadController.upload);

export { UploadRouter };
