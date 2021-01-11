const fs = require('fs')

const data = 'hello, my name is jerry, i like basketball.'
const url = './test.txt';

function writeFile(url, data) {
  fs.writeFile(url, data, {
    flag: 'a'
  }, (err) => {
      if (err) console.log(err)
  })
}

async function fn() {
  for (let v of data) {
    await new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        writeFile(url, v);
        resolve();
        clearInterval(timer);
      }, 1000)
    })
  }
}

fn();