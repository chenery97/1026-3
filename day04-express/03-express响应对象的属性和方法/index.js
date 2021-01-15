const express = require('express');

// 1.创建应用对象
const app = express()

// 2.启动服务器
app.listen(5000, (err) => {
  if (err) console.log('服务器启动失败', err) 
  else console.log('服务器启动成功')
})

// 定义路由
app.get('/index', (request, response) => {
  // response.send('<h1>hello client</h1>'); // res.send() 直接响应数据，如果是html标签会解析
  // response.download('./index.html'); // res.download() 下载文件
  // response.sendFile(__dirname + '/index.html'); // res.sendFile() 发送文件
  // response.sendFile(__dirname + '/LiSA - ADAMAS.mp3');
  // response.sendFile(__dirname + '/CarInfomation_20200102100151.xls');
  // response.sendFile(pathSolve(__dirname, './../../test.txt'));
  // response.redirect('http://www.apple.com.cn'); // res.redirect() 重定向请求传递的url地址
  console.log(response.get('x-powered-by'));
  response.set('author', 'chenery');
  response.send('over')
})

// 拼接路径方法封装
// 参数1：绝对路径
// 参数2：文件，支持../ 或 ./
function pathSolve(absolutePath, sourceFile) {
  // 1.获取绝对路径中最后一个\的下标
  let pathIndex = absolutePath.lastIndexOf("\\");
  // 2.获取文件参数中所有 ../ 或 ./ 符号
  const arr = sourceFile.match(/.{1,2}\//g);
  // 3.获取文件名
  const fileName = sourceFile.slice(sourceFile.lastIndexOf('/') - 1);
  // 4.遍历上面获取到符号的数组
  arr.some((item) => {
    // 5.判断是否为 ../ , 不是则直接返回不做处理
    if (item !== '../') {
      return
    }
    // 6.是则对绝对路径进行切割
    absolutePath = absolutePath.slice(0, pathIndex);
    // 7.从新获取到绝对路径最后一个\ 的下标
    pathIndex = absolutePath.lastIndexOf("\\");
    // 8.如果绝对路径最后一个 \ 的下标结果为-1，证明已经到盘符根目录了，无法再继续往上一级走
    if (pathIndex === -1) {
      console.warn('已经到盘符了');
      return true
    }
  })
  // 9.返回最后拼接的绝对路径
  return absolutePath + '\\' + fileName
}