const express = require('express');
const User = require('../schemas/userShcema');
const router = express.Router();
const passport = require('passport');
const { initializePassport } = require('../middleware/passwordAuth');

// initialize passport
initializePassport(passport);

// home router
router.get('/', (req, res) => {
  res.render('index');
});

// register router with get method
router.get('/register', (req, res) => {
  res.render('register');
});

// login router with get method
router.get('/login', (req, res) => {
  res.render('login');
});

// register router
router.post('/register', async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) return res.status(400).send('User already exists!');
  const newUser = await User.create(req.body);
  //   res.status(201).send(newUser);
  res.redirect('/user/login');
});

// login router
router.post(
  '/login',
  passport.authenticate('local', { successRedirect: '/user/' }),
  async (req, res) => {
    try {
      res.status(200).send('logged in successfully!');
    } catch (error) {
      res.status(500).send('logged in failed!');
    }
  }
);
module.exports = router;
