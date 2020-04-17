const { model, Schema } = require('mongoose');

const itemSchema = new Schema({
  itemCode: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  desc: {
    type: String,
    trim: true,
  },

  rate: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: String,
    required: true,
    default: 'Y',
  },
  user: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Item', itemSchema);
