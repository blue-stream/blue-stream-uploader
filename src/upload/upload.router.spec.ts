process.env.NODE_ENV = 'test';

import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { Server } from '../server';
import { config } from '../config';
import { removeTestingFiles } from '../utils/remove-files';
import { sign } from 'jsonwebtoken';

let server: Server;
const token = sign({ user: 'test@test', video: '123123214' }, config.authentication.secret);
const unverifiedToken = sign({ user: 'test@test', video: '123123214' }, 'secret');
const authenticationToken = sign({ user: 'test@test' }, config.authentication.secret);

describe('Upload', () => {
    const files: string[] = [];
    before(() => {
        server = Server.bootstrap();
    });

    after(async () => {
        await removeTestingFiles(files);
    });

    it('Should upload mp4 file', (done: MochaDone) => {
        request(server.app)
            .post('/api/upload')
            .query({ videoToken: token })
            .set('Content-type', 'multipart/form-data')
            .set('Authorization', `Bearer ${authenticationToken}`)
            .attach(config.upload.fileKey, fs.createReadStream(path.join(__dirname, '../testing-files', 'video.mp4')))
            .expect(200)
            .end((err: Error, response: request.Response) => {
                expect(err).to.not.exist;
                expect(response).to.exist;
                expect(response.body).to.match(/\.mp4$/);

                files.push(response.body as string);

                done();
            });
    });

    it('Should upload avi file', (done: MochaDone) => {
        request(server.app)
            .post('/api/upload')
            .query({ videoToken: token })
            .set('Content-type', 'multipart/form-data')
            .set('Authorization', `Bearer ${authenticationToken}`)
            .attach(config.upload.fileKey, fs.createReadStream(path.join(__dirname, '../testing-files', 'video.avi')))
            .expect(200)
            .end((err: Error, response: request.Response) => {
                expect(err).to.not.exist;
                expect(response).to.exist;
                expect(response.body).to.match(/\.avi$/);
                files.push(response.body as string);

                done();
            });
    });

    it('Should return 400 status code when no file attached', async () => {
        await request(server.app)
            .post('/api/upload')
            .set('Authorization', `Bearer ${authenticationToken}`)
            .query({ videoToken: token })
            .expect(400);
    });

    it('Should not upload a non video file', (done: MochaDone) => {
        request(server.app)
            .post('/api/upload')
            .query({ videoToken: token })
            .set('Authorization', `Bearer ${authenticationToken}`)
            .set('Content-type', 'multipart/form-data')
            .attach(config.upload.fileKey, fs.createReadStream(path.join(__dirname, '../testing-files', 'test.txt')))
            .expect(415)
            .end((err: Error, response: request.Response) => {
                expect(err).to.not.exist;
                expect(response).to.exist;
                expect(response.body).to.have.property('type', 'UnsupportedMediaTypeError');
                expect(response.body).to.have.property('message');

                done();
            });
    });

    it('Should throw error when no token provided', (done: MochaDone) => {
        request(server.app)
            .post('/api/upload')
            .set('Content-type', 'multipart/form-data')
            .set('Authorization', `Bearer ${authenticationToken}`)
            .attach(config.upload.fileKey, fs.createReadStream(path.join(__dirname, '../testing-files', 'video.avi')))
            .expect(400)
            .end((err: Error, response: request.Response) => {
                expect(err).to.not.exist;
                expect(response).to.exist;
                expect(response.body).to.have.property('type', 'RequestValidationError');
                expect(response.body).to.have.property('message');

                done();
            });
    });

    it('Should throw error when token is provided but signed with different secret', (done: MochaDone) => {
        request(server.app)
            .post('/api/upload')
            .query({ videoToken: unverifiedToken })
            .set('Authorization', `Bearer ${authenticationToken}`)
            .set('Content-type', 'multipart/form-data')
            .attach(config.upload.fileKey, fs.createReadStream(path.join(__dirname, '../testing-files', 'video.avi')))
            .expect(403)
            .end((err: Error, response: request.Response) => {
                expect(err).to.not.exist;
                expect(response).to.exist;

                done();
            });
    });
});
