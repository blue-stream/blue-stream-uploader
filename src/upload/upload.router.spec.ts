import * as request from 'supertest';
import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { IUpload } from './upload.interface';
import { Server } from '../server';
import { PropertyInvalidError, IdInvalidError, UploadNotFoundError } from '../utils/errors/userErrors';
import { config } from '../config';
import { UploadManager } from './upload.manager';
import { sign } from 'jsonwebtoken';

describe('Upload Module', function () {
    let server: Server;
    const validProppertyString: string = '12345';
    const upload: IUpload = {
        property: validProppertyString,
    };
    const authorizationHeader = `Bearer ${sign('mock-user', config.authentication.secret)}`;
    const invalidId: string = '1';
    const invalidProppertyString: string = '123456789123456789';
    const invalidUpload: IUpload = {
        property: invalidProppertyString,
    };
    before(async function () {
        server = Server.bootstrap();
    });

    describe('#POST /api/upload/', function () {
        context('When request is valid', function () {
            it('Should return created upload', function (done: MochaDone) {
                request(server.app)
                    .post('/api/upload/')
                    .send({ upload })
                    
                    .set({ authorization: authorizationHeader })
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((error: Error, res: request.Response) => {
                        expect(error).to.not.exist;
                        expect(res).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res).to.have.property('body');
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('property', validProppertyString);

                        done();
                    });
            });
        });

        context('When request is invalid', function () {
            it('Should return error status when property is invalid', function (done: MochaDone) {
                request(server.app)
                    .post('/api/upload/')
                    .send({ upload: invalidUpload })
                    
                    .set({ authorization: authorizationHeader })
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .end((error: Error, res: request.Response) => {
                        expect(error).to.not.exist;
                        expect(res.status).to.equal(400);
                        expect(res).to.have.property('body');
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('type', PropertyInvalidError.name);
                        expect(res.body).to.have.property('message', new PropertyInvalidError().message);

                        done();
                    });
            });
        });
    });
    });
