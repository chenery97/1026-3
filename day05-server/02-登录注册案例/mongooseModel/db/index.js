const mongoose = require('mongoose')

// 连接数据库并导出promise对象
module.exports = mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});