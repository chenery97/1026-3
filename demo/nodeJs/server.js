const {
  static,
  urlencoded
} = require('express')

;
(async function () {
  const express = require('express')
  const db = require('./mongo/db')
  await db
  const app = express()
  const uiRoute = require('./routes/uiRoute')
  const logicRoute = require('./routes/logicRoute')
  app.use(static('./public'))
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(express.json())
  app.use(uiRoute)
  app.use(logicRoute)

  app.listen(5000, (err) => {
    if (err) console.log('服务器启动失败>>>>>')
    else console.log('服务器启动成功>>>>>')
  })
})()