const mongoose = require('mongoose');

const stepSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Step', stepSchema);