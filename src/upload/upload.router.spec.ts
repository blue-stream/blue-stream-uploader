process.env.NODE_ENV = 'test';

import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { Server } from '../server';
import { config } from '../config';
import { removeTestingFiles } from '../utils/remove-files';

let server: Server;

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
            .set('Content-type', 'multipart/form-data')
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
            .set('Content-type', 'multipart/form-data')
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
            .expect(400);
    });

    it('Should not upload a non video file', (done: MochaDone) => {
        request(server.app)
            .post('/api/upload')
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
});
