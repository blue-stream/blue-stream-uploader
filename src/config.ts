require('dotenv').config();

export enum StorageType {
    Disk,
    S3,
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
        port: 3000,
        name: 'uploader',
    },
    authentication: {
        required: false,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018', // Don't use static value in production! remove from source control!
    },
    upload: {
        formats: ['.mp4', '.flv', '.avi', '.mkv', 'mpg', 'mpeg'],
        storage: StorageType.Disk,
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
        port: process.env.PORT ? +process.env.PORT : 3000,
        name: 'uploader',
    },
    authentication: {
        required: true,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018', // Don't use static value in production! remove from source control!
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
        required: true,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018', // Don't use static value in production! remove from source control!
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
        },
    },
};

const configuration: { [index: string]: Configuration } = {
    development,
    production,
    test,
};

export const config = configuration[process.env.NODE_ENV || 'development'];
