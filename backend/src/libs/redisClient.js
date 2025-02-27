import { Redis } from 'ioredis';
import { config } from '../configs/app.config.js';

const connectionConfig = {
  host: config.get('redis_db.host'),
  port: config.get('redis_db.port'),
  password: config.get('redis_db.password'),
};

const publisherClient = new Redis(connectionConfig);

const subscriberClient = new Redis(connectionConfig);

const client = new Redis(connectionConfig);

export { connectionConfig, publisherClient, subscriberClient, client };
