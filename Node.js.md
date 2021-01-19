## Node.js

### Node.js简介

1. 什么是node.js

   一个基于V8引擎可以让JavaScript脚本执行的运行环境

2. 组成

   ECMAScript、global

3. 优点

   - 异步非阻塞I/O操作

   - 适用于I/O密集型的应用

4. 缺点

   - 不适用于CPU密集型的应用



### CommonJS模块化

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



### Node.js函数

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



### Node.js的事件轮询机制

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



### 包和包管理器

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



### Buffer

1. 什么是Buffer？
   - 它是一个类数组的对象，用于存储数据（存储的全部是二进制数据）
   - Buffer的效率很高，存储和读取的速度都很快，本质就是对内存的直接操作
   - Buffer的大小一旦确定了就不可以修改



### 文件系统模块

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



### MongoDB

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




### mongoose

1. 什么是mongoose？

   mongoose是一个第三方包，封装了一些可以操作MongoDB数据库的方法，在node运行环境下可以通过代码操作数据库

2. 使用

   1. 下载包：`npm i mongoose`

   2. 导入包：`const mongoose = require('mongoose')`

   3. 连接数据库：`mongoose.connect('mongodb://localhost:27017/数据库名', {useNewUrlParser: true, useUnifiedTopology: true})`，返回一个promise对象

   4. 创建Schema对象(集合中每个字段的描述)：

      - 获取Schema对象(构造函数)：`const Schema = mongoose.Schema`

      - 实例化Schema：`const xxxSchema = new Schema({属性名: {type: xxx, required: xxx, unique: xxxx, default: xxx}}, {collection: '集合名'})`，不传第二个参数，在创建model时MongoDB会自动在集合名后面加一个s，并转成小写，传了第二个参数，也要保证在创建model时传的集合名要与之一致

   5. 创建model对象：`const xxxModel = mongoose.model('集合名', xxxSchema)`

      - 操作数据库(CURD)

        - 增：`xxxModel.create(文档, 回调)`，创建一个文档时，传入一个文档对象，创建多个文档时，传入一个由多个文档对象组成的数组

        - 删：

          - `xxxModel.deleteOne({查询条件}, 回调)`，删除第一条匹配的数据

          - `xxxModel.deleteMany({查询条件}, 回调)`，删除所有匹配的数据

        - 改：

          - `xxxModel.updateOne({查询条件}, {$set: {更新的数据}}, 回调)`，更新第一条匹配的数据

          - `xxxModel.updateMany({查询条件}, {更新的数据}, 回调)`，更新所有匹配的数据

        - 查：

          - `xxxModel.find({查询条件}, {投影}, 回调)`，查询所有匹配的数据，没有匹配的数据返回空数组，有匹配的数据返回查询到的数据所组成的数组，投影决定返回的数据中包含哪些字段

          - `xxxModel.findOne({查询条件}, {投影}, 回调)`，查询第一条匹配的数据，没有匹配的数据返回null，有匹配的数据返回该文档对象

   __注__：以上方法中的回调都有两个参数，参数1是错误对象，参数2是数据对象或操作提示对象，如果不写回调，则返回的是一个promise对象

3. mongoose模块化

   结构：db、Schemas、model、CURD

   1. db：用于连接数据库
   2. Schemas：用于创建各个集合约束
   3. model：用于创建各个集合
   4. CURD：用于数据库连接成功后的操作，往集合中进行增删改查



### Node.js原生服务器搭建

1. 引入http模块：`const http = require('http')`

2. 创建服务器：`const server = http.createServer((request, response) => {})`，客户端发送一次请求，服务器响应该请求，这个请求才算完成
   - request对象保存了客户端发送请求时客户端的数据，使用request.url可以获取到客户端请求的路径和查询字符串
     
     - querystring内置模块可以把一个查询字符串转成对象`const obj = querystring.parse(查询字符串)`，当然首先要引入这个模块
     
   - response对象是给客户端响应数据的，使用response.end(data)可以给客户端响应数据
   
     - 当data中包含中文时，页面渲染的时候会出现乱码，是因为没有告诉浏览器用utf-8进行解码，在响应数据前使用
   
       `response.setHeader('content-type', 'text/html;charset=utf-8')`可以解决该问题
   
3. 监听服务器：`server.listen(5000, (err) => {})`，监听服务器时，服务器才会开启，传入端口，回调，注意端口冲突问题



### express服务器搭建

express主要由路由和中间件组成

