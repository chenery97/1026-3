const express = require('express')

const app = express()

// 模拟响应的数据
const arr = [
  { name: '张三', gender: '男', info: '家里排行老三' },
  { name: '李四', gender: '男', info: '家里排行老四' },
  { name: '王五', gender: '男', info: '家里排行老五' },
  { name: '赵六', gender: '男', info: '家里排行老六' },
]
// 启动服务器
app.listen(5000)

// 定义路由
app.get('/usersData', (req, res) => {
  // 获取把模拟的数据转成json字符串
  const jsonStr = JSON.stringify(arr)
  // 获取到客户端发送过来的函数
  const { callback } = req.query
  // 将模拟的数据当做函数的实参进行响应
  res.send(`${callback}(${jsonStr})`)
})