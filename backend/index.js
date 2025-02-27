import {createServer} from 'node:http';
import {config} from './src/configs/app.config.js';
import { Logger } from './src/libs/logger.js';
import {app} from './src/rest-resources/index.js';
import { gracefulShutDown } from './src/libs/gracefulShutDown.js';

const httpServer  = createServer(app)

httpServer.listen({ port: config.get('port') }, () => {
        Logger.info('Server Started ', {
            message: `Listening on ${config.get('port')}`,
        });
    });
    

process.on('SIGTERM', gracefulShutDown);
process.on('SIGINT', gracefulShutDown);
process.on('SIGUSR2', gracefulShutDown);
