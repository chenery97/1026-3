const userModel = require("../../models/userModel");
const db = require("../../db");

db.then(() => {
  /* userModel.find({ username: /^L/ }, { _id: 0, __v: 0 }).then((data) => {
    console.log(data);
  }); */
  (async function () {
    try {
      const re = await userModel.find({ username: /^L/ }, { _id: 0, __v: 0 })
      console.log('数据查询成功', re)
    } catch (error) {
      console.log('数据查询失败', error)
    }
  })()
});
