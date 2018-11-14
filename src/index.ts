import { Server } from './server';
import { RabbitMQ } from './utils/rabbitMQ';
import { UploadBroker } from './upload/upload.broker';
import { Logger } from './utils/logger';
import { config } from './config';
import { syslogSeverityLevels } from 'llamajs';

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err.stack);
    RabbitMQ.closeConnection();
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);
    RabbitMQ.closeConnection();
    process.exit(1);
});

process.on('SIGINT', async () => {
    try {
        console.log('User Termination');
        RabbitMQ.closeConnection();
        process.exit(0);
    } catch (error) {
        console.error('Faild to close connections', error);
    }
});

(async () => {
    await RabbitMQ.connect();
    await UploadBroker.startPublisher();

    Logger.configure();
    Logger.log(syslogSeverityLevels.Informational, 'Server Started', `Port: ${config.server.port}`);

    console.log('Starting server');
    const server: Server = Server.bootstrap();

    server.app.on('close', () => {
        RabbitMQ.closeConnection();
        console.log('Server closed');
    });
})();
