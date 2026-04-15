
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

require("dotenv").config();

const app = express();


app.use(express.json());


app.use(cors()); // Allows React to talk to this server

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

// Endpoint to get table data
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gfs_nc_outputs limit 100');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// test route
app.get("/", (req, res) => {
  res.send("Backend is running on port 5000");
});

// port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});