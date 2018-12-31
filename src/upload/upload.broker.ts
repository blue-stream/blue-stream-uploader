
import * as rabbit from '../utils/rabbit';
import { config } from '../config';

export class UploadBroker {
    private static publish(routingKey: string, message: string) {
        rabbit.publish('application', 'topic', routingKey, message);
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

    public static publishUploadFailed(videoId: string) {
        const message: string = JSON.stringify({
            id: videoId,
        });

        UploadBroker.publishMessage(message, 'upload', 'failed');
    }

    public static publishMessage(message: string, action: string, status: string) {
        const serverName: string = config.server.name;
        const entity: string = 'video';
        const routingKey = `${serverName}.${entity}.${action}.${status}`;

        UploadBroker.publish(routingKey, message);
    }
}
