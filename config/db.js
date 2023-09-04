const pgp = require("pg-promise")();
const connectionString = "postgres://postgres:postgrespw@localhost:32772"; // Updated string
const db = pgp(connectionString);
module.exports = db;
