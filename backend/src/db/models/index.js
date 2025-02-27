import fs from 'node:fs';
import path from 'node:path';
import { Sequelize } from 'sequelize';
import * as databaseConfig from '../../configs/database.config.js';

const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const config = databaseConfig[env];

/**
 * @type {Object.<string, import('sequelize').ModelStatic>}
 */
const db = {};

/**
 * @type {import('sequelize').Sequelize}
 */
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { sequelize };

export default db;
