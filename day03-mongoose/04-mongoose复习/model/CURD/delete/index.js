// 删除数据
const db = require('../../db')
const updateEnable = require('../update/updateEnable')

db.then(async () => {
  try {
    await updateEnable({ name: /\w/gi });
    console.log('数据删除成功')
  } catch (error) {
    console.log('数据删除失败')
  }
})