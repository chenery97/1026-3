// 往数据库插入数据
const db = require('../../db')
const dongmanModel = require('../../models/dongmanModel')

db.then(async () => {
  try {
    await dongmanModel.create({
      name: 'chenery',
      count: 39,
      uuid: Date.now().toString(36)
    })
    console.log('数据插入成功')
  } catch (error) {
    console.log('数据插入失败', error)
  }
})