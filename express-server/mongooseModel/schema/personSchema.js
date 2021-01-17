const mongoose = require('mongoose')
// 获取Schema构造函数
const Schema = mongoose.Schema
// 创建Schema实例对象
module.exports = new Schema({
  p_name: {
    type: String,
    required: true
  },
  p_gender: {
    type: String,
    required: true,
    default: 'male'
  },
  p_password: {
    type: String,
    required: true,
  }
}, {collection: 'personList'})