1. 使用

   1. 下载 `npm i express`

   2. 引入 `const express = require('express')`

   3. 创建应用对象 `const app = express()`

   4. 启动服务器 `app.listen(端口号, 回调)`

   5. 定义路由

      路由：指的是应用程序如何响应客户端的从不同路径发送过来的请求

      路由参数：在url中的路径后面使用`/:参数名?`，客户端请求时会进行匹配，加了?号是代表可选，客户端可以不传，不加?号则代表是必传的，不传则报404。

      ```js
      app.get(路径, [,中间件], 回调)
      app.post(路径, [,中间件], 回调)
      app.all(路径, [,中间件], 回调)
      
      eg:
      app.get('/index', express.urlencoded({extended: true}), (requset, response) => {
          ...
      })
      app.post('/index', express.urlencoded({extended: true}), (request, response) => {
          ...
      })
      app.all('/index', express.urlencoded({extended: true}), (request, response) => {
          ...
      })
      ```

      - request（请求对象）
        - query：获取url中的查询字符串
        - body：获取请求体中的数据组成的对象，默认是获取不到数据的，要借助中间件才能获取到数据
        - params：获取路由参数组成的对象
        - get()：获取请求头中某个属性的值
      - response（响应对象）
        - send()：响应给客户端的数据，传递的是字符串
        - sendFile()：响应给客户端的数据，传递的是一个文件的绝对路径，如果文件不能被浏览器识别，则浏览器会下载该文件
        - download()：响应给客户端的数据，传递的是一个文件的相对或绝对路径，浏览器会下载该文件
        - redirect()：响应给客户端的数据，传递的是一个url地址，浏览器会重定向请求该url地址
        - set()：给响应头设置一个属性，必须在响应前设置，否则无效
        - get()：获取响应头中某个属性的值，可以在响应前或响应后获取

   6. 使用中间件

      什么是中间件：其实就是一个函数，它有三个参数：request(请求对象)，response(响应对象)，next(调用next()则执行下一个中间件)

      中间件分类：应用中间件(自己定义的)、第三方中间件(别人提供的)、内置中间件(express提供的)、路由中间件(router)

      ```js
      //自己定义的
      const express = require('express')
      const app = express()
      function xxxMiddleWare(request, response, next) {
          ...
      }
      app.use(xxxMiddleWare)
      //或
      app.get('/index', xxxMiddleWare, (request, response) => {
          ...
      })
          
      //第三方的
      const express = require('express')
      const app = express()
      const bodyParser = require('body-parser')
      app.use(bodyParser.urlencoded({extended: true}))
      //或
      app.post('/index', bodyParser.urlencoded({extended: true}), (request, response) => {
          ...
      })
      
      //内置的
      const express = require('express')
      const app = express()
      app.use(express.urlencoded({extended: true}))
      //或
      app.post('/index', express.urlencoded({extended: true}), (request, response) => {
          ...
      })
      
      //路由器的
      /* loginRouter.js */
      const express = require('express')
      const router = express.Router()
      const app = express()
      router.app('/index', (request, response) => {
          ...
      })
      module.exports = router
          
      /* server.js */
      const router = require('...loginRouter.js')
      app.use(router)
      
      /*
      	使用use()方法会在所有路由中使用中间件
      	在get()、post()方法中单独使用，中间件只会在当前指定的请求方式和路径的路由执行
      	在all()方法中单独使用，中间件只会在当前指定的路径的路由执行
      */
      ```
      
      __注__：中间件中的request和response对象和 get / post / all 方法中的回调函数的request和response是同一个对象，所以在中间件中对这两个对象的成员进行修改或扩展，都会影响到回调中的这两个对象

   7. 静态资源服务器
   
      ```js
      const express = require('express')
      //创建应用对象
      const app = express()
      //使用express中的static中间件
      app.use(express.static('静态资源目录'))
      //启动服务器
      app.listen(5000, err => {
          ...
      })
      ```



### ejs

1. 什么是ejs

   ejs是node中的一种视图引擎模板，用于后台渲染页面

2. 使用

   1. 下载 `npm i ejs`

   2. 配置
      - `app.set('view engine', 'ejs')`
      - `app.set('views', '模板所在目录路径')`
      
   3. 模板

      - ejs文件

      - 单纯的js代码，不会被渲染：`<% js代码 %>`在node.js中运行的js代码

      - 根据变量动态渲染：`<%- 占位符(变量) %>`会解析html标签、`<%= 占位符(变量) %>`不会解析html标签

      - 根据条件语句动态渲染：

        ```ejs
        <% if (条件) { %>
        	<h1><%= 渲染的数据 %></h1>
        <% } else { %>
        	<h1><%= 渲染的数据 %></h1>
        <% } %>
        ```

      - 根据列表动态渲染：

        ```ejs
        <ul>
        	<% for (let i = 0; i < 10; i++) {%>
            	<li><%= i++ %></li>
            <% } %>
        </ul>
        ```

   4. 服务器响应渲染 `response.render('模板文件名称', {ejs文件中的占位符(变量): 要渲染的数据})`



