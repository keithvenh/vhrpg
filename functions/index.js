const functions = require('firebase-functions');
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

require('dotenv').config(); // This line ensures environment variables from .env are available

const connectionString = process.env.ELEPHANTSQL_CONNECTION_STRING;

const app = express();

// Enable CORS for all routes
app.use(cors());

// Database connection setup
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Sample route to get data from a table named "items"
app.get('/rolls', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM rolls');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Export the app as a Cloud Function
exports.api = functions.https.onRequest(app);