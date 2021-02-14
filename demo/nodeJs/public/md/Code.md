#### 1. 日期格式化函数封装

```js
    <script>
      function getFormattingDate(date) {
        // 获取完整的年份
        var fullYear = date.getFullYear();

        // 获取月份
        var month = date.getMonth() + 1;
        month < 10 ? month = '0' + month : month;

        // 获取日
        var day = date.getDate();
        day < 10 ? day = '0' + day : day;

        // 获取时
        var hours = date.getHours();
        hours < 10 ? hours = '0' + hours : hours;

        // 获取分
        var minutes = date.getMinutes();
        minutes < 10 ? minutes = '0' + minutes : mintues;

        // 获取秒
        var seconds = date.getSeconds();
        seconds < 10 ? seconds = '0' + seconds : seconds;

        // 用时间格式把时间拼接后返回
        return fullYear + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
      }

      console.log(getFormattingDate(new Date()));
    </script>
```



#### 2. 数组冒泡排序(会修改原数组)

```js
  <script>
    var arr = [];
    function randomArr (arr) {
      for (var i = 0; i < 9; i++) {
        arr.push(Math.floor(Math.random() * 100));
      }
    }
    randomArr(arr);

    // 冒泡排序(会修改原数组)
    /* 
      bubbleSort:数组冒泡排序
        pattern:排序方式
          - true:升序
          - false:降序
    */
    Array.prototype.bubbleSort = function (pattern) {
      // 不传参，默认为升序
      var pattern = pattern === undefined ? true : pattern;
      // 获取数组的长度
      var arrLength = this.length;
      // 外层遍历数组，控制内层需要的次数
      for (var i = 0; i < arrLength; i++) {
        // 内层遍历数组，控制需要比较的次数
        for (var j = 0; j < arrLength - i - 1; j++) {
          // 数组前一个元素和后一个元素的比较，升序就前面大的就交互位置，降序与之相反
          if (pattern && this[j] > this[j + 1] || !pattern && this[j] < this[j + 1]) {
            var tmp = this[j];
            this[j] = this[j + 1];
            this[j + 1] = tmp;
          }
        }
      }
      return this
    }

    console.log(arr);
    console.log('升序===>', arr.bubbleSort(true));
    console.log('降序===>', arr.bubbleSort(false));
    console.log(arr);
    
  </script>
```



#### 3. 数组快速排序(不会修改原数组)

```js
  <script>
    var arr = [];
    // 随机生成长度为9的数组
    function randomArr (arr) {
      for (var i = 0; i < 9; i++) {
        arr.push(Math.floor(Math.random() * 100 + 1));
      }
    }
    randomArr(arr);

    // 快速排序(不会修改原数组)
    /* 
      quickSort:数组快速排序
        pattern:排序方式
        - true:升序
        - false:降序
    */
    Array.prototype.quickSort = function (pattern) {
      // 不传参，默认为升序
      var pattern = pattern === undefined ? true : pattern;
      // 判断数组的长度是否不需要继续排序
      if (this.length < 2) {
        return this
      }
      // 获取基准值 用splice会修改原数组
      // var center = this.splice(Math.floor(this.length / 2), 1);
      var center = this[Math.floor(this.length / 2)];
      // 定义两个空数组，用于存放跟基准值比较后的元素
      var left = [];
      var right = [];
      // 保存当前this
      var _this = this;
      // 遍历数组
      this.forEach(function (item, index) {
        // 判断当前元素的index是否等于基准值的index，是则直接退出，可解决上面用splice会修改原数组的问题
        // _this.indexOf(center) 不太严谨，可使用 _this.indexOf(_this[Math.floor(_this.length / 2)])
        if (index === _this.indexOf(center)) {
          return
        }
        /* // 与基准值的判断
        if (item <= center) {
          // 小于等于基准值放到左边的数组中
          left.push(item);
        } else {
          // 大于基准值放到右边的数组中
          right.push(item);
        } */
        // 加入升序和降序的判断
        if (pattern && item <= center || !pattern && item >= center) {
          left.push(item);
        } else {
          right.push(item);
        }
      })
      // 定义一个新数组，用concat把左边数组、基准值、右边数组连接成一个新数组，左边和右边的数组需要再次递归排序，直到不满足排序的条件
      var newArr = [].concat(left.quickSort(pattern), center, right.quickSort(pattern));
      // 返回新数组
      return newArr
    }
    console.log(arr);
    console.log('升序===>', arr.quickSort(true));
    console.log('降序===>', arr.quickSort(false));
    console.log(arr);
  </script>
```



