## Node.js

#### Node.js简介

1. 什么是node.js

   一个基于V8引擎可以让JavaScript脚本执行的运行环境

2. 组成

   ECMAScript、global

3. 优点

   - 异步非阻塞I/O操作

   - 适用于I/O密集型的应用

4. 缺点

   - 不适用于CPU密集型的应用



#### CommonJS模块化

1. 导入

   `const module = require(module)`

   - 如果是自定义模块，需要传递模块文件的路径
- 如果是内置模块，直接传递模块名
   - 如果是第三方模块，直接传递模块名

   __注__：在执行require(module)时，会在当前项目的目录下寻找node_modules这个文件夹，如果找不到则会沿着层级目录往上找，一直找到根盘符，在实际开发中node_modules文件夹都会在当前项目下

2. 导出

   内部底层 `exports = module.exports = {}`，CommonJS模块化规范中规定如果module.exports和exports指向了不同的对象，则使用module.exports

   - `module.exports = 值`

   - `module.exports = {xxx: 值}`

   - `module.exports.xxx = 值`

   - `exports.xxx = 值`



#### Node.js函数

1. 在node.js中，所有的模块（js文件），都被自动包裹了一个外层函数

```js
function (exports, require, module, __filename, __dirname) {}
```

- exports：用于暴露模块
- require：用于引入模块
- module：用于暴露模块
- __filename：当前文件的绝对路径
- __dirname：当前文件所在文件夹的绝对路径

2. 这个函数的作用

- 可以直接使用CommonJS语法
- 隐藏内部实现，生成局部作用域，更安全

__注__：arguments.callee.toString() 在函数内部执行，用于查看当前函数



#### Node.js的事件轮询机制

![image-20210111184126422](C:\Users\86166\AppData\Roaming\Typora\typora-user-images\image-20210111184126422.png)

在Node中事件轮询分为六个阶段：

1. timers（定时器阶段）：执行定时器的回调函数
2. pending callbacks（系统阶段）
3. idle，prepare（准备阶段）
4. poll（轮询阶段）：
   - 如果回调队列不为空
     - 从队列中取出回调函数同步执行（一个一个执行）直到队列为空 或 达到系统最大限度
   - 如果回调队列为空
     - 如果设置了setImmediate，进入下一个check阶段，目的：为了执行setImmediate的回调函数
     - 如果没有设置setImmediate，在此阶段停留，等待回调函数被插入到轮询队列，当定时器等待的时间到了，进入下一个check阶段，目的为了执行定时器的回调函数
5. check（专门用于执行setImmediate的回调函数）
6. close callbacks（关闭回调阶段，清除定时器、立即执行函数）

__特殊__：process.nextTick()，能在任意阶段优先被执行



#### 包和包管理器

1. 什么是包？

   在一个项目中如果存在一个package.json文件，那么这个项目就是一个包

2. 什么是包管理器？

   包管理器就是一个可以用来下载安装、卸载包的工具，在安装完Node.js后会在全局中自动安装一个npm，这个npm就是包管理器

3. npm的使用

   - `npm init / npm init -y`：初始化一个包

     - 初始化成功后会自动生成一个package.json文件

     __注意__：包名不能是中文、大写字母，还要避免包名冲突

   - `npm install / npm i`：安装所有在package.json/package-lock.json中声明的包

   - `npm i packageName`：安装指定包名到当前项目的node_modules文件夹中，并且将该包写入包说明文件（package.json），并添加到生成依赖（dependencies）中

   - `npm i packageName@x.x.x`：在上面指令的基础上指定了版本

   - `npm i packageName -D`：安装指定包名到当前项目的node_modules文件夹中，并且将该包写入包说明文件（package.json），并添加到开发依赖（devDependencies）中

   - `npm i packageName -g`：全局安装包（一般有指令的包，都要进行全局安装，在全局安装之后的包，在任意位置都能使用）

   - `npm remove packageName`：从当前的项目中移出指定的包



#### Buffer

1. 什么是Buffer？
   - 它是一个类数组的对象，用于存储数据（存储的全部是二进制数据）
   - Buffer的效率很高，存储和读取的速度都很快，本质就是对内存的直接操作
   - Buffer的大小一旦确定了就不可以修改



#### 文件系统模块

1. 导入文件系统模块

   `const fs = require('fs')`

2. 读取文件

   - 普通读取：`fs.readFile(filePath [,配置项],(err, data) => {})`

     - 适用于数据量小的文件读取

   - 流式读取

     1. 创建可读流：`const rs = fs.createReadStream(filePath [,配置项])`，创建完会自动打开文件
     2. 读取文件：`rs.on('data', (data) => {})`，会持续执行回调，直到文件读取完毕，读取完毕会自动关闭文件
     3. 监听开启和关闭：`rs.on('open/close', () => {})`

     - 适用于数据量大的文件读取

