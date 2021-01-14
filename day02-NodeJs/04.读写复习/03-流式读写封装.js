function copyFile(sourceFile, targetFile) {
  const fs = require('fs')
  // 创建可读流
  const rs = fs.createReadStream(sourceFile)
  // 创建可写流
  const ws = fs.createWriteStream(targetFile)
  // 读取数据、写入数据
  rs.on('data', (data) => {
    ws.write(data)
  })
  // 监听可读流关闭，关闭可写流
  rs.on('close', (err) => {
    if (err) console.log(err)
    else ws.end()
  })
}

copyFile('./LiSA - ADAMAS.mp3', './LiSA - ADAMAS-02.mp3')