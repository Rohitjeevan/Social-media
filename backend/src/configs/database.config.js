const { config } = require('./app.config');
const { winstonLogger } = require('../libs/winstonLogger');

const commonSetting = {
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  host: config.get('db.host'),
  port: config.get('db.port'),
  dialect: 'postgres',
  dialectOptions: {
    application_name: config.get('app.name'),
  },
  define: {
    underscored: true,
    timestamps: true,
  },
  minifyAliases: true,
  pool: {
    max: 50,
    min: 0,
    idle: 5000,
    evict: 5000,
    acquire: 200000,
  },
};

module.exports = {
  development: {
    ...commonSetting,
    logging: log => winstonLogger.info(log),
  },

  test: {
    ...commonSetting,
  },

  staging: {
    ...commonSetting,
  },
  production: {
    ...commonSetting,
  },
};
