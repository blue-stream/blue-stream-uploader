import { Router } from 'express';
import { UploadController } from './upload.contoller';
import { canUpload } from './upload.validator';

const UploadRouter: Router = Router();

UploadRouter.post('/', UploadController.uploadSingle, canUpload, UploadController.upload);

export { UploadRouter };
