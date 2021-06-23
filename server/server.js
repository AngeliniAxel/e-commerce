const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./database/db');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth-routes');
const cartRoutes = require('./routes/cart_routes');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
require('./config/passport-setup');
const queries = require('./database/queries');
const cookieParser = require('cookie-parser');
const cart_productsRoutes = require('./routes/cart_products-routes');

const PORT = process.env.PORT || '5000';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'ecommerce-session',
    keys: ['key1', 'key2'],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use('/auth', authRoutes);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use('/api/cart', cartRoutes);

app.use('/api/cart_products', cart_productsRoutes);

app.get('/api', async (req, res) => {
  try {
    const test = await pool.query('SELECT * FROM products');
    res.send(test.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
