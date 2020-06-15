const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  color: { type: String, required: true },
  goalText: { type: String, required: true },
  step1: { type: String, required: true }
});

module.exports = mongoose.model('Goal', goalSchema);