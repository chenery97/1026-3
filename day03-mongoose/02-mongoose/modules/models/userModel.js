const mongoose = require('mongoose')
const userSchema = require('../Schemas/userSchema')

// 创建model对象
const userModel = mongoose.model('user_list', userSchema)

// 导出model对象
module.exports = userModel