import { ApplicationError, UserError } from './applicationError';

export class RequestValidationError extends UserError {
    constructor(message?: string) {
        super(message || 'Request validation failed', 400);
    }
}

export class ResourceNotFoundError extends UserError {
    constructor(resource?: string) {
        super(`${resource || 'Resource'} not found.`, 404);
    }
}

export class UnsupportedMediaTypeError extends UserError {
    constructor(resource?: string) {
        super(`${resource || 'Resource'} not supported.`, 415);
    }
}
