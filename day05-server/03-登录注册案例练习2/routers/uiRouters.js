const path = require('path')
const express = require('express')

const router = express.Router()

router.get('/login', (request, response) => {
  const filePath = path.resolve(__dirname, '../assets/login.html')
  response.sendFile(filePath)
})

router.get('/register', (request, response) => {
  const filePath = path.resolve(__dirname, "../assets/register.html");
  response.sendFile(filePath)
})

router.get('/userCenter', (request, response) => {
  const { username } = request.query;
  response.render('userCenter', { username: username });
})

module.exports = router