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

  label: {
    type: String,
    trim: true,
  },
  value: {
    type: String,
    trim: true,
  },
  user: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  isActive: {
    type: String,
    required: true,
    default: 'Y',
  },
});

module.exports = model('Item', itemSchema);
