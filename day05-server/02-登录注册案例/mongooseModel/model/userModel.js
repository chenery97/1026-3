const mongoose = require('mongoose')
const userSchema = require('../schema/userSchema')

// 创建model对象，并导出
module.exports = mongoose.model('userList', userSchema)