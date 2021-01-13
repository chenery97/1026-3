const userModel = require('../../models/userModel')
const db = require('../../db')

db.then(() => {
  (async function () {
    try {
      const re = await userModel.deleteMany({ username: /[^a-zA-z]+/ })
      if (re.deletedCount) {
        console.log('成功删除', re.deletedCount, '条数据')
      } else {
        console.log('没有匹配到可删除的数据')
      }
    } catch (error) {
      console.log('数据删除失败', error)
    }
  })()
})