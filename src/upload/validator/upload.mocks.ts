import { Types } from 'mongoose';
import { createRequest, createResponse } from 'node-mocks-http';
import { sign } from 'jsonwebtoken';
import { config } from '../../config';

export const responseMock = createResponse();

export class ValidRequestMocks {
    readonly validProperty: string = '12345';
    readonly validProperty2: string = '23456';
    readonly validProperty3: string = '34567';

    readonly upload = {
        property: this.validProperty,
    };

    readonly upload2 = {
        property: this.validProperty2,
    };

    readonly upload3 = {
        property: this.validProperty3,
    };

    readonly uploadFilter = this.upload;

    authorizationHeader = `Bearer ${sign('mock-user', config.authentication.secret)}`;

    create = createRequest({
        method: 'POST',
        url: '/api/upload/',
        headers: {
            authorization: this.authorizationHeader,
        },
        body: {
            upload: this.upload,
        },
    });

    createMany = createRequest({
        method: 'POST',
        url: '/api/upload/many/',
        headers: {
            authorization: this.authorizationHeader,
        },
        body: {
            uploads: [
                this.upload,
                this.upload2,
                this.upload3,
            ],
        },
    });

    updateMany = createRequest({
        method: 'PUT',
        url: '/api/upload/many',
        headers: {
            authorization: this.authorizationHeader,
        },
        body: {
            uploadFilter: this.uploadFilter,
            upload: this.upload,
        },
    });

    updateById = createRequest({
        method: 'PUT',
        url: '/api/upload/:id',
        headers: {
            authorization: this.authorizationHeader,
        },
        params: {
            id: new Types.ObjectId(),
        },
        body: {
            upload: this.upload,
        },
    });

    deleteById = createRequest({
        method: 'DELETE',
        url: '/api/upload/:id',
        headers: {
            authorization: this.authorizationHeader,
        },
        params: {
            id: new Types.ObjectId(),
        },
    });

    getOne = createRequest({
        method: 'GET',
        url: `/api/upload/one?uploadFilter={'property':${this.validProperty}}`,
        headers: {
            authorization: this.authorizationHeader,
        },
        query: this.upload,
    });

    getMany = createRequest({
        method: 'GET',
        url: `/api/upload/many?uploadFilter={'property':${this.validProperty}}`,
        headers: {
            authorization: this.authorizationHeader,
        },
        query: this.upload,
    });

    getAmount = createRequest({
        method: 'GET',
        url: `/api/upload/amount?uploadFilter={'property':${this.validProperty}}`,
        headers: {
            authorization: this.authorizationHeader,
        },
        query: this.upload,
    });

    getById = createRequest({
        method: 'GET',
        url: '/api/upload/:id',
        headers: {
            authorization: this.authorizationHeader,
        },
        params: {
            id: new Types.ObjectId(),
        },
    });
}
