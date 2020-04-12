const mongoose = require('mongoose');

const isActive = {
  ACTIVE: 'Y',
  INACTIVE: 'N'
};

const levelSchema = new mongoose.Schema({
  levelId: {
    type: String,
    trim: true,
    required: true
  },
  name: {
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

module.exports = mongoose.model('Level', levelSchema);
