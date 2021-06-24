const passport = require('passport');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { findOrCreateUser } = require('../database/queries');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CONSUMER_ID,
      clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await findOrCreateUser(
        profile._json.sub,
        profile._json.given_name,
        profile._json.family_name,
        profile._json.picture,
        profile._json.email
      );
      return done(null, user);
    }
  )
);
