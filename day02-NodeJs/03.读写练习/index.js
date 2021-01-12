const fs = require('fs')


let str = '';
fs.readFile('./doc.txt', (err, data) => {
  if (err) console.log(err)
  else str = data.toString(); fn()
})

async function fn() {
  for (let v of str) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        fs.writeFile('./doc2.txt', v, {
          flag:'a'
        }, (err) => {
            if (err) reject(err)
            else resolve()
        })
      }, 100)
    }).catch((err) => {
      console.log(err)
    })
  }
}