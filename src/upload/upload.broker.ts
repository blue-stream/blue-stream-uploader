
import { RabbitMQ } from '../utils/rabbitMQ';
import { config } from '../config';

export class UploadService {
    static rmqPublisher: RabbitMQ = new RabbitMQ(config.rabbitMQ.exchanges.uploadPublisher);

    public static startPublisher() {
        UploadService.rmqPublisher.startPublisher();
    }

    public static publish(routingKey: string, message: string) {
        UploadService.rmqPublisher.publish(routingKey, message);
    }

    private static messageHandler(message: string) {
        console.log(message);
    }
}
