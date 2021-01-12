function copyFile(sourceFile, targetFile) {
  // 1.引入fs模块
  const fs = require('fs')
  // 2.创建可读流
  const rs = fs.createReadStream(sourceFile)
  // 3.创建可写流
  const ws = fs.createWriteStream(targetFile)
  // 4.使用pipe可以直接把可读流中的数据copy到可写流中
  rs.pipe(ws)
}

copyFile('./music.mp3', './music3.mp3')