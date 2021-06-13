const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./database/db');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const authRoutes = require('./routes/auth-routes');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
require('./config/passport-setup');

const PORT = process.env.PORT || '5000';

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'ecommerce-session',
    keys: ['key1', 'key2'],
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/auth', authRoutes);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/good', isLoggedIn, (req, res) =>
  res.send(`Welcome mr ${req.user.displayName}!`)
);

app.get('/api', async (req, res) => {
  try {
    const test = await pool.query('SELECT * FROM products');
    res.send(test.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/prueba', async (req, res) => {
  try {
    const test = await pool.query('SELECT * FROM products WHERE id = 10');
    if (!test.rowCount) {
      res.status(401).send('no hay nadas');
    }
    res.send(test);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
