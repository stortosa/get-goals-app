const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', require: true },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);