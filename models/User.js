const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    maxlength: [50, 'Name must be under 50 characters'],
    minlength: [2, 'Name must be at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already in use'],
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  permission: {
    type: String,
    default: 'user',
    enum: {
      values: ['user', 'student', 'moderator', 'teacher'],
      default: 'user',
    },
  },
}).pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync());
  next();
});
UserSchema.methods.comparePassword = async function (submittedPassword) {
  const isMatch = bcrypt.compare(submittedPassword, this.password);
  return isMatch;
};
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '10d',
    }
  );
};

module.exports = mongoose.model('User', UserSchema);
