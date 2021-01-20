const express = require('express')
const cors = require('cors')

const app = express()

app.listen(5000)

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))

// 没有使用axios跨域时 cors的解决方案
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})
// 使用axios跨域时 cors的解决方案
app.use(cors())
app.use(express.json())

app.get('/jsonp', (req, res) => {
  console.log(req.query)
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // jsonp请求
  const { callback } = req.query
  res.send(`${callback}({"code": 10000, "msg": "请求成功"})`)
})
app.get('/test', (req, res) => {
  const re = req.query
  res.send(re)
})

app.post('/test', (req, res) => {
  const re = req.body
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(re)
})