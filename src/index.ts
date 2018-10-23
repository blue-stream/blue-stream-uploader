import * as mongoose from 'mongoose';
import { Server } from './server';
import { RabbitMQ } from './utils/rabbitMQ';
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
        await mongoose.disconnect();
        RabbitMQ.closeConnection();
        process.exit(0);
    } catch (error) {
        console.error('Faild to close connections', error);
    }
});

(async () => {
    const connection = await RabbitMQ.connect();
    Logger.configure();
    Logger.log(syslogSeverityLevels.Informational, 'Server Started', `Port: ${config.server.port}`);

    console.log('Starting server');
    const server: Server = Server.bootstrap();

    server.app.on('close', () => {
        RabbitMQ.closeConnection();
        console.log('Server closed');
    });
})();
