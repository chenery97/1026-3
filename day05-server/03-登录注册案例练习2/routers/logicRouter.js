const express = require('express')
const userModel = require('../mongooseModel/model/userModel')

const router = express.Router()

// 4.定义路由
router.post("/login", async (request, response) => {
  // 获取客户端提交的数据
  const { username, password } = request.body;
  // 根据数据查询数据库是否有匹配的用户
  const re = await userModel.findOne({ username, password });
  if (re)
    response.redirect(
      "http://localhost:5000/userCenter?username=" + username
    );
  else response.send("用户名或密码错误");
});

router.post("/register", (request, response) => {
  // 获取客户端提交的数据
  const { username, password } = request.body;
  // 往数据库中插入数据
  userModel.create({ username, password }).then(
    () => {
      response.send("注册成功");
    },
    (reason) => {
      if (reason.code === 11000) response.send(username + "用户已存在");
    }
  );
});


module.exports = router