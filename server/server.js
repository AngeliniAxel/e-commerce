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
const queries = require('./database/queries');
const cookieParser = require('cookie-parser');

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

app.use(cookieParser());

app.use('/auth', authRoutes);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/good', isLoggedIn, (req, res) => {
  res.send(`Welcome mr ${req.user[0].name}!`);
});

app.get('/api', async (req, res) => {
  try {
    const test = await pool.query('SELECT * FROM products');
    res.send(test.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/query/:id/:name/:last_name/:img/:email', async (req, res) => {
  try {
    const data = await queries.findOrCreateUser(
      req.params.id,
      req.params.name,
      req.params.last_name,
      req.params.img,
      req.params.email
    );
    res.send(data);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/prueba/:table', async (req, res) => {
  try {
    console.log(req.params.table);
    const test = await pool.query('SELECT * FROM ? WHERE id = 2', [
      req.params.table,
    ]);
    if (!test.rowCount) {
      res.status(401).send('no hay nadas');
    }
    res.send(test);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
