const express = require('express')

// 1.创建应用对象
const app = express();

// 2.开启服务器
app.listen(5000, (err) => {
  if (err) console.log('服务器启动失败', err)
  else console.log('服务器启动成功')
})

// 3.定义路由
// 3.1路由参数 /:page/:pageSize
// 3.2路由参数是直接跟在路径后面的，以/:参数名的形式书写，参数名后面可以加?号，代表该路由参数可选，如果不加，客户端请求时必须传/// 递路由参数，不然匹配不到会报404，如果有多个路由参数，并且有的可选，有的必选，那么传递参数个数必须符合必选参数的个数，浏览器会/// 自动按照必选的参数顺序进行传递
app.get('/index/:page/:pageSize', (request, response) => {
  console.log(request.query); // requset.query 获取get请求的查询字符串组成的对象
  console.log(request.params); // request.params 获取路由参数组成的对象
  console.log(request.get('user-agent')); // request.get('key') 获取请求头中某个属性的值
  response.send('请求收到了，给你数据...');
})

app.post('/index', (request, response) => {
  console.log(request.body); // request.body 获取post请求的请求主体组成的对象，默认拿不到，需要借助中间件
  response.send('请求收到了，给你数据...')
})