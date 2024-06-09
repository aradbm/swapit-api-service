const pgp = require("pg-promise")();
require("dotenv").config(); // Load environment variables

const connectionString = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const db = pgp(connectionString);
module.exports = db;
