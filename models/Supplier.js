const { model, Schema } = require('mongoose');

const supplierSchema = new Schema({
  supId: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  contact: {
    type: String,
    trim: true
  },
  isActive: {
    type: String,
    required: true,
    default: 'Y'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Supplier', supplierSchema);
