function writeFile(filePath, data) {
  const fs = require('fs')
  return new Promise((resolve, reject) => {
    try {
      const ws = fs.createWriteStream(filePath)
      ws.write(data)
      ws.end()
      resolve('文件写入完毕')
    } catch (error) {
      reject(error)
    }
  })
}

writeFile('./demo02.md', 'hello writeStream').then(value => console.log(value), reason => console.log(reason))