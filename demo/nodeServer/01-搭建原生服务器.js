const http = require('http')
const fs = require('fs')
const { RSA_NO_PADDING } = require('constants')

// 创建服务器对象
const server = http.createServer()
// 监听客户端的请求
server.on('request', (req, res) => {
  // 获取req对象中保存的当前请求的url地址
  const { url } = req
  // 判断url地址，响应不同的页面
  if (url === '/') {
    fs.readFile('./views/index.html', {
      encoding: 'utf-8'
    } , (err, data) => {
      if (err) return console.log(err)
      res.end(data)
    })
  } else if (url === '/login') {
    fs.readFile('./views/login.html', {
      encoding: 'utf-8'
    }, (err, data) => {
        if (err) return console.log(err)
        res.end(data)
    })
    // 请求静态资源文件
  } else if (url.startsWith('/public')) {
    fs.readFile('.' + url, {
      encoding: 'utf-8'
    }, (err, data) => {
        if (err) return console.log(err)
        res.end(data)
    })
  }
})
// 启动服务器
server.listen(5000, () => {
  console.log('server is running...')
})