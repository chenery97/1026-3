const mongoose = require('mongoose')

const {
  Schema
} = mongoose
module.exports = new Schema({
  userId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  hobby: {
    type: Array
  },
  lastLoginDate: {
    type: Date,
    required: true
  },
  usable: {
    type: Number,
    required: true,
    default: 1
  }
}, {
  collection: 'users'
})