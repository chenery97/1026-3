const mongoose = require('mongoose')

const Schema = mongoose.Schema
module.exports = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  enable: {
    type: String,
    required: true,
    default: '1'
  }
}, {collection: 'userList'})