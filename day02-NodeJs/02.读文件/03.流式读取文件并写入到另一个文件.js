// 1. 引入fs模块
const fs = require('fs')

// 2. 创建可读流
const rs = fs.createReadStream('./music.mp3')
// 2.1 监听可读流读取文件
rs.on('data', (data) => {
  // 3.1 写入文件
  ws.write(data)
})

// 3. 创建可写流
const ws = fs.createWriteStream('./music1.mp3')

// 3.2 关闭可写流
rs.on('close', () => {
  console.log('readStream was closed')
  ws.end()
})
ws.on('close', () => {
  console.log('writeStream was closed')
})