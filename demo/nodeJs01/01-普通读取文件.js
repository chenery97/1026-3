function readFile(filePath) {
  const fs = require('fs')
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err)
      else resolve(data.toString())
    })
  })
}

readFile('./NodeJs.md').then(value => console.log(value), reason => console.log(reason))