; (async function () {
  const express = require("express");
  const db = require("./mongooseModel/db");
  const userModel = require("./mongooseModel/model/userModel");


  try {
    await db;
    const app = express();
  
    app.listen(5000, (err) => {
      if (err) console.log("服务器启动失败", err);
      else console.log("服务器启动成功");
    });
  
    // 使用静态资源中间件，处理客户端获取静态资源的请求
    app.use(express.static("assets"));
    // 使用express内置的中间件，处理post请求获取body数据拿不到的问题
    app.use(express.urlencoded({ extended: true }));
  
    app.post("/register", (request, response) => {
      // 获取客户端上传的username和password
      const { username, password } = request.body;
      // 往数据库添加数据，要等数据库连接成功才进行操作
      userModel.create({
        username,
        password,
      }).then(() => {
        response.send('注册成功')
      }, (reason) => {
          if (reason.code === 11000) {
          response.send(username + '用户名已存在')
        }
      })
    })

    app.post('/login', async (request, response) => {
      // 获取客户端上传的username和password
      const { username, password } = request.body;
      // 在数据库中查询对应的用户名和密码
      const user = await userModel.findOne({ username, password });
      // 判断用户名和密码是否和数据库中的有匹配的
      if (user) response.redirect('http://localhost:5000/index.html?username=' + user.username)
      else response.send('用户名或密码错误')
    })
  } catch (error) {
    console.log(error)
  }
})()