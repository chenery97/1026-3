function cloneFile(sourceFile, targetFile) {
  const fs = require('fs')
  return new Promise((resolve, reject) => {
    fs.readFile(sourceFile, (err, data) => {
      if (err) reject(err)
      else fs.writeFile(targetFile, data, err => {
        if (err) reject(err)
        else resolve('文件已复制')
      })
    })
  })
}

cloneFile('./demo.m', './demo01.md').then(value => console.log(value), reason => console.log(reason))