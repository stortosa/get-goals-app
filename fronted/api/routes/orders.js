const express = require('express');
const router = express.Router();
const morgan = require('morgan')
const mongoose = require('mongoose');

const Order = require('../models/order');

// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    goal: req.body.goalId
  });
  order
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Orders details',
    orderId: req.params.orderId
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Orders deleted',
    orderId: req.params.orderId
  });
});

module.exports = router;