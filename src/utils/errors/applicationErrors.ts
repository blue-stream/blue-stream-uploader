import { ApplicationError } from './applicationError';

export class RequestValidationError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Request validation failed', 400);
    }
}

export class ResourceNotFoundError extends ApplicationError {
    constructor(resource?: string) {
        super(`${resource || 'Resource'} not found.`, 404);
    }
}