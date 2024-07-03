const router = require('express').Router();
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000/';

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user[0],
      cookies: req.cookies,
    });
  } else {
    res.redirect('/auth/google');
  }
});

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

// When logout, redirect to client
router.get('/logout', (req, res) => {
  req.session = null;
  req.user = null;
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

// redirect to home page after successfully login via Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login/failed' }),
  function (req, res) {
    res.redirect(CLIENT_HOME_PAGE_URL);
  }
);

module.exports = router;
