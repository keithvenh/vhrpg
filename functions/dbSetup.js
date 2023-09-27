const { Pool } = require('pg');
require('dotenv').config(); // This line ensures environment variables from .env are available

const connectionString = process.env.ELEPHANTSQL_CONNECTION_STRING;


const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
