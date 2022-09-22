const mongoose = require('mongoose');

mongoose
  .connect(
    `${process.env.DATABASE_CONNECTION_STRING}/${process.env.DATABASE_NAME}`
  )
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch(() => {
    console.log('Database connection failed!');
  });
