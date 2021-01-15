const express = require('express')

const app = express()

app.listen(5000, err => {
  if (err) console.log('服务器启动失败', err)
  else console.log('服务器启动成功')
})

// 应用/自定义中间件
function myMiddleWare(request, response, next) {
  console.log('myMiddleWare', request.get('user-agent'))
  response.set('author', 'chenery');
  // 调用next使用触发下一个中间件、或触发路由中的回调
  next()
}
// use传递中间件函数
// app.use(myMiddleWare)

/* app.get('/index', (request, response) => {
  console.log('get-index', request.query);
  response.send(request.query);
})
 */
app.use(express.urlencoded({extended: true}))

app.get('/login', (request, response) => {
  console.log('get-login', request.query);
  response.send(request.query);
})
app.post('/login', (request, response) => {
  console.log('post-login-', request.body);
  response.send(request.body);
})

app.all('/index', myMiddleWare, (request, response) => {
  let data = null;
  if (request.method === 'GET') {
    data = request.query;
    console.log('get-index-', request.query);
  }
  else {
    data = request.body;
    console.log('post-index-', request.body);
  }
  response.send(data);
})