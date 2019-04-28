enum StorageType {
    S3 = 'S3',
    Disk = 'Disk',
}

export const config = {
    logger: {
        elasticsearch: process.env.LOGGER_ELASTICSEARCH && {
            hosts: process.env.LOGGER_ELASTICSEARCH.split(','),
        },
    },
    rabbitMQ: {
        host: process.env.RMQ_HOST || 'localhost',
        port: +(process.env.RMQ_PORT || 5672),
        password: process.env.RMQ_PASSWORD || 'guest',
        username: process.env.RMQ_USERNAME || 'guest',
        exchange: process.env.RMQ_EXCHANGE || 'application',
        type: process.env.RMQ_TYPE || 'topic',

        reconnect_timeout: 1000,
    },
    server: {
        port: +(process.env.PORT || 5002),
        name: process.env.SERVICE_NAME || 'blue-stream-uploader',
    },
    authentication: {
        required: process.env.AUTHENTICATION_REQUIRED || true,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018',
    },
    apm: {
        server: process.env.APM_SERVER || 'http://apm:8200',
        isActive: +(process.env.APM_ACTIVE || 1),
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost'],
    },
    upload: {
        formats: ['.mp4', '.flv', '.avi', '.mkv', '.mpg', '.mpeg', '.m4v', '.mov', '.wmv', '.ogg'],
        storage: process.env.STORAGE_TYPE || StorageType.S3,
        maxSize: process.env.MAX_FILE_SIZE || 20971520000,
        maxFilesAmount: +(process.env.MAX_FILE_AMOUNT || 1),
        fileKey: process.env.FILE_KEY || 'videoFile',
        disk: {
            path: process.env.DISK_PATH || 'C:/BlueStream/Uploads/',
        },
        s3: {
            region: process.env.S3_REGION || 'us-east-1',
            bucket: process.env.S3_BUCKET || 'blue-stream-test',
            accessKeyId: process.env.S3_ACCESS_KEY_ID || 'minio',
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'minio123',
            signatureVersion: process.env.S3_VERSION || 'v4',
            endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
        },
    },
};
