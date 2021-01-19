const express = require('express')
const path = require('path')
const router = express.Router()

// 注册页面的静态资源路由
router.get("/register", (request, response) => {
  const filePath = path.resolve(__dirname, '../assets/register.html')
  response.sendFile(filePath);
});
// 登录页面的静态资源路由
router.get("/login", (request, response) => {
  const filePath = path.resolve(__dirname, '../assets/login.html')
  response.sendFile(filePath);
});
// 用户中心页面的静态资源路由
router.get("/userCenter", (request, response) => {
  const { p_name } = request.query;
  response.render("userCenter", { p_name: p_name });
});

module.exports = router
