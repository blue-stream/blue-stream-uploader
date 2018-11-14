require('dotenv').config();

export enum StorageType {
    Disk = 'Disk',
    S3 = 'S3',
}

export const config = {
    logger: {
        durable: process.env.RMQ_LOGGER_DURABLE || false,
        exchangeType: process.env.RMQ_LOGGER_TYPE || 'topic',
        exchange: process.env.RMQ_LOGGER_EXCHANGE || 'blue_stream_logs',
        host: process.env.RMQ_LOGGER_HOST || 'localhost',
        port: process.env.RMQ_LOGGER_PORT || 15672,
        password: process.env.RMQ_LOGGER_PASS || 'guest',
        username: process.env.RMQ_LOGGER_USER || 'guest',
        persistent: process.env.RMQ_LOGGER_PERSISTENT || false,
    },
    rabbitMQ: {
        host: process.env.RMQ_HOST || 'localhost',
        port: +(process.env.RMQ_PORT || 5672),
        password: process.env.RMQ_PASSWORD || 'guest',
        username: process.env.RMQ_USERNAME || 'guest',
        exchanges: {
            uploadPublisher: 'upload',
        },
        reconnect_timeout: 1000,
    },
    server: {
        port: +(process.env.PORT || 3000),
        name: process.env.SERVICE_NAME || 'uploader',
    },
    authentication: {
        required: true,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018',
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'],
    },
    upload: {
        formats: ['.mp4', '.flv', '.avi', '.mkv', 'mpg', 'mpeg'],
        storage:  process.env.STORAGE_TYPE || StorageType.S3,
        maxSize: process.env.MAX_FILE_SIZE || 209715200,
        maxFilesAmount: +(process.env.MAX_FILE_AMOUNT || 1),
        fileKey: process.env.FILE_KEY || 'videoFile',
        disk: {
            path: process.env.DISK_PATH || 'C:/BlueStream/Uploads/',
        },
        s3: {
            region: process.env.S3_REGION || '',
            bucket: process.env.S3_BUCKET || '',
            accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
            signatureVersion: process.env.S3_VERSION || 'v4',
            endpoint: process.env.S3_ENDPOINT || 'http://172.19.165.113:9000',
        },
    },
};