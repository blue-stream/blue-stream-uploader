import { Request, Response, NextFunction } from 'express';
import { UploadValidatons } from './upload.validations';
import { PropertyInvalidError, IdInvalidError } from '../../utils/errors/userErrors';
import { IUpload } from '../upload.interface';

export class UploadValidator {

    static canCreate(req: Request, res: Response, next: NextFunction) {
        next(UploadValidator.validateProperty(req.body.upload.property));
    }

    static canCreateMany(req: Request, res: Response, next: NextFunction) {
        const propertiesValidations: (Error | undefined)[] = req.body.uploads.map((upload: IUpload) => {
            return UploadValidator.validateProperty(upload.property);
        });

        next(UploadValidator.getNextValueFromArray(propertiesValidations));
    }

    static canUpdateById(req: Request, res: Response, next: NextFunction) {
        next(
            UploadValidator.validateId(req.params.id) ||
            UploadValidator.validateProperty(req.body.upload.property));
    }

    static canUpdateMany(req: Request, res: Response, next: NextFunction) {
        next(UploadValidator.validateProperty(req.body.upload.property));
    }

    static canDeleteById(req: Request, res: Response, next: NextFunction) {
        next(UploadValidator.validateId(req.params.id));
    }

    static canGetById(req: Request, res: Response, next: NextFunction) {
        next(UploadValidator.validateId(req.params.id));
    }

    static canGetOne(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static canGetMany(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static canGetAmount(req: Request, res: Response, next: NextFunction) {
        next();
    }

    private static validateProperty(property: string) {
        if (!UploadValidatons.isPropertyValid(property)) {
            return new PropertyInvalidError();
        }

        return undefined;
    }

    private static validateId(id: string) {
        if (!UploadValidatons.isIdValid(id)) {
            return new IdInvalidError();
        }

        return undefined;
    }

    private static getNextValueFromArray(validationsArray: (Error | undefined)[]) {
        let nextValue: Error | undefined;

        for (let index = 0; index < validationsArray.length; index++) {
            if (validationsArray[index] !== undefined) {
                nextValue = validationsArray[index];
            }
        }

        return nextValue;
    }
}
