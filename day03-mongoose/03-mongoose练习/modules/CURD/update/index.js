const userModel = require("../../models/userModel");
const db = require("../../db");

db.then(() => {
  (async function () {
    try {
      await userModel.updateOne(
        { username: "Tom" },
        { $set: { password: Date.now().toString(36) } }
      );
      console.log('数据更新成功')
    } catch (error) {
      console.log('数据更新失败', error)
    }
  })();
});
