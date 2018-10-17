import { Router } from 'express';
import { UploadRouter } from './upload/upload.router';

const AppRouter: Router = Router();

AppRouter.use('/api/upload', UploadRouter);

export { AppRouter };
