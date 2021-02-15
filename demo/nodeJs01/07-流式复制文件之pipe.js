function cloneFile(sourceFile, targetFile) {
  const fs = require('fs')
  return new Promise((resolve, reject) => {
    try {
      fs.access(sourceFile, err => {
        if (err) return reject(err)
        const rs = fs.createReadStream(sourceFile)
        const ws = fs.createWriteStream(targetFile)
        rs.pipe(ws)
        resolve('文件复制完毕')
      })
    } catch (error) {
      reject(error)
    }
  })
}

cloneFile('./demo.md', './demo04.md').then(value => console.log(value), reason => console.log(reason))