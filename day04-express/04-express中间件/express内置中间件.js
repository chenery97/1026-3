const express = require('express')

const app = express();

app.listen(5000, err => {
  if (err) console.log('服务器启动失败', err) 
  else console.log('服务器启动成功')
})

app.use(express.urlencoded({extended: true}))

app.post('/index', (request, response) => {
  console.log(request.body);
  response.send(request.body);
})

app.post('/login', express.urlencoded({ extended: true }), (request, response) => {
  console.log(request.body);
  response.send(request.body);
})