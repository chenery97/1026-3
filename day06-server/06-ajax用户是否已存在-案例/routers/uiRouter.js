const express = require('express')
const path = require('path')
const userModel = require('../mongooseModel/model/personModel')
const router = express.Router()

// 注册页面的静态资源路由
router.get('/register', (request, response) => {
  const filePath = path.resolve(__dirname, '../assets/register.html')
  response.sendFile(filePath)
})
// 登录页面的静态资源路由
router.get('/login', (request, response) => {
  const filePath = path.resolve(__dirname, '../assets/login.html')
  response.sendFile(filePath)
})
// 用户中心页面的静态资源路由
router.get('/userCenter', async (request, response) => {
  const { uid } = request.session
  if (!uid) response.redirect('http://localhost:5000/login')
  else {
    const user = await userModel.findOne({ _id: uid })
    response.render('userCenter', { p_name: user.p_name })
  }
})

module.exports = router
