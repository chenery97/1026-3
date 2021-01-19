const express = require("express");
const db = require("./mongooseModel/db");
const uiRouter = require('./routers/uiRouter.js');
const logicRouter = require('./routers/logicRouter');
const cookieParser = require('cookie-parser');

// 数据库连接后的操作
db.then(value => {
  // 创建应用对象
  const app = express();
  // 开启服务器
  app.listen(5000, (err) => {
    if (err) console.log("服务器启动失败", err);
    else console.log("服务器启动成功");
  });
  // 配置静态资源服务器
  app.use(express.static('assets'));
  // 使用请求体数据获取的中间件
  app.use(express.urlencoded({ extended: true }));
  // 使用cookie中间件
  app.use(cookieParser());
  // 使用静态路由器中间件
  app.use(uiRouter);
  // 使用逻辑路由器中间件
  app.use(logicRouter);

  // 配置视图引擎，使用ejs
  app.set('view engine', 'ejs')
  // 配置ejs模块资源的路径
  app.set('views', './views')
}, reason => {
  console.log('数据库连接失败', reason)
})