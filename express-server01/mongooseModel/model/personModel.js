const mongoose = require('mongoose')
const personSchema = require('../schema/personSchema')

// 创建model对象
module.exports = mongoose.model('personList', personSchema)