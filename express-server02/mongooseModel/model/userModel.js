const mongoose = require('mongoose')
const userSchema = require('../schema/userSchema')

// 创建model
module.exports = mongoose.model('userList', userSchema)