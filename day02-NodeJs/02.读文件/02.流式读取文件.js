// 1. 引入fs模块
const fs = require('fs')

// 2. 创建可读流
const rs = fs.createReadStream('./music.mp3')

// 3. 监听可读流的开启、关闭和读取
rs.on('open', () => {
  console.log('stream was opened')
})
rs.on('close', () => {
  console.log('stream was closed')
})
rs.on('data', (data) => {
  console.log(data)
})