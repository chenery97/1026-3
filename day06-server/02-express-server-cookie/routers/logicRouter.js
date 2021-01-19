const express = require('express')
const router = express.Router()
const personModel = require("../mongooseModel/model/personModel");

// 注册页面的post请求路由
router.post("/register", async (request, response) => {
  // 往数据库添加数据
  await personModel.create(request.body);
  response.send("注册成功");
});
// 登录页面的post请求路由
router.post("/login", async (request, response) => {
  const { p_name, p_password } = request.body;
  // 查询数据库中的数据
  const re = await personModel.findOne({ p_name, p_password });
  if (!re) {
    response.send("用户名或密码错误");
  } else {
    // 登录成功响应cookie给浏览器存储用户的信息
    response.cookie('username', p_name, {maxAge: 1000 * 60 * 60})
    // 用户名密码正确重定向到用户中心页面
    response.redirect("/userCenter");
  }
});

module.exports = router
