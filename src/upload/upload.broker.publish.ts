
import * as rabbit from '../utils/rabbit';
import { config } from '../config';

export class UploadPublishBroker {
    public static publishUploadSuccessful(videoId: string, videoKey: string, userId: string) {
        const message = {
            userId,
            key: videoKey,
            id: videoId,
        };

        UploadPublishBroker.publishMessage(message, 'succeeded');
    }

    public static publishUploadCanceled(videoId: string) {
        const message = {
            id: videoId,
        };

        UploadPublishBroker.publishMessage(message, 'canceled');
    }

    public static publishUploadFailed(videoId: string) {
        const message = {
            id: videoId,
        };

        UploadPublishBroker.publishMessage(message, 'failed');
    }

    public static publishMessage(message: any, status: string) {
        const serverName: string = 'uploader';
        const entity: string = 'video';
        const action: string = 'upload';
        const routingKey = `${serverName}.${entity}.${action}.${status}`;
        const exchange: string = config.rabbitMQ.exchange;
        const type: string = config.rabbitMQ.type;

        rabbit.publish(exchange, type, routingKey, message, { persistent: true });
    }
}
