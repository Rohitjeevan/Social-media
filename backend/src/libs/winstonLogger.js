const winston = require('winston');
const path = require('node:path');
const { config } = require('../configs/app.config.js');
const util = require('node:util');

const { combine, colorize, label, timestamp, printf } = winston.format;

const LOG_DIR = 'logs';

// Always include console transport
const transports = [new winston.transports.Console({ handleExceptions: true })];

// Add file transport only in development mode, since no sense of creating files in containers in production
if (config.get('env') === 'development') {
  const fileTransports = [
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'error.log'),
      level: 'error',
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'combined.log'),
      handleExceptions: true,
    }),
  ];
  transports.push(...fileTransports);
}

const customFormat = info => {
  if (info.message && typeof info.message === 'string' && info.message.slice(0, 5) === '=====') {
    return info.message;
  }

  let msg = `[PID ${process.pid}] [${info.timestamp}] ${info.label} ${info.level}: `;
  info = typeof info.message === 'object' ? info.message : info;

  msg += info.logTitle ? `${info.logTitle} Message: ${info.message || 'No Message'} ` : info.message || 'No Message ';
  msg += info.class ? `class: ${typeof info.class === 'object' ? util.inspect(info.class) : info.class} ` : '';
  msg += info.context
    ? `context: ${typeof info.context === 'object' ? util.inspect(info.context) : info.context} `
    : '';
  msg += info.metadata
    ? `metadata: ${typeof info.metadata === 'object' ? util.inspect(info.metadata) : info.metadata} `
    : '';
  msg += info.exceptionBacktrace
    ? `exceptionBacktrace: ${typeof info.exceptionBacktrace === 'object' ? util.inspect(info.exceptionBacktrace) : info.exceptionBacktrace} `
    : '';
  msg += info.fault ? `fault: ${typeof info.fault === 'object' ? util.inspect(info.fault) : info.fault} ` : '';
  return msg;
};

const format = combine(
  winston.format(info => {
    info.level = info.level.toUpperCase();
    return info;
  })(),
  colorize(),
  label({ label: config.get('app.name') }),
  timestamp(),
  printf(customFormat),
);

const winstonLogger = winston.createLogger({
  level: config.get('log_level') || 'info',
  transports,
  exitOnError: false,
  format,
});

module.exports = { winstonLogger };
