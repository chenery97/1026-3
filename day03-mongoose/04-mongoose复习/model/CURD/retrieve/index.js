// 查询数据
const db = require('../../db')
const dongmanModel = require('../../models/dongmanModel')

db.then(async () => {
  try {
    const data = await dongmanModel.find({ name: '斗罗大陆' }, { _id: 0, __v: 0 })
    console.log('数据查询成功', data)
  } catch (error) {
    console.log('数据查询失败', error)
  }
})