const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./db');

const goalRoutes = require('../api/routes/goals.js');
const orderRoutes = require('../api/routes/orders.js');
const userRoutes = require('../api/routes/users');

// mongoose.connect(
//   'mongodb+srv://goalUser:' +
//   process.env.MONGO_ATLAS_PW +
//   '@goals-app-p9rxi.mongodb.net/goalUserDB?retryWrites=true&w=majority',
//   {
//     useMongoClient: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log('Mongodb connected....')
//   })

// mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')   // en * va la url
  res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Method', 'POST, PUT, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

// Routes which should handle requests
app.use('/goals', goalRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.mesagge
    }
  })
});

module.exports = app;