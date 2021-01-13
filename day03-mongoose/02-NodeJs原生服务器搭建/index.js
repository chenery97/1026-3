// 1.引入http模块
const http = require('http')
const querystring = require('querystring')

// 2.创建服务器
const server = http.createServer((request, response) => {
  const str = request.url
  const arr = str.split("?")
  const queryStr = arr[1]
  const obj = querystring.parse(queryStr)
  console.log(arr)
  console.log(queryStr)
  console.log(obj)

  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.end('<h1>hello Node.js 哈哈哈</h1>')
})

// 3.监听服务器启动
server.listen(5000, (err) => {
  if (err) console.log('服务器启动失败', err)
  else console.log('服务器启动成功')
})