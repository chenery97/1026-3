function copyFile(sourceFile, targetFile) {
  // 1.引入fs模块
  const fs = require('fs')
  // 2.创建可读流
  const rs = fs.createReadStream(sourceFile)
  // 3.创建可写流
  const ws = fs.createWriteStream(targetFile)
  // 4.监听可读流读取数据
  rs.on('data', (data) => {
    // 5.可写流写入数据
    ws.write(data)
  })
  // 6.监听可读流关闭
  rs.on('close', () => {
    // 7.关闭可写流
    ws.end()
  })
}

copyFile('./music.mp3', './music2.mp3')