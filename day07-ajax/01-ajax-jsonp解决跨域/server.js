const express = require('express')

const app = express()

app.listen(5000, err => {
  if (err) console.log('服务器启动失败', err)
  else console.log('服务器启动成功')
})
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.post('/test', (req, res) => {
  const re = req.body
  res.send(re)
})

app.get('/test', (req, res) => {
  // 获取script标签传递过来的callback键值对
  const { callback } = req.query;
  // 响应给客户端一个js代码字符串，浏览器收到了会进行页面渲染，最终执行script标签中的函数调用
  res.send(`${callback}({"code": 11000, "msg": "hello client"})`)
})