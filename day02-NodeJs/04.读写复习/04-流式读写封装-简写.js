const { copyFile } = require("fs");

function cloneFile(sourceFile, targetFile) {
  const fs = require('fs')
  // 创建可读流
  const rs = fs.createReadStream(sourceFile)
  // 创建可写流
  const ws = fs.createWriteStream(targetFile)
  // 使用pipe把可读流中读取的数据传输到可写流中,传输完毕会自动关闭可写流
  rs.pipe(ws)
}
cloneFile('./LiSA - ADAMAS.mp3', './LiSA - ADAMAS-03.mp3')