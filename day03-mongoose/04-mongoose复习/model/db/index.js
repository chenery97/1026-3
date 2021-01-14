// 连接数据库
const mongoose = require('mongoose')

module.exports = mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});