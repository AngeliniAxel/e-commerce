const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./database/db');

const app = express();
const PORT = process.env.PORT || '5000';

app.use(cors());
app.use(bodyParser.json());

app.get('/api', async (req, res) => {
  try {
    const test = await pool.query('SELECT * FROM test');
    res.send(test.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
