const express = require('express')
const NAV = require('../constant/constant')
const route = express.Router()

route.get('/getNav', (req, res) => {
  res.send({
    NAV
  })
})

module.exports = route