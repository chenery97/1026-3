const mongoose = require('mongoose')

// 获取Schema构造函数
const Schema = mongoose.Schema
// 创建schema对象
module.exports = new Schema({
  username: {
    type: String,
    required: true
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