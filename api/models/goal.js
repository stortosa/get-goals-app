const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },   //name
  color: { type: String, required: true },
  description: { type: String, required: true }, // goalText
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

module.exports = mongoose.model('Goal', goalSchema);