#### 4. 数组去重方法一(不会修改原数组)

```js
  <script>
    var arr = [];
    // 随机生成长度为9的数组
    function randomArr(arr) {
      for (var i = 0; i < 9; i++) {
        arr.push(Math.floor(Math.random() * 10 + 1));
      }
    }
    randomArr(arr);

    // 数组去重(不会修改原数组)
    Array.prototype.toHeavy = function () {
      // 定义一个新数组
      var newArr = [];
      // 遍历原数组
      this.forEach(function (item) {
        // 当原数组中的元素在新数组中找不到时，把该元素添加到新数组中
        newArr.indexOf(item) === -1 && newArr.push(item);
      })
      // 返回新数组
      return newArr
    }
    console.log(arr);
    console.log('去重后===>', arr.toHeavy());
    console.log(arr);
  </script>
```



#### 5. 数组去重方法二(会修改原数组)

```js
  <script>
    var arr = [];
    // 随机生成长度为9的数组
    function randomArr(arr) {
      for (var i = 0; i < 9; i++) {
        arr.push(Math.floor(Math.random() * 10 + 1));
      }
    }
    randomArr(arr);

    // 数组去重(会修改原数组)
    Array.prototype.toHeavy = function () {
      // 遍历数组
      for (var i = 0; i < this.length; i++) {
        // 从外层遍历开始的后一位开始
        for (var j = i + 1; j < this.length; j++) {
          // 如果前面和后面的元素有相同的
          if (this[i] === this[j]) {
            // 删除后面一个相同的元素
            this.splice(j, 1);
            // 删除后要从删除的位置重新遍历，避免出现连续相同的元素，漏了
            j--;
          }
        }
      }
      // 返回去重后的数组
      return this
    }
    console.log(arr);
    console.log('去重后===>', arr.toHeavy());
    console.log(arr);
  </script>
```



#### 6. 浅拷贝

```js
  <script>
    var obj = {
      name: 'chenery',
      age: 100,
      doThing: function () {
        alert('hello world');
      },
      hobby: ['basketball', 'football']
    }
    var arr = [1, 2, [3, 4, [5, 6]]]

    // 获取对象的类型
    function getType (obj) {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }

    // 浅拷贝 只拷贝最外层，如果修改内层的对象类型值，会影响原对象
    function shallowCopy (obj) {
      // 判断对象是否为object类型并且不是null
      if (getType(obj) === 'object' && obj !== null) {
        var newObj = {};
        // 遍历拷贝
        for (var key in obj) {
          newObj[key] = obj[key];
        }
        // 判断对象是否为array类型
      } else if (getType(obj) === 'array') {
        var newObj = [];
        // 遍历拷贝
        obj.forEach(function (item) {
          newObj.push(item);
        })
        // 其他类型直接返回原对象
      } else {
        return obj;
      }
      // 返回拷贝对象
      return newObj;
    }
    var newObj = shallowCopy(obj)
    console.log(newObj);
    newObj.hobby[0] = [1, 2];
    console.log(newObj);
    console.log(obj);

    var newArr = shallowCopy(arr)
    console.log(newArr);
    newArr[2][0] = [999];
    console.log(arr);
    console.log(newArr);
  </script>
```



#### 7. 深拷贝

```js
  <script>
    var obj = {
      name: 'chenery',
      age: 100,
      doThing: function () {
        alert('hello world');
      },
      hobby: ['basketball', 'football']
    }
    var arr = [1, 2, [3, 4, [5, 6]]];

    // 获取对象类型
    function getType (obj) {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }

    // 深拷贝 递归copy到最内层，任意修改copy对象都不会影响原对象
    function deepCopy (obj) {
      // 判断对象是否为object类型，并且不是null
      if (getType(obj) === 'object' && obj !== null) {
        var newObj = {};
        // 遍历拷贝
        for (var key in obj) {
          // 递归拷贝
          newObj[key] = deepCopy(obj[key]);
        }
        // 判断对象是否为array类型
      } else if (getType(obj) === 'array') {
        var newObj = [];
        // 遍历拷贝
        obj.forEach(function (item) {
          // 递归拷贝
          newObj.push(deepCopy(item));
        })
        // 其他类型时直接把原对象返回
      } else {
        return obj;
      }
      // 返回拷贝对象
      return newObj;
    }

    var newObj = deepCopy(obj);
    console.log(newObj);
    newObj.hobby[0] = [999];
    console.log(obj);
    console.log(newObj);

    var newArr = deepCopy(arr);
    console.log(newArr);
    newArr[2][0] = [999];
    console.log(arr);
    console.log(newArr);
  </script>
```