### HTTP协议

1. 什么是HTTP协议

   HTTP协议就是超文本传输协议，是客户端和服务端之间通信的一种规则

2. 请求报文

   - 请求行：
     - 请求方式：GET、POST、PUT、DELETE等
     - URL：协议://域名:端口号/路径?查询字符串#hash值 如`http://localhost:5000/index?name=chenery#1`
     - 协议及版本：HTTP/1.1
   - 请求头：包含若干个属性
   - 空行
   - 请求体：传递给服务端的数据

3. 响应报文

   - 响应行：
     - 协议及版本：HTTP/1.1
     - 状态码及描述
   - 响应头：包含若干属性
   - 空行
   - 响应体：给客户端返回的数据

4. get请求和post请求的区别

   1. 传递数据的方式

      get请求：在url中的查询字符串中传递

      post请求：在请求体中传递

   2. 传递数据的数据量

      get请求：因为是在url中传递的，所以会有数据大小的限制，不同浏览器限制的数量不尽相同

      post请求：在请求体传递，没有数据大小的限制

   3. 传递数据的安全性

      get请求：因为是在url中传递的，所以请求时传递的数据会直接暴露在url地址中

      post请求：在请求体中传递，相对于get请求来说较安全

5. 状态码

   - 200：表示请求成功
   - 301：重定向
   - 302：重定向
   - 304：资源未被修改，使用缓存的数据
   - 404：请求的资源找不到，客户端错误
   - 500：请求失败，服务端错误



### 会话控制

由于HTTP协议是无状态的协议，它无法区分多次请求是否发送自同一客户端，所以服务端需要记录用户的状态时，需要通过会话控制来解决该问题。

### cookie

1. 什么是cookie？

   客户端向服务器发送请求，如果服务器需要记录该用户的状态，就在响应的时候颁发一个cookie，浏览器收到以后会自动将cookie保存，浏览器再次访问服务器时，会把cookie从请求头中带给服务器，服务器就可以通过浏览器带过来的cookie来辨认用户的状态

2. 使用

   - 下载 `npm i cookie-parser`
   - 引入 `const cookieParser = require('cookie-parser')`
   - 使用中间件 `app.use(cookieParser())`
   - 响应给浏览器 `response.cookie(key, value, cookie有效期(单位毫秒))`



### session

1. 什么是session？

   session是一个对象， 存储特定用户会话所需的属性及配置信息。

   我们可以在服务器中为每一个会话创建一个对象，然后每个对象都设置一个唯一的id，并将该id以cookie的形式发送给浏览器，然后将会话中产生的数据统一保存到这个对象中，这样我们就可以将用户的数据全都保存都服务器中，而不需要保存到客户端，客户端只需要保存一个id即可

2. 使用

   - 下载 `npm i express-session connect-mongo`，需要将session保存到MongoDB中，所以要下载connect-mongo

   - 引入 `const session = require('express-session')`

   - 配置express-session默认的持久化仓库 `const MongoStore = require('connect-mongo')(session)`

   - 设置中间件

     ```js
     app.use(session({
       name: 'id',   //设置cookie的name，默认值是：connect.sid
       secret: 'xxx', //参与加密的字符串（又称签名）
       saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
       resave: true ,//是否在每次请求时重新保存session
       store: new MongoStore({
         url: 'mongodb://localhost:27017/test-app',
         touchAfter: 24 * 3600 // 24小时之内只修改一次
       }),
       cookie: {
         httpOnly: true, // 开启后前端无法通过 JS 操作
         maxAge: 1000*30 // 这一条 是控制 sessionID 的过期时间的！！！
       },
     }))
     ```



### cookie和session的区别

1. 存储的位置
   - cookie：存储在客户端，临时文件中
   - session：存储在服务器的内存中
2. 安全性
   - cookie：是以明文的方式存放在客户端的，安全性低，可以通过一个加密算法进行加密后存放
   - session：存放在服务器的内存中，所以会比cookie安全
3. 网络传输量
   - cookie：用户的数据存放到cookie中，每次在该站点下发送请求都会传递给服务器
   - session：在客户端中只存放了一个id，其他数据存放在服务器中，所以数据量会较小
4. 生命周期：
   - cookie：cookie的生命周期是累计的，从创建时，就开始计时，当客户端重新请求时，不会重新计时
   - session：session的生命周期是间隔的，在session被销毁前，客户端重新请求，会重新计时
5. 存储的大小
   - cookie：保存的数据不能超过4kb，大多数浏览器都限制一个站点最多保存50个cookie
   - session：保存的数据理论上没有大小限制