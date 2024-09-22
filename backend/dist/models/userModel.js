"use strict";

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    "default": Date.now
  },
  isBlockend: {
    type: Boolean,
    "default": false
  },
  isAdmin: {
    type: Boolean,
    "default": false
  }
});
module.exports = mongoose.model('User', userSchema);