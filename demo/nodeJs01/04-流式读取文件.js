function readFile(filePath) {
  const fs = require('fs')
  return new Promise((resolve, reject) => {
    try {
      fs.access(filePath, err => {
        if (err) return reject(err)
        const rs = fs.createReadStream(filePath, {
          encoding: 'utf-8'
        })
        rs.on('data', data => {
          console.log(data)
        })
        rs.on('close', () => {
          resolve('文件读取完毕')
        })
      })
    } catch (error) {
      reject(error)
    }

  })
}

readFile('./demo.md').then(value => console.log(value), reason => console.log(reason))