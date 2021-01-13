const userModel = require("../../models/userModel");
const db = require("../../db");

db.then(() => {
  (async function () {
    try {
      await userModel.create([
        {
          uuid: Date.now().toString(36),
          username: "老大",
          password: Date.now().toString(36),
        },
        {
          uuid: (Date.now() + 1).toString(36),
          username: "老二",
          password: (Date.now() + 1).toString(36),
        },
        {
          uuid: (Date.now() + 2).toString(36),
          username: "老三",
          password: (Date.now() + 2).toString(36),
        },
        {
          uuid: (Date.now() + 3).toString(36),
          username: "老四",
          password: (Date.now() + 3).toString(36),
        },
      ]);
      console.log('数据插入成功')
    } catch (error) {
      console.log('数据插入失败', error)
    }
  })()
});
