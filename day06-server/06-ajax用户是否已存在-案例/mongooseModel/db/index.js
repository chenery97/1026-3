const mongoose = require('mongoose')

// 连接数据库，返回一个promise对象
module.exports = mongoose.connect("mongodb://localhost:27017/express", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});