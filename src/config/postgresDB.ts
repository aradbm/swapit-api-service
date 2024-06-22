import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

const connectionString = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : undefined,
  database: process.env.PG_DATABASE,
};

const db = pgp(connectionString);

export default db;