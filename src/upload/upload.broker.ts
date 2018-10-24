
import { RabbitMQ } from '../utils/rabbitMQ';
import { config } from '../config';

export class UploadBroker {
    static rmqPublisher: RabbitMQ = new RabbitMQ(config.rabbitMQ.exchanges.uploadPublisher);

    public static startPublisher() {
        UploadBroker.rmqPublisher.startPublisher();
    }

    public static publish(routingKey: string, message: string) {
        UploadBroker.rmqPublisher.publish(routingKey, message);
    }
}
