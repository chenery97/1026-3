const fs = require('fs')

fs.readFile('test.txt', (err, data) => {
  if (err) console.log(err)
    // data默认是一个Buffer类数组对象，使用toString()可以把数据转成字符串
  // else console.log(data)
  else console.log(data.toString())
})