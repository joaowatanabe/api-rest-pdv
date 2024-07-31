require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false,
  },
});

module.exports = knex;
