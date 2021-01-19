const mongoose = require('mongoose')

// 连接数据库，并导出返回的promise对象
module.exports = mongoose.connect('mongodb://localhost:27017/userList01', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})