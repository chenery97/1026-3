const fs = require('fs')

// 创建可读流
const rs = fs.createReadStream('./LiSA - ADAMAS.mp3', {
  highWaterMark: 1 * 1024 * 1024
})
// 创建可写流
const ws = fs.createWriteStream('./LiSA - ADAMAS-01.mp3', {
  highWaterMark: 1 * 1024 * 1024
})
// 读取数据，写入数据
rs.on('data', (data) => {
  ws.write(data)
})
// 监听流
rs.on('open', () => {
  console.log('rs was opened')
})
ws.on('open', () => {
  console.log('ws was opened')
})
// 关闭可写流
rs.on('close', () => {
  console.log('rs was closed')
  ws.end()
})
ws.on('close', () => {
  console.log('ws was closed')
})