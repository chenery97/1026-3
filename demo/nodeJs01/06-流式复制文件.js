function cloneFile(sourceFile, targetFile) {
  const fs = require('fs')
  return new Promise((resolve, reject) => {
    try {
      fs.access(sourceFile, err => {
        if (err) return reject(err)
        const rs = fs.createReadStream(sourceFile, {
          encoding: 'utf-8'
        })
        const ws = fs.createWriteStream(targetFile)
        rs.on('data', data => {
          ws.write(data)
        })
        rs.on('close', () => {
          ws.end()
          resolve('文件复制完毕')
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}

cloneFile('./demo.md', './demo03.md').then(value => console.log(value), reason => console.log(reason))