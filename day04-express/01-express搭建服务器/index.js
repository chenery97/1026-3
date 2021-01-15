const express = require("express");

// 1.创建应用对象
const app = express();

// 2.开启服务器
app.listen(5000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});

// 3.监听请求，并响应请求
app.get("/index", (request, response) => {
  const str = request.url;
  console.log("接收到index.html发送的get请求", str);
  response.send("<h3>我是express服务器</h3>");
});
app.post("/index", (request, response) => {
  const str = request.url;
  console.log("接收到index.html发送的post请求", str);
  response.send("<h3>我是express服务器</h3>");
});
