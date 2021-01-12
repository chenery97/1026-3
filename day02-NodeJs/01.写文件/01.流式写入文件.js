// 1.引入fs模块
const fs = require('fs')

// 2.创建写入流
const ws = fs.createWriteStream('test.txt', {
  encoding: 'utf-8',
  start: 2
})

// 3.写入数据
ws.write('hello ')
ws.write('node.js')

// 4.写入结束
setTimeout(() => {
  ws.end()
}, 1000)

// 监听流的开启和关闭
ws.on('open', () => {
  console.log('stream was opened')
})
ws.on('close', () => {
  console.log('stream was closed')
})