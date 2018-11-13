
import { RabbitMQ } from '../utils/rabbitMQ';
import { config } from '../config';

export class UploadBroker {
    static rmqPublisher: RabbitMQ = new RabbitMQ(config.rabbitMQ.exchanges.uploadPublisher);

    public static startPublisher() {
        UploadBroker.rmqPublisher.startPublisher();
    }

    private static publish(routingKey: string, message: string) {
        UploadBroker.rmqPublisher.publish(routingKey, message);
    }

    public static publishUploadSuccessful(videoId: string, videoKey: string) {
        const message: string = JSON.stringify({
            key: videoKey,
            id: videoId,
        });

        UploadBroker.publishMessage(message, 'upload', 'succeeded');
    }

    public static publishUploadCanceled(videoId: string) {
        const message: string = JSON.stringify({
            id: videoId,
        });

        UploadBroker.publishMessage(message, 'upload', 'canceled');
    }

    public static publishMessage(message: string, action: string, status: string) {
        const serverName: string = config.server.name;
        const routingKey = `${serverName}.${action}.${status}`;

        UploadBroker.publish(routingKey, message);
    }
}
