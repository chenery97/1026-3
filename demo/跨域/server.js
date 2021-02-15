const http = require('http')
const fs = require('fs')
const server = http.createServer()

server.on('request', (req, res) => {
  const {
    url
  } = req
  if (url === '/') {
    fs.readFile('./01-jsonp.html', {
      encoding: 'utf-8'
    }, (err, data) => {
      if (err) return console.log(err)
      res.end(data)
    })
  } else if (url.split('?')[0] === '/test') {
    const search = url.split('?')[1]
    res.end(`${search.split('=')[1]}({name:'chenery'})`)
  }
})

server.listen(5000, () => {
  console.log('server is running...')
})