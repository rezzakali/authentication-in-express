const express = require('express');
const passport = require('passport');
const { initializePassport } = require('../middleware/googleAuth');

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.status(401).send('Unathorized user');
};

const router = express.Router();

initializePassport(passport);

router.get('/', (req, res) => {
  res.send('<a href="/auth/google">Sign in with Google</a>');
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/google/failure',
  })
);

router.get('/google/failure', (req, res) => {
  res.send('log in failed!');
});

router.get('/protected', isLoggedIn, (req, res) => {
  res.send('Protected router');
});

module.exports = router;
