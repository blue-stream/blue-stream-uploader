require('dotenv').config();

export enum StorageType {
    Disk = 'Disk',
    S3 = 'S3',
}

export type Configuration = {
    logger: {
        durable: boolean;
        exchangeType: string;
        exchange: string;
        host: string;
        port: number;
        password: string;
        username: string;
        persistent: boolean;
    };
    rabbitMQ: {
        host: string;
        exchanges: {
            uploadPublisher: string;
        };
        reconnect_timeout: number;
    };
    server: {
        port: number,
        name: string,
    };
    authentication: {
        required: boolean;
        secret: string;
    };
    cors: {
        allowedOrigins: string[];
    }
    upload: {
        storage: StorageType;
        formats: string[];
        maxSize: number;
        maxFilesAmount: number;
        fileKey: string;
        disk: {
            path: string;
        };
        s3: {
            region: string;
            bucket: string;
            accessKeyId: string;
            secretAccessKey: string;
            signatureVersion: string;
            endpoint: string;
            url: string;
        }
    }
};

const development: Configuration = {
    logger: {
        durable: false,
        exchangeType: 'topic' || process.env.RMQ_LOGGER_TYPE,
        exchange: 'blue_stream_logs' || process.env.RMQ_LOGGER_EXCHANGE,
        host: 'localhost' || process.env.RMQ_LOGGER_HOST,
        port: 15672 || process.env.RMQ_LOGGER_PORT,
        password: 'guest' || process.env.RMQ_LOGGER_PASS,
        username: 'guest' || process.env.RMQ_LOGGER_USER,
        persistent: false,
    },
    rabbitMQ: {
        host: 'localhost',
        exchanges: {
            uploadPublisher: 'upload',
        },
        reconnect_timeout: 1000,
    },
    server: {
        port: 3003,
        name: 'uploader',
    },
    authentication: {
        required: true,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018', // Don't use static value in production! remove from source control!
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'],
    },
    upload: {
        formats: ['.mp4', '.flv', '.avi', '.mkv', 'mpg', 'mpeg'],
        storage: StorageType.S3,
        maxSize: 20971520000,
        maxFilesAmount: 1,
        fileKey: 'videoFile',
        disk: {
            path: 'C:/BlueStream/Uploads/',
        },
        s3: {
            region: process.env.REGION || '',
            bucket: process.env.BUCKET || '',
            accessKeyId: process.env.ACCESS_KEY_ID || '',
            secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
            url: process.env.S3_URL || '',
            signatureVersion: 'v4',
            endpoint: 'http://172.19.165.113:9000',
        },
    },
};

const production: Configuration = {
    logger: {
        durable: false,
        exchangeType: 'topic' || process.env.RMQ_LOGGER_TYPE,
        exchange: 'blue_stream_logs' || process.env.RMQ_LOGGER_EXCHANGE,
        host: 'localhost' || process.env.RMQ_LOGGER_HOST,
        port: 15672 || process.env.RMQ_LOGGER_PORT,
        password: 'guest' || process.env.RMQ_LOGGER_PASS,
        username: 'guest' || process.env.RMQ_LOGGER_USER,
        persistent: false,
    },
    rabbitMQ: {
        host: 'localhost',
        exchanges: {
            uploadPublisher: 'upload',
        },
        reconnect_timeout: 1000,
    },
    server: {
        port: process.env.PORT ? +process.env.PORT : 3003,
        name: 'uploader',
    },
    authentication: {
        required: true,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018', // Don't use static value in production! remove from source control!
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'],
    },
    upload: {
        formats: ['.mp4', '.flv', '.avi', '.mkv', 'mpg', 'mpeg'],
        storage: StorageType.S3,
        maxSize: 209715200,
        maxFilesAmount: 1,
        fileKey: 'videoFile',
        disk: {
            path: 'C:/BlueStream/Uploads/',
        },
        s3: {
            region: process.env.REGION || '',
            bucket: process.env.BUCKET || '',
            accessKeyId: process.env.ACCESS_KEY_ID || '',
            secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
            url: process.env.S3_URL || '',
            signatureVersion: 'v4',
            endpoint: 'http://172.19.165.113:9000',
        },
    },
};

const test: Configuration = {
    logger: {
        durable: false,
        exchangeType: 'topic' || process.env.RMQ_LOGGER_TYPE,
        exchange: 'blue_stream_logs' || process.env.RMQ_LOGGER_EXCHANGE,
        host: 'localhost' || process.env.RMQ_LOGGER_HOST,
        port: 15672 || process.env.RMQ_LOGGER_PORT,
        password: 'guest' || process.env.RMQ_LOGGER_PASS,
        username: 'guest' || process.env.RMQ_LOGGER_USER,
        persistent: false,
    },
    rabbitMQ: {
        host: 'localhost',
        exchanges: {
            uploadPublisher: 'upload',
        },
        reconnect_timeout: 1000,
    },
    server: {
        port: process.env.PORT ? +process.env.PORT : 3000,
        name: 'uploader',
    },
    authentication: {
        required: false,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018', // Don't use static value in production! remove from source control!
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'],
    },
    upload: {
        formats: ['.mp4', '.flv', '.avi', '.mkv', 'mpg', 'mpeg'],
        storage: StorageType.S3,
        maxSize: 209715200,
        maxFilesAmount: 1,
        fileKey: 'videoFile',
        disk: {
            path: 'C:/BlueStream/Uploads/',
        },
        s3: {
            region: process.env.REGION || '',
            bucket: process.env.BUCKET || '',
            accessKeyId: process.env.ACCESS_KEY_ID || '',
            secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
            url: process.env.S3_URL || '',
            signatureVersion: 'v4',
            endpoint: 'http://172.19.165.113:9000',
        },
    },
};

const configuration: { [index: string]: Configuration } = {
    development,
    production,
    test,
};

export const config = configuration[process.env.NODE_ENV || 'development'];
