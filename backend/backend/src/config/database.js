import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'voting_system',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});