const fs = require('fs')

const str = `<!DOCTYPE html>
<html>
  <title>NodeJs写入文件</title>
</html>
<body>
  <h1>Hello Node.js</h1>
</body>
`
fs.writeFile('./index.html', str, (err) => {
  if (err) console.log(err)
  else console.log('写入成功11...')
})

fs.writeFile('./test.html', str, {
  flag: 'r'
}, (err) => {
    if (err) console.log(err)
    else console.log('写入成功22...')
})
