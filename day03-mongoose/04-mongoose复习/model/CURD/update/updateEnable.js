// 删除数据时改变enable的状态
const dongmanModel = require('../../models/dongmanModel')

function updateEnable(target) {
  return dongmanModel.updateMany(target, {$set: {enable: 0}})
}

module.exports = updateEnable