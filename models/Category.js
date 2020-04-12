const mongoose = require('mongoose');

const isActive = {
  ACTIVE: 'Y',
  INACTIVE: 'N'
};

const CategorySchema = new mongoose.Schema({
  catId: {
    type: String,
    trim: true,
    required: true
  },
  catName: {
    type: String,
    trim: true,
    required: [true, 'Please add a category name']
  },
  isActive: {
    type: String,
    required: true,
    default: isActive.ACTIVE
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', CategorySchema);
