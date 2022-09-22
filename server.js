const express = require('express');
const passport = require('passport');
require('dotenv').config();
const userHandler = require('./handler/userHandler');
const authHandler = require('./handler/authHandler');
require('./db/dbConnection');
const expressSession = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(
  expressSession({
    secret: process.env.EXPRESSION_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userHandler);
app.use('/auth', authHandler);

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next();
  } else {
    console.log(err);
    res.status(500).json({ error: 'There was a server side error!' });
  }
});

// listening the server
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});
