import { Server } from './server';
import * as rabbit from './utils/rabbit';
import { log } from './utils/logger';
import { config } from './config';

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err.stack);
    rabbit.closeConnection();
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);
    rabbit.closeConnection();
    process.exit(1);
});

process.on('SIGINT', async () => {
    try {
        console.log('User Termination');
        rabbit.closeConnection();
        process.exit(0);
    } catch (error) {
        console.error('Faild to close connections', error);
    }
});

(async () => {
    await rabbit.connect();

    log('verbose' , 'Server Started', `Port: ${config.server.port}`);

    console.log('Starting server');
    const server: Server = Server.bootstrap();

    server.app.on('close', () => {
        rabbit.closeConnection();
        console.log('Server closed');
    });
})();
