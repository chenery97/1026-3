function readFile(sourceFile) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    fs.readFile(sourceFile, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

readFile('./music.mp3')
  .then(value => console.log(value),
    reason => console.log(reason))