// 创建model
const mongoose = require('mongoose')
const dongmanSchema = require('../Schemas/dongmanSchema')

const dongmanModel = mongoose.model('dongmanList', dongmanSchema)

module.exports = dongmanModel