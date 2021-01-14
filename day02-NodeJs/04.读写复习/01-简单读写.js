const fs = require('fs')

// 写
const str = 'hello node, hello fs, hello writeFile'
fs.writeFile('./hello1.txt', str, (err) => {
  if (err) console.log(err)
  else console.log('数据写入成功')
})

// 读
fs.readFile('./hello.txt', (err, data) => {
  if (err) console.log(err)
    // data是个buffer 可以用toString()转成字符串
  else console.log('数据读取成功', data.toString())
})