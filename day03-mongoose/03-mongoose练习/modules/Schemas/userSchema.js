const mongoose = require('mongoose')

// 获取Schema构造函数
const Schema = mongoose.Schema

// 实例化Schema对象
const userSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  enable: {
    type: Number,
    required: true,
    default: 1
  }
}, {
  collection: 'user_list'
})

// 导出Schema对象
module.exports = userSchema