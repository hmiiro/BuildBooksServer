const { model, Schema } = require('mongoose');

const { userRoles } = require('../util/rolesAndActions');
const { userActions } = require('../util/rolesAndActions');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  role: {
    type: String,
    required: true,
    default: userRoles.USER
  },
  actions: [
    {
      type: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('User', userSchema);