#### 8. 深拷贝-JSON(JSON不支持函数)

```js
  <script>
    var obj = {
      name: 'chenery',
      age: 100,
      doThing: function () {
        alert('hello world');
      },
      hobby: ['basketball', 'football']
    }
    var arr = [1, 2, [3, 4, [5, 6]]];

    // JSON 可实现深拷贝，但不能拷贝对象中的函数
    var newObj = JSON.parse(JSON.stringify(obj));
    console.log(newObj);
    newObj.hobby[0] = [999];
    console.log(obj);
    console.log(newObj);

    var newArr = JSON.parse(JSON.stringify(arr));
    console.log(newArr);
    newArr[2][0] = 999;
    console.log(arr);
    console.log(newArr);
  </script>
```



#### 9. 节流

```js
  <script>
    var oBtn = document.querySelector('.btn');

    // 绑定点击事件，调用节流函数，返回事件函数
    oBtn.onclick = throttle(click, 2000);
    
    // 定义事件逻辑处理函数
    function click (e) {
      console.log(this, e.target, 'click~~~');
    }
    
    // 节流函数
    function throttle (fn, time) {
      // 定义一个开始时间
      var startTime = 0;
      // 返回一个事件函数
      return function () {
        // 这里的this指向绑定事件的对象
        // 获取点击时的时间
        var endTime = Date.now();
        // 判断 点击时的时间 距离 上一次的时间 的时间差是否符合 传入的时间
        if (endTime - startTime < time) {
          // 小于则直接退出
          return
        }
        // 大于等于则把当前点击的时间赋值给开始时间
        startTime = endTime;
        // 执行事件逻辑处理函数，改变事件逻辑处理函数中的this指向，并把事件对象传递过去
        fn.call(this, arguments[0]);
      }
    }
  </script>
```



#### 10. 防抖

```js
  <script>
    var oBtn = document.querySelector('.btn');

    // 给按钮绑定点击事件，调用防抖函数，返回事件函数
    oBtn.onclick = debounce(click, 2000);

    // 防抖函数
    function debounce(fn, time) {
      // 定义一个定时器
      var timer = null;
      // 返回事件函数
      return function () {
        // 每次点击清除上一个定时器
        clearTimeout(timer);
        // 保存事件函数中的this
        var _this = this;
        // 保存事件函数中的实参
        var arg = arguments;
        // 设置定时器
        timer = setTimeout(function () {
          // 调用事件逻辑处理函数，改变事件逻辑处理函数中的this指向，并把事件对象传递过去
          fn.call(_this, arg[0])
        }, time)
      }
    }
    
    // 事件逻辑处理函数
    function click(e) {
      console.log(this, e.target, 'click~~~');
    }
  </script>
```



#### 11. 手写instanceof

```js
  <script>
    var arr = [1, 2, 3];

    function myInstanceof(A, B) {
      if (typeof A !== 'object' || A === null) {
          return false
      }
      var _A = A;
      var BPro = B.prototype;
      while (_A) {
        // 判断A的原型链上是否有B的显式原型对象，是则返回true
        if (_A.__proto__ === BPro) {
          return true
        }
        _A = _A.__proto__;
      }
      // 不是则返回false
      return false
    }
    function Fn () {}
    var fn = new Fn();
    console.log(arr instanceof Object);
    console.log(myInstanceof(arr, Object));
    console.log(fn instanceof Function);
    console.log(myInstanceof(fn, Function));
    console.log(fn instanceof Fn);
    console.log(myInstanceof(fn, Fn));
  </script>
```





#### 12. 手写new

```js
  <script>
    function Person(name, age) {
      this.name = name;
      this.age = age;
      return 111
    }
    Person.prototype.doThing = function () {
      console.log('do some thing');
    }

    function myNew (constr) {
      // 创建一个空对象
      var obj = {};
      // 该对象的隐式原型指向其构造函数的显式原型
      obj.__proto__ = constr.prototype;
      // 改变构造函数中的this指向并调用
      var re = constr.apply(obj, Array.from(arguments).slice(1));
      if (typeof re === 'object' && re !== null || typeof re === 'function') {
        return re;
      }
      // 返回对象
      return obj;
    }

    var obj = new Object();
    var newObj = myNew(Person, 'chenery', 23);
    console.log(newObj);
    newObj.doThing();

  </script>
```



