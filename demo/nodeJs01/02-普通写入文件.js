function writeFile(filePath, data) {
  const fs = require('fs')
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) reject(err)
      else resolve('文件写入成功')
    })
  })
}

writeFile('./demo.md', 'hello writeFile').then(value => console.log(value), reason => console.log(reason))