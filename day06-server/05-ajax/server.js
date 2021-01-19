const express = require('express')

const app = express()

app.listen(5000, err => {
  if (err) console.log('服务器启动失败', err)
  else console.log('服务器启动成功')
})

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))

app.get('/ajax-get', (req, res) => {
  console.log(req.query)
  res.send('get请求响应成功')
})

app.post('/ajax-post', (req, res) => {
  console.log(req.body)
  res.send('post请求响应成功')
})