3. 写入文件

   - 普通写入：`fs.writeFile(filePath, data [,配置项], (err) => {})`

     - 适用于数据量小的文件写入

   - 流式写入

     1. 创建可写流：`const ws = fs.createWriteStream(filePath [,配置项])`，创建完会自动打开文件
     2. 写入文件：`ws.write(data)`，配合可读流操作时，在读取文件的回调中调用该方法
     3. 关闭文件： `ws.end()`，配合可读流操作时，在可读流关闭的回调中调用该方法
     4. 监听开启和关闭：`ws.on('open/close', () => {})`

     - 适用于数据量大的文件写入

4. 流式读取文件和流式写入文件

   ```js
   //copyFile函数封装
   function copyFile(sourceFile, targetFile) {
       const fs = require('fs')
       const rs = fs.createReadStream(sourceFile)
       const ws = fs.createWriteStream(targetFile)
       rs.on('data', (data) => {
           ws.write(data)
       })
       rs.on('close', () => {
           ws.end()
       })
   }
   
   //copyFile函数封装-简写模式
   function copyFile(sourceFile, targetFile) {
       const fs = require('fs')
       const rs = fs.createReadStream(sourceFile)
       const ws = fs.createWriteStream(targetFile)
    	//使用pipe方法会把可读流文件中所有数据写入到可写流文件中，并且写入完成之后会自动关闭可写流   
       rs.pipe(ws)
   }
   ```



#### MongoDB

1. 什么是MongoDB？

   MongoDB是一种非关系型的数据库软件

2. 数据库类型分类

   1. 关系型数据库(MySQL、Oracle、SQL Server等)：数据库 --> 表 --> 字段和数据行
      - 表与表之间有关联
      - 关系复杂
      - 适用于大数据量的项目
   2. 非关系型数据库(MongoDB、Redis等)：数据库 --> 集合 --> 文档（类似json）
      - 关系简单
      - 适用于数据量不是特别大的项目

3. MongoDB的CURD指令

   1. Create

      ```sql
      //inset()可以插入一条或多条数据
      db.users.insert([{
          name: '张三',
          age: 30
      }, {
          name: '李四',
          age: 35
      }])
      
      //insertOne({})可以插入一条数据
      db.users.insertOne({
          name: '王五',
          age: 33
      })
      
      //insertMany([{},{},...])可以插入多条数据
      db.users.insertMany([{
          name: '赵六',
          age: 31
      }, {
          name: '王八',
          age: 38
      }])
      ```

   2. Update

      ```sql
      //修改所有符合条件的第一个
      db.users.update({
          name: 'chenery'
      }, {
          $set: {
              name: '老大'
          }
      })
      
      //修改所有符合条件的
      db.users.update({
          name: /^王/
      }, {
          $set: {
              name: '老二'
          }
      }, {
          multi: true
      })
      
      //修改所有符合条件的第一个
      db.users.updateOne({
          name: /^老/
      }, {
          $set: {
              name: '老三'
          }
      })
      
      //修改所有符合条件的
      db.users.updateMany({
          name: /^老/
      }, {
          $set: {
              family: '老祠'
          }
      })
      ```

   3. Retrieve

      ```sql
      //查看所有数据库
      show dbs
      //查看当前使用的数据库下的所有集合
      show collections
      //find() 查找整个集合
      db.users.find()
      
      //find({}) 按照一个条件查找
      db.users.find({
          name: 'chenery'
      })
      
      //find({,}) 按照多个条件查找，多个条件是并且的关系
      db.users.find({
          age: 38,
          name: '王五'
      })
      
      //逻辑查找
      //小于 $lt 小于等于 $lte
      db.users.find({
          age: {
              $lt: 33
          }
      })
      //大于 $gt 大于等于 $gte
      db.users.find({
          age: {
              $gt: 33
          }
      })
      //与 $in 查找一个字段中符合所有条件的其中一个就会被查找出来
      db.users.find({
          age: {
              $in: [22, 30, 31]
          }
      })
      //或 $or 只要符合多个条件中的其中一个就会被查找出来
      db.users.find({
          $or: [{
              name: 'chenery'
          }, {
              age: 30
          }]
      })
      //非 $ne 查找除了符合条件外的所有数据
      db.users.find({
          age: {
              $ne: 38
          }
      })
      
      //使用函数查找 $where: function(){}
      db.users.find({
          $where: function() {
              return this.age >= 30 && this.age <= 35
          }
      })
      
      //正则查找
      db.users.find({
          name: /^王/
      })
      
      //投影 1显示 0不显示
      db.users.find({
          age: {
              $lt: 35
          }
      }, {
          _id: 0,
          age: 1,
          name: 1
      })
      ```

   4. Delete

      ```sql
      //删除符合条件的数据
      db.users.remove({
          age: {
              $lt: 30
          }
      })
      
      //删除集合中的所有数据
      db.users.remove({})
      ```

      