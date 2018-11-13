import { Router } from 'express';
import { UploadController } from './upload.contoller';

const UploadRouter: Router = Router();

UploadRouter.post('/', UploadController.uploadSingle, UploadController.upload);

export { UploadRouter };
