// 连接数据库
// 1.引入mongoose模块
const mongoose = require('mongoose')

// 2.连接数据库
// 因为外部模块要对数据库进行操作，所以要把数据库连接返回的promise对象导出
module.exports = mongoose.connect('mongodb://localhost:27017/node_dbs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

