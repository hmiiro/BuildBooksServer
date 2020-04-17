const { model, Schema } = require('mongoose');

const { billStatus } = require('../util/status');

const billSchema = new Schema({
  transDt: {
    type: String,
    trim: true,
    required: true,
  },
  billNo: {
    type: String,
    trim: true,
    required: true,
  },
  totItems: {
    type: Number,
    required: [true, 'Please add total Items'],
  },
  totAmt: {
    type: Number,
    required: [true, 'Please add total amount'],
  },
  totPaid: {
    type: Number,
    required: [true, 'Please add total payment'],
  },
  totBal: {
    type: Number,
    required: [true, 'Please add total balance'],
  },
  supplier: {
    type: String,
    trim: true,
    default: 'General',
  },
  status: {
    type: String,
    required: true,
    default: billStatus.NOTPAID,
  },
  isActive: {
    type: String,
    required: true,
    default: 'Y',
  },
  user: {
    type: String,
  },
  billItems: [
    {
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
    },
  ],
  createdAt: { type: Date, required: true },
});

module.exports = model('Bill', billSchema);
