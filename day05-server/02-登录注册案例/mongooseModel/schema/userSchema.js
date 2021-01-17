const mongoose = require('mongoose')

// 创建Schema对象，并导出
const Schema = mongoose.Schema
module.exports = new Schema({
  username: {
    type: 'String',
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