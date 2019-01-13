
import * as rabbit from '../utils/rabbit';
import { config } from '../config';

export class UploadBroker {
    public static publishUploadSuccessful(videoId: string, videoKey: string) {
        const message = {
            key: videoKey,
            id: videoId,
        };

        UploadBroker.publishMessage(message, 'succeeded');
    }

    public static publishUploadCanceled(videoId: string) {
        const message = {
            id: videoId,
        };

        UploadBroker.publishMessage(message, 'canceled');
    }

    public static publishUploadFailed(videoId: string) {
        const message = {
            id: videoId,
        };

        UploadBroker.publishMessage(message, 'failed');
    }

    public static publishMessage(message: any, status: string) {
        const serverName: string = config.server.name;
        const entity: string = 'video';
        const action: string = 'upload';
        const routingKey = `${serverName}.${entity}.${action}.${status}`;
        const exchange: string = config.rabbitMQ.exchange;
        const type: string = config.rabbitMQ.type;

        rabbit.publish(exchange, type, routingKey, message, { persistent: true });
    }
}
