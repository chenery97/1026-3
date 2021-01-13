// 创建stuModel
// 1.引入mongoose stuSchema模块
const mongoose = require('mongoose')
const stuSchema = require("../Schemas/stuSchema");

// 2.创建集合
const stuModel = mongoose.model('stu_list', stuSchema)

// 外部需要用到stuModel对象，所以把它导出
module.exports = stuModel