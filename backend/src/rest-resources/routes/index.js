import express from 'express';
import { Logger } from '../../libs/logger';
import { healthCheck } from '../../libs/onHealthCheck';
import { contextMiddleware } from '../middlewares/context.middleware.js';
import { apiRouter } from './api';

const routes = express.Router();

routes.use('/api', contextMiddleware(false), apiRouter);

routes.get('/health-check', async (_, res) => {
  try {
    const response = await healthCheck();
    res.json(response);
  } catch (error) {
    Logger.error(error);
    res.status(503).send();
  }
}); 

export { routes };