#### 13. 手写call

```js
  <script>
    var num = 100;
    var obj = {
      num: 1
    }
    function fn (a, b) {
      console.log(this.num);
      console.log(a + b);
      return this
    }
    /* 
      call
        1.改变this指向
        2.调用函数
    */

    Function.prototype.myCall = function (context) {
      // 判断上下文对象的类型
      var context = context !== null && context !== undefined ? Object(context) : window;
      // 在上下文对象中扩展一个属性保存this,这里的this指向调用myCall的上下文对象
      context.fn = this;
      // 调用函数，这时函数中的this就指向了context对象
      var re = context.fn(...Array.from(arguments).slice(1));
      // 调用完要删掉扩展的属性
      delete  context.fn;
      // 返回函数的返回值
      return re;
    }

    fn.myCall(obj, 50, 20);
    fn(50, 100);
  </script>
```



#### 14. 手写apply

```js
  <script>
    var num = 100;
    var obj = {
      num: 1
    }

    function fn() {
      console.log(this.num);
      console.log(arguments[0][0] + arguments[0][1]);
      return this
    }

    Function.prototype.myApply = function (context) {
      // 判断上下文对象的类型
      var context = context !== null && context !== undefined ? Object(context) : window;
      // 给上下文对象扩展一个属性，保存当前的this
      context.fn = this;
      // 执行函数
      var re = context.fn(arguments[1]);
      // 删除扩展的属性
      delete context.fn;
      // 返回函数的返回值
      return re
    }

    fn.myApply(obj, [1, 2]);
  </script>
```



#### 15. 手写bind

```js
  <script>
    var num = 100;
    var obj = {
      num: 1
    }

    function fn(a, b) {
      console.log(this.num);
      console.log(a + b);
      return this
    }

    Function.prototype.myBind = function (context) {
      // 保存当前的this
      var _this = this;
      // 保存当前的arguments
      var arg = arguments;
      // 返回一个改变this指向的函数
      return function () {
        return _this.call(context, ...Array.from(arg).slice(1));
      }
    }
    var re = fn.myBind(obj, 1, 2);
    re();
  </script>
```



#### 16. url字符串转对象

```js
  <script>
    /*
      已知一个地址"http://www.baidu.com:80?user=laoli&pass=123456"
      把查询字符串以对象的形式表现出来，得到一个对象{user:"laoli",pass:"123456}
    */
    var url = 'http://www.baidu.com:80?user=laoli&pass=123456';
    function strToObj (str) {
      // 获取url地址?号后面的字符串
      var searchStr = str.split('?')[1];
      // 以&符分割成数组
      var arr = searchStr.split('&');
      // 定义一个空对象
      var obj = {};
      // 遍历数组
      arr.forEach(function (item) {
        // 以=符分割成数组
        var newArr = item.split('=');
        // 数组中的第一个元素为key，第二个元素为value
        obj[newArr[0]] = newArr[1];
      })
      // 返回对象
      return obj;
    }

    var obj = strToObj(url);
    console.log(obj);
  </script>
```



#### 17. 对象转url字符串

```js
  <script>
    /*
      已知一个查询字符串的对象{user:"laoli",pass:"123456}
      已知一个地址http://www.baidu.com:80
      得到一个url字符串"http://www.baidu.com:80?user=laoli&pass=123456"
    */
    function objToStr(obj, url) {
      // 定义一个字符串，先在已有的url上拼接?符号
      var urlStr = url + '?';
      // 遍历对象
      for (var key in obj) {
        // 在?符号后依次拼接 key=value&
        urlStr += key + '=' + obj[key] + '&';
      }
      // 遍历结束截取到最后一个&符号之前
      urlStr = urlStr.slice(0, -1);
      // 返回url字符串
      return urlStr
    }

    var obj = {
      user: "laoli",
      pass: "123456"
    };
    var url = 'http://www.baidu.com:80';

    var urlStr = objToStr(obj, url);
    console.log(urlStr);
  </script>
```



#### 18. 图片预加载

