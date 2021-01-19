const express = require('express')
const userModel = require('../mongooseModel/model/userModel')
const router = express.Router()
const md5 = require('md5')

router.post('/register', async (req, res) => {
  // 获取上传的数据
  const { username, password } = req.body
  // 先检验上传的用户是否已经存在
  const user = await userModel.findOne({ username })
  if (!user) {
    // 不存在则添加到数据库中
    await userModel.create({ username, password: md5(password) })
    res.send('注册成功')
  } else {
    // 已存在则提示用户
    res.send('账号已存在')
  }
})

router.post('/login', async (req, res) => {
  // 获取上传的数据
  const { username, password } = req.body
  // 查询数据库
  const user = await userModel.findOne({ username, password: md5(password) })
  if (!user) {
    // 账号密码正确则提示用户
    res.send('账号或密码错误')
  } else {
    // 响应session
    req.session.uid = user._id
    // 重定向到用户中心页面
    res.redirect('http://localhost:5000/userCenter')
  }
})

router.post('/userCheck', async (req, res) => {
  const { username } = req.body
  const user = await userModel.findOne({ username })
  if (!user) {
    res.send('{"code": 10000, "msg": "用户名可用"}')
  } else {
    res.send('{"code": 11000, "msg": "用户名不可用"}')
  }
})
module.exports = router