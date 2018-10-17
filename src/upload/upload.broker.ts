
import { RabbitMQ } from '../utils/rabbitMQ';
import { config } from '../config';

export class UploadService {
    static rmqReceiver: RabbitMQ = new RabbitMQ(config.rabbitMQ.exchanges.uploadReceiver);
    static rmqPublisher: RabbitMQ = new RabbitMQ(config.rabbitMQ.exchanges.uploadPublisher);

    public static startReceiver() {
        UploadService.rmqReceiver.startReceiver(UploadService.messageHandler);
    }

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
