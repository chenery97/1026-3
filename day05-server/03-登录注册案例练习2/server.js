(async function () {
  const express = require("express");
  const db = require("./mongooseModel/db");
  const uiRouter = require("./routers/uiRouters");
  const logicRouter = require("./routers/logicRouter");

  try {
    await db;
    // 1.创建应用对象
    const app = express();

    // 2.启动服务器
    app.listen(5000, (err) => {
      if (err) console.log("服务器启动失败", err);
      else console.log("服务器启动成功");
    });

    // 3.处理静态资源的请求
    app.use(express.static("assets"));
    // 5.处理请求体的数据
    app.use(express.urlencoded({ extended: true }));
    // 告诉express，当前使用的模块引擎是ejs
    app.set('view engine', 'ejs');
    // 告诉express，我们定义的模块所处文件夹
    app.set('views', './views')
    // 使用静态资源路由器
    app.use(uiRouter);
    // 使用动态资源路由器
    app.use(logicRouter);
  } catch (error) {
    console.log(error);
  }
})();
