const express = require('express')
const router = express.Router()
const path = require('path')
const userModel = require('../mongooseModel/model/userModel')

router.get('/register', (req, res) => {
  // 拼接注册页面的绝对路径
  const filePath = path.resolve(__dirname, '../public/register.html')
  // 返回注册页面
  res.sendFile(filePath)
})

router.get('/login', (req, res) => {
  // 拼接登录页面的绝对路径
  const filePath = path.resolve(__dirname, '../public/login.html')
  // 返回登录页面
  res.sendFile(filePath)
})

router.get('/userCenter', async (req, res) => {
  // 获取session中的uid
  const uid = req.session.uid
  // 查询数据库uid对应的用户
  const user = await userModel.findOne({ _id: uid })
  // 判断用户是否存在
  if (!user) {
    // 如果不存在则重定向到登录页面
    res.redirect('http://localhost:5000/login')
  } else {
    // 获取查询字符串中的数据
    const { username } = user
    // 后端渲染页面
    res.render('userCenter', {username})
  }
})

module.exports = router