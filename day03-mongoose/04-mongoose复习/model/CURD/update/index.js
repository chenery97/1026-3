// 更新数据
const db = require('../../db')
const dongmanModel = require('../../models/dongmanModel')

db.then(async () => {
  try {
    await dongmanModel.updateOne({ name: '斗罗大陆' }, { $set: { count: 192 } })
    console.log('数据更新成功')
  } catch (error) {
    console.log('数据更新失败', error)
  }
})