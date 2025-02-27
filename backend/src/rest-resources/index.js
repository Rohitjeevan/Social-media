import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { i18n } from '../libs/i18n.js';
import { winstonLogger } from '../libs/winstonLogger.js';
import { routes } from './routes/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';

const app = express();

// CORS Configuration
app.use(
  cors({
    credentials: true,
    origin: '*',
    methods: ['GET, POST, PUT, PATCH, DELETE'],
  }),
);

app.use(helmet());

app.use(express.json());

app.use(
  morgan('tiny', {
    stream: { write: log => winstonLogger.info(log.trimEnd()) },
  }),
);

app.use(compression());

app.use(i18n.init);

app.use(routes);

app.use((req, res) => {
  return res.status(404).json({ status: 'Not Found' });
});


app.use(errorHandlerMiddleware);

export { app };
