import { Router } from 'express';
import { UploadRouter } from './upload/upload.router';
import { HealthRouter } from './utils/health/health.router';

const AppRouter: Router = Router();

AppRouter.use('/api/upload', UploadRouter);
AppRouter.use('/health', HealthRouter);

export { AppRouter };
