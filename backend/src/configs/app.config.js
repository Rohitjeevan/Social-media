const convict = require('convict');
const dotenv = require('dotenv');
const fs = require('node:fs');

if (fs.existsSync('.env')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env'));

  for (const key in envConfig) {
    process.env[key] = envConfig[key];
  }
}

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'Backoffice-API',
    },
    url: {
      doc: 'URL of the service',
      format: String,
      default: 'user-backend:8003',
      env: 'APP_URL',
    },
    appName: {
      doc: 'Name of the application',
      format: String,
      default: 'Backoffice API',
      env: 'APP_NAME',
    },
  },

  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL',
  },

  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },

  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
  },

  db: {
    name: {
      doc: 'Database Name',
      format: String,
      default: 'api',
      env: 'DB_NAME',
    },
    username: {
      doc: 'Database user',
      format: String,
      default: 'postgres',
      env: 'DB_USERNAME',
    },
    password: {
      doc: 'Database password',
      format: '*',
      default: 'postgres',
      env: 'DB_PASSWORD',
    },
    host: {
      doc: 'DB host',
      format: String,
      default: '127.0.0.1',
      env: 'DB_HOST',
    },
    port: {
      doc: 'DB PORT',
      format: 'port',
      default: '5432',
      env: 'DB_PORT',
    },
  },

  redis_db: {
    password: {
      doc: 'Redis Database password',
      format: '*',
      default: '',
      env: 'REDIS_DB_PASSWORD',
    },
    host: {
      doc: 'Redis DB host',
      format: String,
      default: '127.0.0.1',
      env: 'REDIS_DB_HOST',
    },
    port: {
      doc: 'Redis DB PORT',
      format: 'port',
      default: 6379,
      env: 'REDIS_DB_PORT',
    },
  },

  jwt: {
    secret: {
      doc: 'JWT Secret key used in signing tokens',
      format: String,
      default: 'sshh',
      env: 'JWT_SECRET',
    },
    expire: {
      doc: 'JWT token expiration time',
      format: '*',
      default: '1 hour',
      env: 'JWT_EXP',
    },
  },

  s3: {
    region: {
      doc: 'S3 Region',
      format: String,
      default: 'us-east-1',
      env: 'S3_REGION',
    },
    endpoint: {
      doc: 'Endpoint',
      format: String,
      default: 'localhost:9000',
      env: 'S3_ENDPOINT',
    },
    bucket: {
      doc: 'Bucket',
      format: String,
      default: 'zodiac',
      env: 'S3_BUCKET',
    },
    useMinioConfig: {
      doc: 'Endpoint',
      format: Boolean,
      default: true,
      env: 'S3_MINIO',
    },
    key: {
      doc: 'Key',
      format: String,
      env: 'S3_KEY',
      default: '',
    },
    secret: {
      doc: 'Secret',
      format: String,
      env: 'S3_SECRET',
      default: '',
    },
    url: {
      doc: 'For public url contruction',
      format: String,
      env: 'S3_URL',
      default: '',
    },
  },

  currencyCode: {
    doc: 'Currency code to use thoughout the application',
    format: String,
    default: 'USD',
    env: 'CURRENCY_CODE',
  },
});

config.validate({ allowed: 'strict' });

module.exports = { config };
