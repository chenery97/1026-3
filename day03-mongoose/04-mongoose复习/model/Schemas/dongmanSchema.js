// 创建Schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dongmanSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  enable: {
    type: Number,
    required: true,
    default: 1
  }
}, {collection: 'dongmanList'})

module.exports = dongmanSchema