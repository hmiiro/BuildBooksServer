const { model, Schema } = require('mongoose');

const billItemSchema = new Schema({
  billNo: {
    type: String,
    trim: true,
    required: true,
  },
  itemCode: {
    type: String,
    trim: true,
    required: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  qty: {
    type: Number,
    required: [true, 'Please add total Items'],
  },
  rate: {
    type: Number,
    required: [true, 'Please add total amount'],
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

module.exports = model('BillItem', billItemSchema);
