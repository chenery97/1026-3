const express = require('express')
const db = require('./mongooseModel/db')
const logicRouters = require('./routers/logicRouters')
const uiRouters = require('./routers/uiRouters')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

db.then(() => {
  // 创建应用对象
  const app = express()

  // 启动服务器
  app.listen(5000, (err) => {
    if (err) console.log('启动服务器失败', err)
    else console.log('启动服务器成功')
  })

  // 使用静态资源中间件
  app.use(express.static('public'))
  // 使用express内置获取post请求中body的数据的中间件
  app.use(express.urlencoded({ extended: true }))
  // 配置session
  app.use(session({
    name: 'userid', //设置cookie的name，默认值是：connect.sid
    secret: 'express-server02', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否在存储内容之前创建会话
    resave: true, //是否在每次请求时，强制重新保存session，即使他们没有变化
    store: new MongoStore({
      url: 'mongodb://localhost:27017/sessions_container',
      touchAfter: 24 * 3600, //修改频率（例：//在24小时之内只更新一次）
    }),
    cookie: {
      httpOnly: true, // 开启后前端无法通过 JS 操作cookie
      maxAge: 1000 * 60, // 设置cookie的过期时间
    },
  }))

  // 配置ejs
  app.set('view engine', 'ejs')
  app.set('views', 'views')

  // 使用路由器中间件
  app.use(logicRouters)
  app.use(uiRouters)

}, reason => {
  console.log('数据库连接失败', reason)
})
