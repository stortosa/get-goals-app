const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db');

const goalRoutes = require('../api/routes/goals.js');
const stepRoutes = require('../api/routes/step.js');
const userRoutes = require('../api/routes/users');

const whiteList = ['http://localhost:3000','http://localhost']
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whiteList.includes(origin);
    cb(null, originIsWhitelisted)
  },
  credentials: true
}
app.use(cors(corsOptions));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));


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
app.use('/user', userRoutes);
app.use('/steps', stepRoutes);

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