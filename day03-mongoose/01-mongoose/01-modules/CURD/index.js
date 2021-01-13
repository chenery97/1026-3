// 数据库的增删改查操作
;(async function() {
  // 1.引入stuModel对象
  // 1.1自定义模块的执行顺序：
  // 1.1.1在当前模块中引入了stuModel模块，会去执行stuModel模块的代码
  // 1.1.2在stuModel模块中引入了stuSchema模块，会去执行stuSchema模块的代码
  const stuModel = require('../models/stuModel')
  
  // 2.4因为这个promise对象的状态有可能是失败的，所以使用trycatch进行捕获，并输出可能的错误信息
  try {
    // 2.要进行数据库操作，首先要保证数据库连接成功
    // 2.1引入数据库连接返回的promise对象，会去执行db目录下的index模块的代码
    // 2.2接收到的promise对象的状态还不确定，所以要使用await或then()才能确定数据库连接成功了
    const db = require('../db')
    // 2.3使用了await，所以在外层要套一个异步函数，并且当执行这个js文件时，要自己执行里面的代码，所以封装成一个自调用的异步函数
    await db
    // 3.在确定数据库连接成功后对数据库进行操作
    const searchResult = await stuModel.find({ stu_info: { $ne: undefined } }, { _id: 0, __v: 0 })
    console.log(searchResult)

  } catch (error) {
    console.log(error)
  }
})()