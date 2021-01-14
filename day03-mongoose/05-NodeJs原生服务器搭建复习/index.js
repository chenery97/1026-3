const http = require('http')
const querystring = require('querystring')

const server = http.createServer((request, response) => {
  const str = request.url
  if (str === "/favicon.ico") return
  const arr = str.split('?')
  const queryStr = arr[1]
  const obj = querystring.parse(queryStr)
  console.log(obj);
  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.end('收到了你的请求了，这就给你数据')
})

server.listen(5000, (err) => {
  if (err) console.log('服务器启动失败', err)
  else console.log('服务器启动成功')
})