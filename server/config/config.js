const dotenv = require("dotenv");
dotenv.config();

module.exports = {

  "development": {
    "username": process.env.DATABASE_USERNAME || "root",
    "password": process.env.DATABASE_PASSWORD || "",
    "database": process.env.DATABASE_NAME || "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DATABASE_USERNAME || "root",
    "password": process.env.DATABASE_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "dialect": "mysql"
  }
}
