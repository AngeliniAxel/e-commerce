const Pool = require('pg').Pool;
require('dotenv').config();

const HOST = 'localhost';
const PORT = 5432;

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  host: HOST,
  port: PORT,
  database: 'ecommerce',
});

module.exports = pool;