```js
  <script>
    var imgsrc = [
      "https://s3.ax1x.com/2020/12/08/rSCogx.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCh59.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCI81.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCfUJ.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCWE4.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCHKK.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPCKf.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCqbD.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCbDO.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCTv6.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCOVe.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCXUH.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCj5d.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCxPA.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCz8I.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPPr8.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPS2t.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPpxP.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPiqS.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPkVg.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPE5j.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPZPs.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPMrT.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPeGn.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPm2q.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPnx0.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPQqU.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPKMV.jpg",
      "https://s3.ax1x.com/2020/12/08/rSP3a4.jpg",
      "https://s3.ax1x.com/2020/12/08/rSP1ZF.jpg",
    ];

    // 获取元素
    var oOuter = document.querySelector('.outer');
    var oPer = document.querySelector('.per');
    // 已加载的图片数量
    var count = 0;
    // 遍历图片列表
    imgsrc.forEach(function (item) {
      // 每次创建一个新的img标签
      var newImg = new Image();
      // 给img标签添加src属性
      newImg.src = item;
      // 图片加载事件
      newImg.onload = function () {
        // 每次加载count进行计数
        count++;
        // 获取当前数量和总数量的百分比
        var per = parseInt((count / imgsrc.length) * 100);
        // 给页面的元素改变样式
        oPer.style.width = per + '%';
        oPer.textContent = per + '%';
      }
    })
  </script>
```



#### 19. 图片懒加载

```js
  <script>
    var oBox = document.querySelector('#box');
    var imgArr = ["https://s3.ax1x.com/2020/12/08/rSCogx.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCh59.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCI81.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCfUJ.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCWE4.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCHKK.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPCKf.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCqbD.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCbDO.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCTv6.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCOVe.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCXUH.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCj5d.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCxPA.jpg",
      "https://s3.ax1x.com/2020/12/08/rSCz8I.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPPr8.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPS2t.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPpxP.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPiqS.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPkVg.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPE5j.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPZPs.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPMrT.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPeGn.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPm2q.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPnx0.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPQqU.jpg",
      "https://s3.ax1x.com/2020/12/08/rSPKMV.jpg",
      "https://s3.ax1x.com/2020/12/08/rSP3a4.jpg",
      "https://s3.ax1x.com/2020/12/08/rSP1ZF.jpg"
    ]

    // 生成图片元素
    imgArr.forEach(function (item) {
      var newImg = new Image();
      newImg.src = './images/loading.gif';
      newImg.dataset.src = item;
      oBox.appendChild(newImg);
    })

    // 获取图片元素
    var oImgs = document.querySelectorAll('#box img');
    // 初始化显示 滚动条滚动事件
    window.onload = window.onscroll = function () {
      // 获取浏览器窗口高度
      var winHeight = document.documentElement.clientHeight;
      // 获取滚动条滚动的距离
      var scrollLocation = document.documentElement.scrollTop;
      // 遍历图片元素
      oImgs.forEach(function (item) {
        // 获取图片元素到文档的距离
        // 判断图片是否已经在窗口中显示
        if (getEleToDoc(item).top <= winHeight + scrollLocation) {
          // 出现在窗口把图片加载进来
          item.src = item.dataset.src;
        }
      })
    }

    // 获取元素到文档的距离
    function getEleToDoc (Ele) {
      var l = 0;
      var t = 0;
      var obj = Ele;
      while (obj) {
        if (obj === Ele) {
          l += obj.offsetLeft;
          t += obj.offsetTop;
        } else {
          l += obj.clientLeft + obj.offsetLeft;
          t += obj.clientTop + obj.offsetTop;
        }
        obj = obj.offsetParent;
      }
      return {left: l, top: t}
    }
  </script>
```



#### 20. 继承

```js
  <script>
    // 父类
    function Car (carNumber) {
      this.carNumber = carNumber;
    }
    // 父类原型上的方法
    Car.prototype.leave = function () {
      console.log('leaving ...');
    }
    // 子类
    function MonthCar (type, carNumber) {
      this.type = type;
      // 继承父类的属性
      Car.call(this, carNumber);
    }
    // 子类的实例化对象要想使用父类原型上的方法
    // 父类的实例化对象才能使用父类原型上的方法
    // 所以把父类的实例化对象赋值给子类的原型对象
    MonthCar.prototype = new Car();
    // 修正原型链
    MonthCar.prototype.constructor = MonthCar;

    var car1 = new MonthCar('month', '粤B12345');
    console.log(Car);
    console.log(Car.prototype);
    console.log(MonthCar);
    console.log(MonthCar.prototype);
    console.log(car1);
    console.log(car1.carNumber);
    car1.leave();
  </script>
```



#### 21.路径拼接方法封装

```js
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
```

