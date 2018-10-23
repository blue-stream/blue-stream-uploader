import { Router } from 'express';
import * as multer from 'multer';
import { config } from '../config';
import { UploadController } from './upload.contoller';
import { MulterManager } from './multer/multer.manager';
import { Wrapper } from '../utils/wrapper';

const UploadRouter: Router = Router();
const upload: multer.Instance = (new MulterManager(config.upload.storage)).getInstance();

UploadRouter.post('/', upload.single(config.upload.fileKey), Wrapper.wrapAsync(UploadController.upload));

export { UploadRouter };
