const express = require('express')
const markdownIt = require('markdown-it')
const hljs = require('highlight.js')
const path = require('path')
const fs = require('fs')
const route = express.Router()

const md = new markdownIt({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang))
      return `<pre class="hljs-${lang}"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
    if (lang)
      return '<pre class="hljs-' + lang + '"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

route.post('/getActicle', (req, res) => {
  const {
    fileName
  } = req.body
  const filePath = path.resolve(__dirname, '../public/md/' + fileName + '.md')
  const rs = fs.createReadStream(filePath, {
    highWaterMark: 1 * 1024 * 1024
  })
  let htmlStr = ''
  rs.on('data', (data) => {
    htmlStr = md.render(data.toString())
  })
  rs.on('close', () => {
    res.send(htmlStr)
  })
})

module.exports = route