import { sequelize } from '../db/models';
import { Logger } from './logger';

export async function gracefulShutDown(signal) {
  try {
    await sequelize.close();
    // await redisPubSub.close()
    Logger.info('Shutting down server', { message: `Received ${signal}` });
  } catch (err) {
    Logger.error('GraceFull ShutDown Failed', err);
  }
  process.exit(0);
}
