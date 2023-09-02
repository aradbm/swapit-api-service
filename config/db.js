const pgp = require("pg-promise")();
const connectionString = "postgres://postgres:postgrespw@localhost:32769"; // Updated string
const db = pgp(connectionString);
module.exports = db;
