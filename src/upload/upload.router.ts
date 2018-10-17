import { Router } from 'express';
import { UploadValidator } from './validator/upload.validator';
import { UploadController } from './upload.contoller';
import { Wrapper } from '../utils/wrapper';

const UploadRouter: Router = Router();

UploadRouter.post('/', UploadValidator.canCreate, Wrapper.wrapAsync(UploadController.create));

export { UploadRouter };
