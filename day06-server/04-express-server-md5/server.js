const express = require('express')
const db = require('./mongooseModel/db')
const uiRouter = require('./routers/uiRouter.js')
const logicRouter = require('./routers/logicRouter')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// 数据库连接后的操作
db.then(
  (value) => {
    // 创建应用对象
    const app = express()
    // 开启服务器
    app.listen(5000, (err) => {
      if (err) console.log('服务器启动失败', err)
      else console.log('服务器启动成功')
    })
    // 配置静态资源服务器
    app.use(express.static('assets'))
    // 使用请求体数据获取的中间件
    app.use(express.urlencoded({ extended: true }))
    // 使用session中间件
    app.use(
      session({
        name: 'userid', //设置cookie的name，默认值是：connect.sid
        secret: 'chenery', //参与加密的字符串（又称签名）
        saveUninitialized: false, //是否在存储内容之前创建会话
        resave: true, //是否在每次请求时，强制重新保存session，即使他们没有变化
        store: new MongoStore({
          url: 'mongodb://localhost:27017/sessions_container',
          touchAfter: 24 * 3600, //修改频率（例：//在24小时之内只更新一次）
        }),
        cookie: {
          httpOnly: true, // 开启后前端无法通过 JS 操作cookie
          maxAge: 1000 * 30, // 设置cookie的过期时间
        },
      })
    )
    // 使用静态路由器中间件
    app.use(uiRouter)
    // 使用逻辑路由器中间件
    app.use(logicRouter)

    // 配置视图引擎，使用ejs
    app.set('view engine', 'ejs')
    // 配置ejs模块资源的路径
    app.set('views', './views')
  },
  (reason) => {
    console.log('数据库连接失败', reason)
  }
)
