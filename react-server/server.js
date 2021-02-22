/**
 * @description 主模块
 */
const express = require("express");
const { resolve } = require("path");

const { SERVER_CONFIG } = require("./config");

// 引入数据库
require("./db/mongo");

// 引入中间件
// const cors = require("./middlleware/cors");

// 引入路由
const loginRouter = require("./routers/login");
const registRouter = require("./routers/regist");
const commonRouter = require("./routers/common");

const app = express();

app.use(express.static(resolve(__dirname, "./public")));

// 内置中间件：用来解析POST请求体参数
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 使用中间件
// app.use(cors);

// 应用 路由器中间件
app.use("/common", commonRouter);
app.use("/login", loginRouter);
app.use("/regist", registRouter);

app.listen(SERVER_CONFIG.port, SERVER_CONFIG.host, (err) => {
  if (!err)
    console.log(
      `服务器启动成功: http://${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`
    );
  else console.log(err);
});
