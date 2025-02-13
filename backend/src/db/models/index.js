import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import configFile from '../../config/config.js';

const config = configFile[env];
const db = {};

// Initialize Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false, // Set to console.log if you want SQL logs
});

async function initializeModels() {
  const files = await fs.readdir(__dirname);

  for (const file of files) {
    if (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js') {
      const { default: model } = await import(path.join(__dirname, file));
      const initializedModel = model(sequelize, Sequelize.DataTypes);
      db[initializedModel.name] = initializedModel;
    }
  }

  // Run model associations after all models are initialized
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

// Initialize models
await initializeModels();

export { sequelize };
export default db;
