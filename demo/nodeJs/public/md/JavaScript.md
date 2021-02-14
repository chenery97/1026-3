## JavaScript构成

- ECMAScript：语言核心部分
- DOM（文档对象模型）：网页文档操作标准，HTML应用程序编程接口（API），DOM把整个文档映射成一个树形节点结构，方便JS脚本快速访问和操作
- BOM（浏览器对象模型）：客户端和浏览器窗口的操作标准，使用BOM可以对浏览器窗口进行访问和操作



## ECMAScript

### 基本使用

#### `<script>`标签

- 向 HTML 页面中插入 JavaScript 的主要方法，就是使用`<script>`元素
- 按照传统的做法，所有`<script>`元素都应该放在页面的`<head>`元素中
- 但是现在脚本一般都写在 body 元素紧接着关标签之上

> - 浏览器解析HTML文档的时候，将根据文档流从上到下逐行解析和显示。JS是HTML组成的一部分，因此JS脚本的执行顺序也是根据`<script>`书写位置决定的
> - 作为最佳实践，我们会在关闭body标签前引入JavaScript代码。这样浏览器就会在加载脚本之前解析和显示HTML，有利于提升页面的性能

#### 外部JS文件

- JS程序不仅可以直接写在HTML文档中，也可以放在JavaScript文件中。后缀名是.js。使用任何文本编辑器都可以编辑。
- JS文件不能够单独运行，需要使用 `<script>`标签导入到网页中。
- 定义src属性的`<script>`标签不应该再含有JavaScript代码，否则只会下载并执行外部JavaScript文件，嵌入代码被忽略。

#### 延迟执行JS-defer

- `<script>`标签有一个布尔型属性defer，这个属性的用途是表明脚本在执行时不会影响页面的构造，也就是说，脚本会被延迟到整个页面都解析完成后再运行。
- 因此在script元素中设置defer属性，相当于告诉浏览器立即下载，但是延迟执行
- 如果页面中有多个延迟脚本，那么第一个延迟脚本会先于第二个延迟脚本执行，而这些脚本会先于DOMContentLoaded事件执行
- 适用于外部JS文件，不适用于script标签包含的脚本

#### 异步加载JS-async

- 在默认情况下，网页都是同步加载外部 JavaScript文件的，在引入外部js文件时会阻塞dom的执行，为此在html4.01为script标签引入了async属性
- 现在可以为`<script>`标签设置 async属性，让浏览器异步加载 Javascript文件，即表示应该立即下载脚本，但不应妨碍页面汇总的其它操作。只对外部脚本文件有效。
- 异步脚本不要在加载期间修改DOM，异步脚本语言一定会在页面的load事件前执行，但可能会在DOMContentLoaded事件(DOM渲染完成的监听事件)触发之前或之后执行。
- 因为是下载完立即执行，不能保证多个加载时的先后顺序，因此确保异步脚本之间互不依赖



### 数据类型

#### 数据类型分类

- JS数据类型分为两种：基本数据类型和复杂数据类型
- 基本数据类型包含：string、number、boolean、null、undefined、symbol、bigint
- 复杂数据类型包含：object、array、function、set、map等

> 基本数据类型和复杂数据类型的区别：
>
> 1. 复杂数据类型可以添加属性和方法；基本数据类型就算添加了属性和方法也无法获取或使用。
> 2. 复杂数据类型存放在栈内存和堆内存中，通过栈内存中的内存地址引用到堆内存中的内存地址，从而获取数据；基本数据类型存放在栈内存中，栈内存存了变量的标识符和变量的值。
> 3. 复杂数据类型比较的是内存地址；基本数据类型比较的是值。

> null和undefined的区别：
>
> - null和undefined都只有一个值，这个值就是它们本身
>
> - null是一个空对象指针，这也是使用typeof检测null时会返回object的原因
> - undefined通常在调试代码打印的时候出现
> - null和undefined相等
>   - null的使用场景：
>     1. 函数的参数要求传一个对象，但我不想传的时候可以传递一个null
>     2. 原型链的终点就是null
>     3. 声明一个变量用来存放对象时，可以初始化为null
>     4. 当一个对象不再使用时，可以设置为null
>   - undefined的使用场景：
>     1. 声明一个变量未赋值时，默认为undefined
>     2. 函数的形参没有接收到实参时，该形参的值为undefined
>     3. 函数没有返回值时，默认返回undefined
>     4. 对象没有赋值的属性，该属性的值为undefined

#### 检测数据类型

- typeof操作符：可以检测string、number、boolean、undefined、function、symbol、bigint
- ===运算符：可以检测null、undefined
- instanceof操作符：可以检测构造函数的prototype属性是否出现在某个实例对象的原型链上
- Object.prototype.toString.call(val).slice(8， -1)：可以完美检测各种数据类型

#### Number类型

1. 分类
   - 整数
   - 浮点数
   - 二进制数（0b开头）
   - 八进制数（0o开头）
   - 十六进制数（0x开头）
   - 科学计算法
   - Infinity
   - NaN
2. 最大值和最小值
   - Number.MAX_VALUE
   - Number.MIN_VALUE
3. Infinity
   - 计算超出范围会得到无穷大（infinity）或者无穷小（-infinity）
   - 分母为0会构成无穷大或无穷小
   - 关于Infinity的运算， 无法计算 加减乘除一个数字都是Infinity，Infinity和Infinity计算，加法乘法为Infinity，其他为NaN
   - Infinity和自身相等 其他比较正常
4. NaN
   - 非数值（not a number）是一个特殊的数值
   - 这个数值用于表示一个本来要返回数值但未返回数值的情况（这样就不会抛出错误了）
   - NaN与任何数据类型进行比较都是false，与任何数值进行计算结果都是NaN（除了 NaN ** 0 返回1之外）

##### 类型转换之Number()方法

```js
// 1、Number转  数字转数字  还是原来的值

// 2、字符串转数字
console.log(Number(""));//0 空字符串-->0
console.log(Number("   "));//0 都是空格的字符串-->0
console.log(Number("123"));//0 纯数字的字符串-->相对应的数字
console.log(Number("1a23"));//0 非纯数字的字符串-->NaN

//3、布尔值转数字
console.log(Number(true));//1  true-->1
console.log(Number(false));//0  false-->0

// 4、undefined转数字
console.log(Number(undefined));//NaN  undefined-->NaN

// 5、null转数字
console.log(Number(null));// 0   null--->0

// 6、object(数组和对象)转数字
console.log(Number([]));//0 空数组-->0
console.log(Number([1，2，3]));//NaN 一般非空数组-->NaN
console.log(Number([1]));//1 数组只有一个值，并且是数字-->当前数字
console.log(Number(["1"]));//1 数组只有一个值，并且是数字值的字符串-->当前数字
console.log(Number(["a"]));//0 数组只有一个值，并且是非数字-->NaN

console.log(Number({}));//NaN  空对象-->NaN
console.log(Number({name："lily"}));//NaN  非空对象-->NaN
```

##### 类型转换之parseInt()方法

parseInt是一个全局方法，它可以把值转换为整数

- 第1步，先解析位置0处的字符，如果不是有效数字，则直接返回 NaN。
- 第2步，如果位置0处的字符是数字，或者可以转换为有效数字，则继续解析位置1处的字符，如果不是有效数字，则直接返回位置0处的有效数字。
- 第3步，以此类推，按从左到右的顺序，逐个分析每个字符，直到发现非数字字符为止。
- 第4步，parseInt()将把前面分析合法的数字字符全部转换为数值并返回。

> 注意： 浮点数中的点号对于parseInt来说属于非法字符，因此不会转换小数部分值。 如果是以0开头的数字字符串，则parseInt()不会把它作为八进制数字处理 如果是以0x 开头的数字字符串，则 parseInt()会把它作为十六进制数字处理，先把它转换为十六进制数值，然后再转换为十进制的数字返回。

> parsInt也支持基模式，可以把不同进制的数字字符串转换为整数

##### 类型转换之parseFloat()方法

- parseFloat()也是一个全局方法，它可以把值转换成浮点数，即它能够识别第一个出现的小数点，而第二个小数点视为非法。解析过程和parseInt相同。
- parseFloat()的参数必须是十进制的字符串，对十六进制和八进制前的0进行忽略或返回0。

##### 类型转换之运算符方法

- 乘法：变量乘1，变量就会被自动隐式转换为数字类型，转不了就变成了NaN
- 除法：变量除1，变量就会被自动隐式转换为数字类型，转不了就变成了NaN
- 减法：变量减0，变量就会被自动隐式转换为数字类型，转不了就变成了NaN
- 加法：变量前使用+号，变量就会被自动隐式转换为数字类型，转不了就变成了NaN

#### String类型

JavaScript字符串(String)就是由零个或多个Unicode字符组成的字符序列。零个字符表示空字符串。

- 子行串必须包含在单引号或双引号中
- 如果字符串包含在双引号中，则字符串内可以包含单引号;反之，也可以在单引号中包含双引号
- 在ECMAScript 3中，字符串必须在一行内表示，换行表示是不允许的，如果要换行显示字符串，可以在字符串中添加换行符(\n)
- 在ECMAScript 5中，字符串允许多行表示.实现方法：在换行结尾处添加反斜杠(\).反斜杠和换行符不作为字符串直接量的内容
- 在字符串中插入特殊字符，需要使用转义字符，如单引号，双引号等
- 字符串中每个字符都有固定的位置.第1个子符的下标位置为0，第2个字符的下标位置为1...···以此类推，最后一个字符的下标位置是字符串长度减1

##### 类型转换之String()方法

```js
//1.null类型的转换
console.log(String(null));//字符串的 'null'

//2.undefined转换
console.log(String(undefined));//字符串的'undefined'

//3.number类型的转换
//转换规则：普通数字直接变成字符串  其他进制先转换成10进制然后在转换成相应的字符串 无穷大无穷小NaN都直接变成字符串
console.log(String(123));//'123'
console.log(String(-123));//'-123'
console.log(String(010));//'8'
console.log(String(0xff));//'255'
console.log(String(4E-5));//'0.00004'
console.log(String(Infinity));//'Infinity'
console.log(String(-Infinity));//'-Infinity'
console.log(String(12.3));//'12.3'
console.log(String(NaN));//'NaN'

//4.布尔值的转换
console.log(String(true));//'true'
console.log(String(false));//'false'

//5.对象的转换
console.log(String([]));//空字符串 ''
console.log(String([1]));//'1'
console.log(String([1，2，3]));//'1，2，3'
console.log(String({}));//[object object]
console.log(String({name："lily"}));//[object object]
```

##### 类型转换之toString()方法

- 我们的代码中有+（加号）运算符等情况下，它在这种情况下（字符串 + 其它什么东西），会调用toString()方法，将其它类型的东西转化为字符串，再和原始字符串拼接成一个字符串
- 除了null和undefined之外，其他的类型(数值、布尔、字符串、对象)都有toString()方法，它返回相应值的字符串表现(并不修改原变量)。
- 每个对象都有一个toString()方法。
- 当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。

#### Boolean类型

布尔类型仅包含两个固定的值：`true`和`false`。其中`true`代表真，`false`代表假。

在一些判断的操作中，需要使用布尔值

##### 类型转换之Boolean()方法

```js
//1、null
console.log(Boolean(null));//false

//2.undefined
console.log(Boolean(undefined));//false

//3.number
//数字转布尔值   非0为true  0为false NaN为false
console.log(Boolean(123));//true
console.log(Boolean(-123));//true
console.log(Boolean(0));//false
console.log(Boolean(1.23));//true
console.log(Boolean(NaN));//false
console.log(Boolean(Infinity));//true
console.log(Boolean(010));//true
console.log(Boolean(0xa));//true

//4.string

//空为false  非空为true
console.log(Boolean("123"));//true
console.log(Boolean(""));//false
console.log(Boolean("    "));//true

//5.object
//对象类型都转换成true
console.log(Boolean([]));//true
console.log(Boolean([1，2，3]));//true
console.log(Boolean([0]));//true
console.log(Boolean({}));//true
console.log(Boolean({name："lily"}));//true
```

##### 类型转换之双重逻辑非

一个逻辑非运算符（!）可以把值转换为布尔值并取反，两个就是转换成正确的布尔值

##### 类型转换之if判断

if判断会自动把判断式转成boolean值

#### Symbol类型

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法，新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入`Symbol`的原因。

ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型

使用：

- Symbol 值通过`Symbol`函数生成。
- 这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突
- Symbol中传入的字符串没有任何意义，只是用来描述Symbol的
- Symbol不能使用New调用
- 类型转换的时候，不能转数字
- 如果把Symbol当作一个对象的属性和方法的时候，一定要用一个变量来储存，否则定义的属性和方法没有办法使用
- for in 不能遍历出来，可以使用Object.getOwnPropertySymbols方法来拿

#### BigInt类型

- JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回`Infinity`。
- 引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
- 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀`n`。
- BigInt 与普通整数是两种值，它们之间并不全等。



### 变量类型和数据类型

JS的变量本身是没有类型的， 变量的类型实际上是变量内存中数据的类型

- 变量类型：
  - 基本类型： 保存基本类型数据的变量
  - 引用类型： 保存对象地址值的变量
- 数据类型：
  - 基本类型值
  - 对象类型值



### 运算符

#### 逗号操作符

- 逗号运算符是二元运算符，它能够先执行运算符左侧的操作数，然后再执行右侧的操作数，最后返回右侧操作数的值
- 逗号运算符可以实现连续运算，如多个变量连续赋值

#### 点操作符

- 访问对象成员的一种方法，对象的key最终都会被解析成字符串，点操作符后面跟的是字符串的key，不需要加引号

#### 中括号操作符

- 访问对象成员的一种方法，中括号中的变量或表达式最终会被解析成字符串
- 使用中括号操作符访问对象的场景一般是对象的key由变量或表达式的方式获取
- 通过下标的方式访问序列化数据类型的成员

#### new操作符

- 创建一个空对象
- 将空对象的`__proto__`属性指向构造函数的原型对象
- 将构造函数内部的this绑定到新建的对象上，执行构造函数
- 若构造函数没有返回非原始值（不是引用类型的值），则返回新建的对象。否则，返回引用类型的值。



### 函数

#### 函数简介

- 具有特定功能的n条语句的封装体
- 只有函数是可执行的， 其它类型的数据是不可执行的
- 函数也是对象

#### 定义函数

- 在JavaScript中可以使用function语句声明函数
  - function后面跟的是函数名，与变量名一样都必须是JavaScript合法的标识符。
  - 在函数名之后是一个由小括号包含的参数列表，参数之间以逗号分隔。参数是可选的，没有数量限制。
  - 作为标识符，参数仅在函数体内被访问，参数是函数作用域的私有成员。调用函数时，通过为函数传递值，然后使用参数获取外部传入的值，并在函数体内干预函数的运行。
  - 在小括号之后是一个大括号，大括号内包含的语句就是函数体结构的主要内容。在函数。体中，大括号号是必不可少的，缺少大括号， JavaScript将会抛出语法错误。
- 使用表达式定义函数`const fn = function(){}`
- 实例化函数对象`const fun = new Function(string)`

#### 作用域

##### 变量作用域

变量作用域（scope）是指变量在程序中可以访问的有效范围。也称为变量的可见性。分为全局变量和局部变量

- 全局变量：变量在整个页面中都是可见的，可以被自由的访问
- 局部变量，变量仅能在声明的函数内部可见，函数外是不允许访问的。
- var声明的作用域是按照函数划分的

##### 执行上下文

- JS引擎并不是一行一行的解析和执行的，而是一段一段的解析和执行，当执行某段代码的时候，会进行一个准备工作，这个准备工作称为执行上下文，执行上下文也是在内存中开辟的一个空间
- 执行上下文分为全局执行上下文和局部执行上下文
- 执行上下文有很多，所以有一个执行上下文栈来负责管理执行上下文
- 在JS代码执行时，会在执行上下文栈中压入一个全局的执行上下文，等待页面执行完毕后从栈里弹出
- 执行到函数的时候，会往执行上下文栈中压入一个局部的执行上下文，只要函数执行完成，会将函数从栈里弹出
- 执行上下文有三个重要属性：变量对象、作用域链、this

##### 变量对象

- 函数在执行时才会激活变量对象，才能使用变量
- 变量对象和执行上下文有关，所以分为了全局变量对象和局部变量对象
- 在全局作用域中所有的变量都是全局变量对象的属性和方法，而全局变量对象就是window
- 函数执行时会创建一个变量对象，用来存放函数中的变量，包括形参、变量、函数
- 在局部变量对象中会先确定形参和实参
- 然后确定声明的函数，如果函数和形参同名，则会覆盖
- 最后确定声明的变量，如果变量和函数或形参同名，则在赋值之前不会干扰函数或形参的值

##### 作用域链

- 函数创建的时候，会生成一个包含全局变量对象的作用域链（scope chain），作用域链是保证对执行环境有权访问所有变量和函数的有序访问
- 函数在执行的时候，会创建一个当前作用域的变量对象，并把这个对象插入到作用域的顶端，形成完整的作用域链
- 作用域链的顶端一定是当前作用域中的变量对象，作用域链的末端一定是全局变量对象
- 在寻找变量的时候，会沿着作用域的顶端一层一层地往作用域的末端去寻找，直到找到为止，找不到则报错

##### this

- JavaScript函数的作用域是静态的，但是函数的调用却是动态的，由于函数可以在不同的运行环境内执行，因此 JavaScript在函数体内定义了this关键字，用来获取当前的运行环境
- this是一个指针型变量，它动态引用当前的运行环境，具体来说，就是调用函数的对象
- this永远指向其所在函数的调用者，如果没有调用者则指向全局对象window（在严格模式下，指向undefined）

> **this指向：**
>
> 1. **普通调用：this指向window，在严格模式下指向undefined**
> 2. **对象的方法调用：this指向该对象**
> 3. **构造调用：this指向实例化对象**
> 4. **call、apply、bind调用：this指向第一个实参对象**
> 5. **箭头函数：this指向箭头函数外层的this**

#### 原型和原型链

- 每一个函数都有一个prototype显式原型属性
- 每一个对象都有一个`__proto__`隐式原型属性
- 对象的`__proto__`属性指向其构造函数的prototype属性
- 在寻找对象属性的时候，如果在对象自身找不到，则会去对象的`__proto__`隐式原型属性中寻找，也就是找到其构造函数的prototype显示原型属性上，如果还是找不到，则会去prototype的`__proto__`隐式原型属性上寻找，而prototype也是一个对象，并且prototype的构造函数是Object，所以最终会找到Object的prototype显示原型属性上，如果还是找不到则会返回undefined

![终极原型链](.\终极原型链.jpg)



#### 函数三要素

- 函数名
- 参数
- 返回值

#### 回调函数

- 什么是回调函数
  - 我定义的
  - 我没有直接调用
  - 函数最终执行了(在特定条件或时刻)
- 常见的回调函数
  - DOM事件函数
  - 定时器函数
  - ajax回调函数
  - 生命周期回调函数

#### IIFE

- 理解
  - 全称： Immediately-Invoked Function Expression 立即调用函数表达式
  - 别名： 匿名函数自调用
- 作用
  - 隐藏内部实现
  - 不污染外部命名空间

#### 闭包

- 闭包的产生

  - 函数嵌套函数
  - 内部函数引用了外部函数的数据（变量/函数）
  - 外部函数执行

  **注**：闭包的另一种理解，在内部函数中包含引用外部函数变量的closure对象，称为闭包

- 闭包的使用场景
  - 将函数作为另一个函数的返回值
  - 将函数作为实参传递给另一个函数调用
- 闭包的作用
  - 延长局部变量的生命周期
  - 在函数外部可以操作函数内部的数据
- 闭包的生命周期
  - 产生：外部函数执行，内部函数声明提升定义执行完产生闭包
  - 消失：内部函数没有被引用时闭包消失
- 闭包的缺点
  - 函数执行完后， 函数内的局部变量没有释放， 占用内存时间会变长
  - 容易造成内存泄漏
- 闭包缺点的解决方案
  - 减少使用闭包
  - 及时手动释放、取消内部函数的引用



### 对象

#### 对象简介

- 代表现实中的某个事物（东西）， 是该事物在编程中的抽象
- 多个数据的集合体(封装体)

#### 对象的组成

- 属性
  - 代表现实事物的状态数据
  - 由属性名和属性值组成
  - 属性名都是字符串类型，属性值是任意类型
- 方法
  - 代表现实事物的行为数据
  - 是特别的属性，属性值是函数

#### 对象的创建

1. Object构造函数模式
   - 先创建空的Object对象，再动态添加属性/方法
   - 适用场景：起始时不确定对象内部数据
   - 问题：语句太多
2. 对象字面量模式
   - 使用{}创建对象，同时指定属性/方法
   - 适用场景：起始时对象内部数据是确定的
   - 问题：如果创建多个对象，有重复代码
3. 工厂模式
   - 通过工厂函数动态创建对象并返回
   - 适用场景：需要创建多个对象
   - 问题：对象没有一个具体的类型，都是Object类型
4. 自定义构造函数模式
   - 自定义构造函数，通过new创建对象
   - 适用场景：需要创建多个类型确定的对象
   - 问题：每个对象都有相同的数据，浪费内存
5. 构造函数+原型的组合模式
   - 自定义构造函数，属性在函数中初始化，方法添加到原型上
   - 适用场景：需要创建多个类型确定的对象

#### 面向对象的三个特征

- 封装：封装的目的是将信息隐藏，封装包含封装数据、封装实现
  - 封装数据：JS的变量定义没有private、protected、public等关键字来提供权限访问，因此只能依赖作用域来实现封装特性
  - 封装实现：封装实现即隐藏实现细节、设计细节，封装使得对象内部的变化对其他对象而言是不可见的，对象对它自己的行为负责，其他对象或者用户都不关心它的内部实现，使用者只知道如何使用即可。封装使得对象之间的耦合变松散，对象之间只通过暴露的API接口来通信。
- 继承：继承是子类对象能够使用父类对象的数据和行为
  - 原型链继承：
    1. 定义父类构造函数
    2. 给父类的原型添加方法
    3. 定义子类构造函数
    4. 创建父类的对象赋值给子类的原型
    5. 将子类原型的构造属性设置为子类
    6. 给子类原型添加方法
    7. 创建子类对象，可以调用父类的方法
  - 构造继承：
    1. 定义父类构造函数
    2. 定义子类构造函数
    3. 在子类构造函数中调用父类构造函数，并绑定父类构造函数中的this指向子类构造函数中的this
  - 原型+构造继承：结合上面两种方式实现子类继承父类的实例属性和原型方法
- 多态：同一个操作作用于不同的对象上面，可以产生不同的结果，一个接口多种实现



### 属性和方法

- 私有属性和私有方法：只能在私有属性或私有方法所在作用域中访问这个属性或方法
- 静态属性和静态方法：只有构造函数才能访问静态属性和静态方法，实例不能访问
- 公有属性和公有方法（实例属性、特权方法、原型对象上的属性或方法）：只有实例化对象才能访问公有属性和公有方法，构造函数不能访问



### 线程机制和事件机制

#### 进程与线程

- 进程：程序的一次执行，它占有一片独立的内存空间

- 线程：进程内的一个独立单元，CPU的基本调度单位，是程序执行的一个完整流程

- 进程与线程

  - 一个进程中一般至少有一个运行的线程，这个线程被称为主线程
  - 一个进程中可以同时运行多个线程，这个程序是多线程运行的
  - 一个进程内的数据可以供其中多个线程直接共享
  - 多个进程之间的数据不能直接共享

  

  - 比较单线程与多线程
    - 多线程

      - 优点：

        能有效提升CPU的利用率

      - 缺点

        创建多线程开销

        线程间切换开销

        死锁与状态同步问题

    - 单线程

      - 优点：顺序编程简单易懂
      - 缺点：效率低

    - JS是单线程还是多线程？

      - js是单线程运行的
      - 但使用H5中的 Web Workers可以多线程运行

    - 浏览器都是多线程

#### 浏览器内核

- 支撑浏览器运行的最核心的程序
- 不同的浏览器内核可能不一样
  - Chrome， Safari ： webkit
  - firefox ： Gecko
  - IE ： Trident
  - 360，搜狗等国内双内核浏览器： Trident + webkit
- 内核由很多模块组成
  - 主线程
    - js引擎模块 ： 负责js程序的编译与运行
    - html，css文档解析模块 ： 负责页面文本的解析
    - DOM/CSS模块 ： 负责dom/css在内存中的相关处理
    - 布局和渲染模块 ： 负责页面的布局和效果的绘制(内存中的对象)
  - 分线程
    - 定时器模块 ： 负责定时器的管理
    - DOM事件响应模块 ： 负责事件的管理
    - 网络请求模块 ： 负责Ajax请求

#### 事件循环模型（事件轮询机制）

- 代码分类
  - 初始化执行代码（同步代码：for循环、绑定事件、设置定时器、发送Ajax请求等）
  - 回调执行代码（异步代码：事件回调函数、定时器回调函数、Ajax请求回调函数等）
- 代码执行顺序
  - 先执行同步代码
  - 再执行异步代码
- 事件模型两个内容
  - 浏览器事件管理模块：DOM事件管理模块、定时器管理模块、Ajax管理模块
  - 回调队列
- 事件轮询
  - 执行同步代码，并把异步回调函数交给浏览器事件管理模块
  - 当事件发生时，浏览器事件管理模块会将相应的回调函数和数据添加到回调队列中
  - 当同步代码执行完，才会遍历读取回调队列中的回调函数执行

#### H5多线程

- H5规范提供了JS分线程的实现，叫做Web Worker
- 相关API
  - Worker：构造函数，加载分线程执行的js文件
  - Worker.prototype.onmessage：用于接收另一个线程的回调函数
  - Worker.prototype.postMessage：向另一个线程发送消息
- 缺点
  - worker内代码不能操作DOM
  - 不能跨域加载JS
  - 不是每个浏览器都支持这个新特性

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <button id="btn1">主线程运算计算</button>
        <button id="btn2">worker计算</button>
        <button>我是否假死</button>
        <script>
            btn1.onclick=function () {
                var num=0;
                for (var i=0;i<999999999;i++){
                    num+=i;
                    num+=Math.sqrt(num);
                }
                alert(num);
            }

            btn2.onclick=function () {
                // 1.创建一个worker
                var wk=new Worker("worker1.js");
                //2.把需要计算的数据传递到worker
                wk.postMessage(9999999);

                // 主线程也要书写一个事件，当子线程传输回来数据的时候，会直接出发message事件
                wk.onmessage=function (e) {
                    alert(e.data);
                    wk.terminate();
                }
            }
        </script>
	</body>
</html>
```

```js
//在worker中用this调用message事件
//在event事件对象中，它的data就是postmessage传输过来的值
this.onmessage=function (e) {
    var num=0;
    for (var i=0;i<e.data;i++){
        num+=i;
        num+=Math.sqrt(num);
    }
    // 在worker中，可以直接使用postmessage把得到数据传送回主线程
    postMessage(num);
    close();
}
```

### 严格模式

在ES5中有两种运行模式

- 正常运行模式，也叫混杂模式
- 严格模式：只要在全局函数中的第一行书写`"use strict";`字符串，即可开启严格模式

  - 严格模式下，变量必须在声明后才能使用
  - 严格模式下，禁止自定义函数中的this指向window
  - 严格模式下，使用eval会生成一个eval作用域

### JSON对象

JSON全称是JavaScript Object Notation，是一种轻量级的数据交换格式。JSON 与XML具有相同的特性，是一种数据存储格式，但是JSON相比XML 更易于人编写和阅读，更易于生成和解析。

- JSON.stringify(obj/arr)：将js对象转换为json字符串
- JSON.parse(json)：将json字符串转为js对象

### Object扩展

#### Object.create()方法

- Object.create是 ECMAScript5新增的一个静态方法，用来定义一个实例对象。
- 该方法可以指定对象的原型和对象特性，使用现有的对象来提供新创建的对象的`__proto__`。具体用法如下`object.create (prototype, descriptors)`
  - prototype：必传，指定原型对象，可以为null
  - descriptors：可选参数，包含一个或多个属性描述的JavaScript对象。属性描述符包含数据特性和访问特性，其中数据特性说明如下
    - value：指定属性值
    - writable：默认为false，设置属性是否可写
    - enumerable：默认为false，设置属性是否可枚举（for/in）
    - configurable：默认为false，设置是否可修改属性特性和删除属性

```js
//Object.create方法
var obj = {};
console.log(obj);

var obj2 = Object.create(obj1);
console.log(obj2);//空对象  但是继承了obj1
console.log(obj2.name);//自己没有没关系  他爹有

o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);

//创建一个干净的对象
var obj3 = Object.create(null);
console.log(obj3);

//创建一个对象
var obj4 = Object.create(null,{
    name:{
        value:"xiaowang",
        writable:true,
        enumerable:true,
    },
    sex:{
        value:"nv"
    }
})
console.log(obj4);
console.log(obj4.name);
obj4.name = "laowang";
console.log(obj4);

for(i in obj4){
    console.log(i);
}
```

#### Object.defineProperty()方法

使用 Object.defineProperty函数可以为对象添加属性，或者修改现有属性。如果指定的属性名在对象中不存在，则执行添加操作；如果在对象中存在同名属性，则执行修改操作

```js
// Object.defineProperty（obj,pro,{}）
var obj8 = {
    name:"xiaoli"
}
Object.defineProperty(obj8,"sex",{
    value:"nv",
});
Object.defineProperty(obj8,"name",{
    //如果修改原有的name属性值，它可以被修改和枚举
    value:"dali",
});
console.log(obj8);
for(var i in obj8){
    console.log(i);
}
```

#### Object.defineProperties()方法

- 可以一次定义多个属性
- Object.defineProperties(object,description)
  - object：对其添加或修改属性的对象，可以是本地对象或DOM对象
  - description：包含一个或多个描述符对象，每个描述符对象描述一个数据属性或访问器属性

```js
var obj9 = {
    like:"miantiao"
}
Object.defineProperties(obj9,{
    color:{
        value:"yellow",
        enumerable:true
    },
    length:{
        value:"10",
    }
})
console.log(obj9);
```

### 存取器属性getter和setter的实现

- get propertyName(){} 用来得到当前属性值的回调函数
- set propertyName(){} 用来监视当前属性值变化的回调函数
- getter负责查询值，它不带任何参数，setter则负责设置键值，值是以参数的形式传递，在他的函数体中，一切的return都是无效的



## ES6

### 关键字扩展

#### 函数作用域和块级作用域

- 在ES5中，JS的作用域分为全局作用域和局部作用域。通常是用函数区分的，函数内部属于局部作用域。
- 在ES6中，新增了块级作用域的概念，使用{}括起来的区域叫做块级作用域

#### let

- let关键字声明变量，实际上是生成了块级作用域

- 特点
  - 没有声明提升
  - 在同一个作用域中不允许重复声明同一个变量
  - 在全局中声明的变量不再是window全局对象的属性

#### const

- const关键字声明变量，实际上是生成了块级作用域
- 特点
  - 包含let的所有特点
  - 在声明时必须赋一个初始值
  - 无法修改基本类型的值，可以修改对象类型中属性的值

#### 块级作用域的函数声明

函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

- ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
- ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。
- ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式
- 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```js
//尽量避免以下写法
fn1();
if (true) {
    function fn1() {
        alert(1);
    }
}
fn1();

//如果真的想在声明块级作用域函数，使用函数表达式
if (true) {
    let fn1 = function () {
        alert(1);
    }
}
```



### 变量解构赋值

#### 什么是变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

解构赋值 本质就是赋值，把结构解散重构 然后赋值 其实是一种模式的匹配，关键要掌握一一对应关系。

解构赋值作用就是方便赋值。

```js
//1.请把数组arr1中的值分别赋值给变量 a b c d
//ES5的方法
/* let arr1 = [1， 2， 3， 4];
        let a = arr1[0];
        let b = arr1[1];
        let c = arr1[2];
        let d = arr1[3];
        console.log(a， b， c， d) */

//解构赋值的方法
let [a， b， c， d] = [1， 2， 3， 4];
console.log(a， b， c， d)
```

#### 数组的解构赋值

数组解构赋值可以从数组中提取值，按照对应位置，对变量赋值

- 变量的数量大于数组元素的个数，解构失败返回undefined，可以为解构赋值设置默认值，当解构失败时使用默认值
- 变量的数量小于数组元素的个数，不完全解构也可以成功，可以使用rest参数，解构剩下的元素都会被rest参数接收，组成一个数组
- 多维数组只要解构关系一一对应也可以进行赋值

#### 对象的解构赋值

- 解构不仅可以用于数组，还可以用于对象.
- 对象的解构与数组有一个重要的不同。数组的元素是按顺序排列的，变量的取值由它的位置决定；而对象的属性没有顺序，变量必须与属性同名，才能取到正确的值
- 对应关系是根据key不需要考虑顺序
- 对象解构赋值可以设置默认值
- 对象和数组解构可以嵌套

#### 解构赋值的应用

- 函数的多个返回值获取

```js
//1.接收函数的多个返回值
function fn(){
    return [1，2，3，4];
}
let [a，b，c，d] = fn();
console.log(a，b，c，d);

function fn() {
    return { foo： "hello"， hoo： "word" };
}
let { foo } = fn();
console.log(foo);
```

- 函数传参数

```js
//2.函数传参数
function fn1([x， y， z]) {
    console.log(x， y， z);
}
fn1([1， 2， 3]);

function fn2({ x， y， z }) {
    console.log(x， y， z);
}
fn2({ y： 2， x： 1， z： 3 });
```

- json数据的提取

```js
//3.json数据的提取
let json = {
    name： "lily"，
    sex： "nv"，
    age： 18
}
let { name， age， sex } = json;
console.log(name， age， sex)
```

### 字符串扩展

#### 模板字符串

- 模板字符串（template string）是增强版的字符串，用反引号（`）标识。
- 它可以当作普通字符串使用，也可以用来定义多行字符串。模板字符串中嵌入变量，需要将变量名写在`${}`之中。
- 大括号内部可以放入任意的 JavaScript 表达式。

#### 字符串的方法

- 去空白字符
  - trim()：去除字符串两端的空白字符
  - trimStart()：去除字符串前端的空白字符
  - trimEnd()：去除字符串后端的空白字符
- 判断字符串是否包含某个字符
  - startsWith(str)：判断字符串开头是否包含某个字符串
  - endsWith(str)：判断字符串结尾是否包含某个字符串
  - includes(str)：判断字符串是否包含某个字符串
- 重复字符串
  - repeat(num)：重复当前字符串n次
- 补充字符串
  - padStart()：当字符串不够某个长度的时候，在字符串前边补充指定字符
  - padEnd()：当字符串不够某个长度的时候，在字符串后边补充指定字符

- 拼接字符串
  - concat(str1， str2，...)：按照顺序拼接字符串
  - +运算符：拼接字符串
- 字符串查找
  - charAt(n)：返回字符串中的第n个字符，参数如果不是0~length-1之间，则返回空字符串
  - indexOf()和lastIndexOf()：可以根据参数字符串，返回指定字符串的下标位置。两个方法都有两个参数，第一个参数是查找的目标字符，第二个参数是起始位置
  - search()：与indexOf()的功能相同，查找指定字符串第一次出现的位置，但是只有一个参数，定义匹配模式，没有反向检索和全局模式
  - match()：找出所有匹配的字符串，并以数组的形式返回，如果匹配模式没有指定全局，则进行1次匹配，如果没有找到则返回null
- 字符串截取
  - substr()：根据指定长度来截取字符串。包含两个参数，一个是起始下标，一个是截取长度，省略第二个参数则代表截取到末尾
  - slice()：根据指定的起止下标来截取字符串。包含两个参数，一个是起始下标，一个是结算下标（不包含），第二个参数省略则代表截取到末尾，第二个参数可以为负值，下标从左到右
  - substring()：根据指定的起止下标来截取字符串。包含两个参数，一个是起始下标，一个是结算下标（不包含），第二个参数省略则代表截取到末尾，第二个参数为负值时，从下标0开始截取，把第一个参数当作结束下标
- 字符串大小转换
  - toLowerCase()：将字符串中的英文字符转成小写
  - toUpperCase()：将字符串中的英文字符转成大写
- 字符串与数组转换
  - split()：根据指定的字符把字符串切分成数组。如果参数是空字符串，则按照单个字符切分，返回和字符串等长的数组；如果没有参数，则把字符串当作返回数组的一个值；支持第二个参数，代表数组的最大长度

### 数组扩展

#### 扩展运算符

扩展运算符是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列，目前也可以用来展开数组。

应用：

- 复制数组
- 合并数组
- 解构赋值
- 字符串转换为数组

```js
// 1.复制数组：（ES5中直接复制，会产生引用关系）（ES5可以使用concat方法复制数组）
let arr2 = [1， 2， 3];
let arr3 = [...arr2];
arr3.push(4);
console.log(arr2， arr3);

//2.合并数组
let arr4 = [...arr2， ...arr3];
console.log(arr4);

//3.解构复制
//生成一个数组 (此时扩展运算符必须在最后一个)
let [a， b， ...newarr] = [1， 2， 3， 4， 5， 5， 6， 8， 9];
console.log(newarr);

//4.字符串转数组
let arr5 = [..."hello"];
console.log(arr5);
```

#### 数组的方法

1. Array对象的方法

   - Array.from()：把伪数组转换成数组（可以使用数组的方法）。伪数组是key值从0开始依次递增，并且有length属性的对象。
   - Array.of()：将一组数字转换成数组（弥补Array的不足）。与new Array()功能相似，不同的是Array.of()传一个数字时，该数字是作为数组的元素，而new Array()则是把数字作为数组的length属性的值。

2. Array原型上的方法

   - copyWithin()：在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组，它接受三个参数。

     - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
     - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
     - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算

     ```js
     {
         let arr = [1， 2， 3， 4， 5， 6， 7， 8];
         arr.copyWithin(0， 4， 6);
         console.log(arr);//[5， 6， 3， 4， 5， 6， 7， 8]
     }
     {
         let arr = [1， 2， 3， 4， 5， 6， 7， 8];
         arr.copyWithin(0， 3);
         console.log(arr);// [4， 5， 6， 7， 8， 6， 7， 8]
     }
     ```

   - fill()：使用固定值填充数组，用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

     ```js
     let arr2 = [1， 2， 3， 4， 5， 6， 7， 8];
     arr2.fill("a");
     console.log(arr2);
     
     ['a'， 'b'， 'c'].fill(7， 1， 2)
     // ['a'， 7， 'c']
     ```

   - entries()， keys()和values()

     ES6提供三个新方法，用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历、entries()是对键值对的遍历

     ```js
     //3.entries，keys，values  配合for of解构遍历数组的
     //keys 是所有元素的下标
     let arr3 = ["a"， "b"， "c"， "d"， "e"];
     console.log(arr3.keys());//Array Iterator
     for (index of arr3.keys()) {
         console.log(index);
     }
     //values 所有元素的值
     for (item of arr3.values()) {
         console.log(item);
     }
     //entries 所有元素的下标与值组成的数组 [0， "a"]
     for (item of arr3.entries()) {
         console.log(item);
     }
     ```

   - find()：用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员，如果没有符合条件的成员，则返回undefined

   - findIndex()：与find()功能相似，不同的是findIndex()找出第一个返回值为true的成员，返回的是该成员的下标

     ```js
     let arr4 = ["a"， "b"， "c"， "d"， "e"];
     let result = arr4.find(function (item， index， arr) {
         console.log(item， index， arr)
         return typeof item == "string"
     })
     console.log(result);
     
     
     let arr4 = [{name："xiaowang1"}，{name："xiaowang2"}，{name："xiaowang3"}];
     let result = arr4.findIndex(function (item， index， arr) {
         return typeof item.name == "xiaowang2"
     })
     console.log(result);
     ```

   - includes()：返回一个布尔值，表示某个数组是否包含指定的值

     ```js
     let arr6 = [1， 2， 3， ["a"]];
     console.log(arr6.includes(1));//true
     console.log(arr6.includes(["a"]));//false
     ```

   - flat()：可以把一个多维数组，转换成一维数组。默认只会拉平一层，如果想要拉平多层的嵌套数组，可以传递一个整数，表示想要拉平的层数，默认为1，如果不管有多少层嵌套，都要转成一维数组，可以传递Infinity作为参数

     ```js
     {
         //二维数组
         let arr = [1， 2， [3， 4]];
         console.log(arr.flat())
     }
     {
         //多维数组 想拉平 可以传入参数
         let arr = [1， 2， [3， [5， 6， 7]]];
         console.log(arr.flat(2))
     }
     {
         //如果不知道自己的数组有多少层  那么可以传递infinity 代表无穷大
         let arr = [1， 2， [3， [5， 6， 7]]];
         console.log(arr.flat(Infinity))
     }
     ```

   - pop()：删除数组最后一个元素，返回被删除的元素

   - push()：往数组后面添加一个或多个元素，返回数组的长度

   - shift()：删除数组最前一个元素，返回被删除的元素

   - unshift()：往数组前面添加一个或多个元素，返回数组的长度

   - reverse()：反转数组，返回反转后的数组

   - sort()：数组排序，默认按照字符编码排序，可以接收一个回调函数，返回排序后的数组

   - splice(start， delCount， newItems)：可以删除、添加元素，如果没有删除元素，则返回空数组，如果有删除的元素，则返回被删除的元素组成的数组，会修改原数组

   - slice(start，end)：截取数组，返回一个新数组

   - concat()：合并数组，返回一个合并后的新数组

   - join()：将数组的元素按照指定字符拼接成字符串，并返回该字符串

   - forEach()：遍历数组，没有返回值，接收一个回调函数

   - some()：遍历数组，当回调函数中有一次返回true，则返回true，否则返回false

   - every()：遍历数组，当回调函数中每次都返回true，则返回true，否则返回false

   - filter()：遍历数组，将回调函数中返回true的元素添加到新数组中，最终返回该新数组

   - map()：遍历数组，将回调函数中每次的返回值添加到新数组中，最终返回该新数组

   - reduce()：遍历数组，万能的数组方法，可以用reduce实现其他数组的方法

### 函数扩展

#### 函数参数默认值

ES6默认参数，ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```js
function fn2(a， b = "world") {
    console.log(a， b);
}
fn2("hello"， "");
fn2("hello");
```

#### rest参数

- ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
- 和普通参数混合使用的时候，需要放在参数的最后
- 函数的`length`属性，不包括 rest 参数

```js
function fn3(...arg) {
    console.log(arg);
}
fn3(1， 2， 3， 4， 5)

//和普通参数混合使用的时候，需要放在参数的最后
function fn4(a， b， ...arg) {
    console.log(a， b， arg);
}
fn4(1， 2， 3， 4， 5)
```

#### 箭头函数

ES6 允许使用“箭头”（`=>`）定义函数

箭头函数分为以下几种情况

- 只有一个参数 并函数体是一句话的时候
- 没有参数或者多个参数的时候，参数的括号不能省略
- 当函数体不是一句话的时候

```js
//1. 只有一个参数 并函数体是一句话的时候（如果是返回值则可以省略return）
// let f1 = function (n) {
//     return n + 1;
// }

let f1 = n => n + 1;
console.log(f1(2))

let arr = [1， 2， 3， "a"， 5， 6， 7];
let result = arr.find(item => typeof item === "string");
console.log(result);


//2.没有参数或者多个参数的时候，参数的括号不能省略
let f2 = (a， b) => a + b;
console.log(f2(1， 2));

let f3 = () => console.log("hello");
f3();

//3.当函数体不是一句话的时候
let f4 = (a， b) => {
    console.log(a);
    console.log(b);
    console.log(a + b);
    return "ok~"
}
console.log(f4(1， 2))
```

### Math扩展

- Math.abs()：求绝对值 对一个数字进行绝对值操作，并且也能对纯数字的字符串操作
- Math.ceil()：向上取整 向大的数值取整
- Math.floor()：向下取整 向小的数值取整
- Math.round()：四舍五入，四舍五入是对小数点的后一位进行判断
  - 正数的时候，当小数点后一位大于等于5的时候 整数部分加1 小于5的时候 整数部分不变
  - 负数的时候 当小数点后一位 大于5的时候 整数减1 小于5的时候 整数不变
  - 负数的时候 当小数点后一位是5 后边没有第二个小数位了 整数不变；如果5后还有小数位 那么 整数减1
- Math.min()：计算一组数值中的最小值
- Math.max()： 计算一组数值中的最大值
- Math.pow()：返回以第一个参数为底数，第二个参数为幂的指数值
- Math.sqrt()： 返回参数的平方根，如果参数是负数，返回NaN
- Math.random()：求随机数 生成 [0，1) （大于等于0 小于1） 小数随机数

- Math.trunc()：将数字的小数部分去掉，只保留整数部分
- Math.sign()： 判断一个数字的正数还是负数 还是0 或者是NaN
- Math.sqrt()：平方根
- Math.cbrt()：立方根
- Math.hypot()： 求所有参数平方和的平方根

### Date扩展

- getFullYear()/setFullYear()：获取/设置四位数的年份
- getMonth()/setMonth()：获取/设置月份，月份从0开始计算，0代表1月份，11代表12月份
- getDate()/setDate()：获取/设置日
- getHours()/setHours()：获取/设置小时
- getMinutes()/setMinutes()：获取/设置分钟
- getSeconds()/setSeconds()：获取/设置秒数
- getMilliseconds()/setMilliseconds()：获取/设置毫秒数
- getTime()/setTime()：获取/设置当前距离1970年1月1日00：00：00的毫秒数

### 正则表达式

#### 什么是正则表达式

- 正则表达式本身就是一种语言，这在其他语言中是通用的
- 正则表达式是对字符串操作的一种逻辑公式，就是用事先定义好的一些特定字符串、及这些特定字符串的组合，组成的一个“规则字符串”，这个规则字符串用来表达对字符串的一种过滤逻辑
- 正则就是规则，让计算机读懂我们的规则

#### 创建正则表达式

创建正则表达式和创建字符串类似 ，创建正则表达式提供了两种方法

- 一种是采用 new 运算符，

  `var reg = new RegExp('box'， 'ig');` //第二个参数可选模式修饰符

- 另一个是采用字面量方式

  `var reg = /box/ig;` //在第二个斜杠后面加上模式修饰符。 g：代表可以进行全局匹配，正则默认匹配到就不匹配了。 i：代表不区分大小写匹配。

#### 正则对象的方法

- test() 方法在字符串中查找是否存在指定的正则表达式并返回布尔值 ，如果存在则返回 true，不存在则返回 false。

#### 字符串对象的方法

- search(pattern)返回字符串中 pattern 开始(第一次出现)位置

  ```js
  var reg = /g/g;
  var str = "bjkgdlahxjqgasj;lj112!@#$#%#!#";
  console.log(str.search(reg));
  
  // search和indexOf  都是返回匹配元素的出现的位置
  //     1、search方法可以传递正则  indexOf只能传递要匹配的字符串
  //     2、indexOf是更为底层的方法，如果说执行相同的查找，indexOf的效率更高，如果不使用正则匹配 ，那么建议使用indexOf
  ```

- match(pattern)返回 pattern 中的子串或 null

  ```js
  var reg = /\d/g;
  // var reg = /zzz/g;
  var str = "3h45h3gg4gf3";
  // match 返回匹配项目的集合（正则开启全局）  是一个数组
  // 如果匹配不到则返回null
  console.log(str.match(reg));
  ```

- replace(pattern， replacement)用 replacement 替换 pattern

  ```js
  /*var str = "  wad sdf e3 3 d s";
    var newStr = str.replace(" "，"");//匹配到所有的空格 然后用空字符串替换
    console.log(str);
    console.log(newStr);
  */
  
  var str = "  wad sdf e3 3 d s";
  // \s代表空格
  var reg = /\s/g;
  var newStr = str.replace(reg，"");//匹配到所有的空格 然后用空字符串替换
  console.log(str);
  console.log(newStr);
  
  //和谐敏感词
  var oText = document.getElementById("text");
  oText.onchange = function () {
      var reg = /滚蛋|傻逼|傻屌一个|狗日的/g;
      var userCon = oText.value;
      // var newStr = userCon.replace(reg，"**");
  
      var newStr = userCon.replace(reg，function (i) {
          var len = i.length;
          var str = "";
          for (var j = 0; j < len; j++) {
              str += "*";
          }
          return str;
      });
      oText.value = newStr;
  }
  ```

- split(pattern)返回字符串按指定 pattern 拆分的数组

  ```js
  var  str = "asd3fgh4jkl5hg6hu7a";
  // var str = "1qazxcvbnm，./']="
  
  var arr = str.split("g");
  console.log(arr);
  
  var reg = /\d/g;
  var arr = str.split(reg);
  console.log(arr);
  ```

  

### 对象扩展

#### 对象的简写

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
// 1.属性的简写
let [name， age， sex] = ["xiaowang"， 20， "女"];
let p1 = {
    name： name，
    age： age，
    sex： sex
}
console.log(p1);
//在es6中，对象的key和value如果相同，则可以简写
let p2 = {
    name，
    age，
    sex
}
console.log(p2);

//2.方法的简写
let p3 = {
    name，
    age，
    sex，
    do： function () {
        console.log("eat")
    }
}
p3.do();

let p4 = {
    name，
    age，
    sex，
    do() {
        console.log("eat")
    }
}
p4.do();
```

#### 对象的方法

- Object.is()：判断对象是否相等，相当于===，修复了NaN不等于自身的问题

- Object.assign()：合并对象，会把其他参数对象合并到第一个参数对象上面

  ```js
  let obj1 = { a： 1 };
  let obj2 = { b： 2 };
  let obj3 = { c： 3 };
  let newObj = Object.assign(obj1， obj2， obj3);
  console.log(newObj) //{a： 1， b： 2， c： 3}
  ```

### 新增的数据结构

#### Set

- ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
- `Set`本身是一个构造函数，用来生成 Set 数据结构。
- `Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化

属性和方法

- size 返回Set的长度
- add 添加某个值，返回 Set 结构本身。
- delete 删除某个值，返回一个布尔值，表示删除是否成功。
- has 返回一个布尔值，表示该值是否为`Set`的成员
- clear 清除所有成员，没有返回值。
- `keys()`：返回键名的遍历器，由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

```js
// 2.属性 size
console.log(st.size);

//3.添加 add
st.add(4);
st.add(10);
st.add("hoo");
console.log(st);

//4.删除
st.delete(2);
console.log(st);

//5.判断是否存在某个元素
console.log(st.has(10));
console.log(st.has(11));

//6.清空所有的
// st.clear();
// console.log(st);

//7.和循环遍历相关的方法  keys方法和valus方法行为是一致的
let st2 = new Set(["a"， "b"， "c"， "d"]);
console.log(st2.keys())//"a"，"b"，"c"，"d"
console.log(st2.values())//"a"，"b"，"c"，"d"

for (let a of st2) {
    console.log(a); //"a"， "b"， "c"， "d"
}

//8.entries() 获得键值对
console.log(st2.entries());
for (let b of st2.entries()) {
    console.log(b)
}

//9.forEach
st2.forEach((item， index， s) => {
    console.log(item， index， s)
})

//其他使用场景
// 去除数组的重复成员
[...new Set(array)]

//上面的方法也可以用于，去除字符串里面的重复字符
[...new Set('ababbc')].join('')
// "abc"
```

#### Map

- JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
- 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```js
 //为什么会有Map，因为对象属性名称必须是字符串，如果是其他类型则不行
let p1 = { name： "lily" };
let obj1 = {
    id： 1，
    [p1]： "good"
}
console.log(obj1)

// Map也是新增的数据解构  类似于对象
let mp1 = new Map([
    ["a"， 1]，
    ["b"， 2]，
])
console.log(mp1)

let p2 = { name： "lily" };
let mp2 = new Map([
    ["a"， 1]，
    [p2， 2]，
])
console.log(mp2)
```

属性和方法

- `size`属性返回 Map 结构的成员总数。
- `set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。`set`方法返回的是当前的`Map`对象，因此可以采用链式写法。
- `get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。
- `has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- `delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。
- `clear`方法清除所有成员，没有返回值。
- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 Map 的所有成员。

### iterator

- JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
- 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
- Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

```js
let arr = [1， 2， 3];
function Iterator() {
    //用一个计数器，保存现在处理到哪里了
    let index = 0;
    return {
        next： () => {
            if (index < arr.length) {
                return {
                    value： arr[index++]，
                    done： false
                }
            } else {
                return {
                    done： true
                }
            }
        }
    }
}

//只要调用这个Iterator接口，就可以依次处理成员了
let it = Iterator(arr);
console.log(it);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
```

- 应用场景：
  - 解构赋值的时候默认调用iterator接口
  - 扩展运算符使用的时候页默认调用iterator接口
  - for of 使用的是iterator接口
  - 对象是没有部署Iterator接口

### Generator

- Generator 函数是 ES6 提供的一种异步编程解决方案，内部封装了很多的状态，被称作状态机 生成器
- 执行Generator会返回一个迭代器对象（iterator），使用iterator来遍历出Generator内部的状态
- 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）

```js
//定义的时候和普通函数定义不一样，使用yeild关键字在内部定义各种状态
function* gen() {
    yield "状态1";
    yield "状态1";
    yield "状态1";
    yield "状态1";
}

// 调用了generator后返回的是迭代器对象
// 在generator函数中，遇到yield就会停止
let it = gen();
console.log(it);
console.log(it.next());
```

- generator代码内部不会马上执行，需要调用next方法的时候才会执行
- yield语句返回结果通常为undefined， 当调用next方法时传参内容会作为启动时yield语句的返回值。
- 调用了generator后返回的是迭代器对象，在generator函数中，遇到yield就会停止，直到运行next
- 可以使用for of执行gen
- 对象没有Iterator接口，可以手动部署一个

### async和await

async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成

#### async

- async函数(源自ES2017 - ES8)，真正意义上去解决异步回调的问题，同步流程表达异步操作，是 Generator的语法糖

- 语法：

  ```js
  async function foo(){
  
   await 异步操作;
  
   await 异步操作；
  
  }
  ```

- async 函数会返回一个 Promise 对象，如果在函数中 `return` 一个直接量，async 会把这个直接量通过`Promise.resolve()` 封装成 Promise 对象。

#### await

- async取代Generator函数的星号*，await取代Generator的yield

- 不需要像Generator去调用next方法，遇到await等待，当前的异步操作完成就往下执行

- `await` 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西

  - 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西
  - 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。
  - 如果promise执行结果为reject，则await无返回值，退出当前的async函数

- await会等promise对象状态发生变化，如果是pending状态，就一直等，如果是resolved状态，就会自动执行下面代码，如果是rejected状态，就会退出当前async函数

- 执行async函数，返回值是一个promise对象：

  promise对象状态：

  如果async函数内部出错了（1. 正常报错 2. 内部promise对象是失败状态），promise对象就会变成失败状态

  如果async函数所有代码全部执行完了，才会变成成功状态

### class

- JavaScript 语言中，生成实例对象的传统方法是通过构造函数
- 上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。
- ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。
- 基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
- `constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。
- 构造函数的静态的方法或属性 直接用构造函数调用 使用static定义 ，如果不加static 则声明的属性和方法是构造器的

```js
class Person {
    constructor(name， age) {
        this.name = name;
        this.age = age;
    }
    score = 100;//最终还是实例构造了
    do() {
        console.log("study");
    }
}
Person.prototype.course = "html5";
//当Person被new的时候，constructor就会被执行
let p1 = new Person("lily"， 18);
console.log(p1.__proto__)
console.log(p1.name)
console.log(p1.course)
p1.do(); 
```

- class 可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多
- ES6中继承的子类中，如果使用构造函数constructor()那么就必须使用super()方法初始化，这样下面才可以调用this关键字。super()只能用在子类的构造函数之中，用在其他地方就会报错，这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。
- 如果不调用super方法，子类就得不到this对象。

```js
 //class 是一个定义类的关键字(是书写面向对象的语法糖，一种新语法 )
class Person {
    constructor(name， age) {
        this.name = name;
        this.age = age;
    }
    do() {
        console.log("study");
    }
}
class Child extends Person {
    constructor(name， age， gender) {
        super(name， age);
        this.gender = gender;
    }
}
```

### Promise

#### 功能

- 回调函数嵌套回调函数被称作**回调地狱**，代码层层嵌套，环环相扣，很明显，逻辑稍微复杂一些，这样的程序就会变得难以维护。代码臃肿，可读性差，耦合度过高。
- 对于这种情况，程序员们想了很多解决方案（比如将代码模块化），但流程控制上，还是大量嵌套。
- ES2015的标准里，Promise的标准化，一定程度上解决了JavaScript的流程操作问题。Promise对象是一个异步编程的解决方案，**可以将异步操作以同步的流程表达出来， 避免了层层嵌套的回调函数(俗称'回调地狱')**

```js
setTimeout(() => {
    console.log("a数据请求回来了~");
    setTimeout(() => {
        console.log("b数据请求回来了~");
        setTimeout(() => {
            console.log("c数据请求回来了~");
        }， 3000);
    }， 2000);
}， 1000);
```

#### 入门

- `Promise`是一个构造函数，自己身上有`all`、`reject`、`resolve`这几个方法，原型上有`then`、`catch`等方法

- `Promise`的构造函数接收一个参数，是函数，并且传入两个参数：`resolve`，`reject`，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

- `Promise`对象有三种状态：代表异步执行的状态，对象的状态只能改变一次

  - pending 初始化状态（异步代码还在执行中）
  - resolved / fulfilled 成功状态（异步代码执行成功了），调用resolve函数，可以将promise对象的状态由pending变成resolved
  - rejected 失败状态（异步代码执行失败了），调用reject函数，可以将promise对象的状态由pending变成rejected

- Promise的同步异步状态

  `new Promise()`函数是同步执行的

#### 方法

- then()：捕获promise成功的状态，执行成功的回调
- catch()：捕获promise失败的状态，执行失败的回调
- then / catch 方法返回值是一个新的promise对象
  - 新promise对象默认是成功状态
  - 如果 then / catch 接受的函数返回值是一个promise对象，那么 then / catch 方法返回值的promise就是这个promise对象
  - 如果没有返回 promise对象，就会新建一个默认成功状态promise
  - 内部如果报错了，返回一个失败状态的promise

- Promise.all([promise1， ...]) 传入n个promise对象，只有n个promise对象的状态都成功，才成功，只要有一个失败，就失败
- Promise.resolve() 返回一个成功状态promise对象
- Promise.reject() 返回一个失败状态promise对象
- Promise.allSettled([promise1， ...])传入n个promise对象，等n个promise对象状态全部发生变化，得到所有结果值
- Promise.race([promise1，...])传入n个promise对象，第一个promise对象状态发生变化（无论是成功状态的还是失败状态的），返回该promise对象
- Promise.any([promise1，...])传入n个promise对象，第一个promise对象状态发生变化（成功状态的），返回该promise对象

### 动态import

- `import`函数的参数，指定所要加载的模块的位置。
- `import`命令能够接受什么参数，`import()`函数就能接受什么参数，两者区别主要是后者为动态加载
- `import()`返回一个 Promise 对象。
- 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块



## DOM

### DOM

document object model 文档对象模型，DOM提供了一系列标准的接口，允许开发人员通过标准方式访问文档结构、操作网页内容、控制样式和行为等。



### document对象

document对象是window对象的一个属性，因此可以将document对象作为一个全局对象来访问。当浏览器载入html文档时，它就会成为document对象。



### 节点（node）

文档中的元素、属性、文本和注释等都称为节点，节点是DOM最基本的单元，它们共同构成了文档的树形结构模型。

- 节点类型
  - 文档节点：document
    - nodeType：9
    - nodeName：#document
    - nodeValue：null
  - 元素节点：element
    - nodeType：1
    - nodeName：大写的标签名
    - nodeValue：null
  - 属性节点：attribute
    - nodeType：2
    - nodeName：属性的key
    - nodeValue：属性的value
  - 文本节点：text
    - nodeType：3
    - nodeName：#text
    - nodeValue：文本内容
  - 注释节点：comment
    - nodeType：8
    - nodeName：#comment
    - nodeValue：注释的内容
  - 文档碎片节点：documentFragment

#### 访问节点

- 旧方法
  - 通过id获取：document.getElementById()
  - 通过标签名获取：document.getElementsByTagName()
  - 通过类名获取：document.getElementsByClassName()
  - 通过name属性获取：document.getElementsByName()
- 新方法
  - 通过css选择器获取一个：document.querySelector()
  - 通过css选择器获取多个：document.querySelectorAll()
- 旧方法和新方法的区别
  - 旧方法获取的是一个动态的集合，获取的集合会随着文档的改变而改变
  - 新方法获取的是一个静态的集合，获取的集合不会随着文档的改变而改变

#### 节点关系中访问节点

- parentNode 获取元素的父元素节点 (全兼容)
- children：获取元素的所有子元素节点(IE678 可以获取到注释节点 所有在IE678这样获取的时候注意不要写注释)
- 获取元素的上一个兄弟节点
  - previousSibling 获取元素的上一个兄弟节点（在ie678中获取的是上一个兄弟元素节点 在非ie678中获取的是上一个节点（可能是文本节点））
  - previousElementSibling 在ie678中不支持 在非ie678中获取的是上一个元素节点（兼容性有顺序要求 previousSibling不能写前，因为previousSibling所有浏览器识别 但是意义不一样）
- 获取下一个兄弟节点
  - nextSibling 获取下一个兄弟节点
  - nextElementSibling 获取下一个兄弟节点
- 获取第一个子元素节点
  - firstChild：获取元素的第一个子元素节点
  - firstElementChild：获取元素的第一个子元素节点
- 获取最后一个子元素节点
  - lastChild：获取元素的最后一个子元素节点
  - lastElementChild：获取元素的最后一个子元素节点

- 获取body元素

  `document.body`==`document.getElementsByTagName('body')[0]`

- 获取head元素

  `document.head`==`document.getElementsByTagName('head')[0]`

- 获取html元素

  `document.documentElement`==`document.getElementsByTagName('html')[0]`



### 事件

#### DOM0级绑定事件

`ele.on+事件名称 = function(e){}`

#### 事件类型

- 失去和获取焦点事件
  - focus：获取焦点
  - blur：失去焦点
- - click：左单击
  - contextmenu：右单击
  - dbclick：左双击
- 键盘事件
  - keydown：键盘按键按下
  - keyup：键盘按键抬起
- 表单事件
  - input：表单内容改变时触发
  - change：表单内容改变并且失去焦点时触发
- 鼠标事件
  - mousedown：鼠标按下
  - mouseup：鼠标抬起
  - mousemove：鼠标移动
  - mouseover：鼠标移入（会触发冒泡）
  - mouseout：鼠标移出（会触发冒泡）
  - mouseenter：鼠标移入（不会触发冒泡）
  - mouseleave：鼠标移出（不会触发冒泡）
- 滚轮事件
  - scroll：滚动条滚动时触发
  - mousewheel（谷歌/IE）/DOMMouseScroll（火狐）：可以检测是向上滚还是向下滚
    - mousewheel：e.wheelDelta > 0 向上滚		e.wheelDelta < 0 向下滚
    - DOMMouseScroll：e.detail < 0 向上滚		e.detail > 0 向下滚
- window事件
  - load：当整个文档内容（DOM节点+所需要的资源（音视频、图片等等））全部加载完毕，才会执行
  - scroll：当系统滚动条滚动的时候触发
  - resize：当浏览器视口大小发生变化时触发



### 脚本化CSS

#### 设计大小

- offsetWidth和offsetHeight
  - 使用offsetWidth和offsetHeight属性可以获取元素的尺寸（content+padding+border）
  - offsetWidth表示元素在页面中所占用的总宽度，offsetHeight表示元素在页面中所占用的总高度
  - offsetWidth和offsetHeight是获取元素宽高最好的方法
  - 当元素隐藏时，即设置样式属性display的值为none时，offsetWidth和offsetHeight返回的值是0
- clientWidth和clientHeight
  - 获取元素可视部分的宽度，即css的content和padding属性的和，不包含任何能滚动的区域和边框
- scrollWidth和scrollHeight
  - 元素包含内容的完全宽度和padding
- 获取窗口的大小
  - document.documentElement.clientWidth：获取窗口的宽度
  - document.documentElement.clientHeight：获取窗口的高度

#### 设计位置

- offsetLeft和offsetTop
  - offsetLeft和offsetTop属性返回当前元素的偏移位置
  - DOM标准模式以最近的定位元素（包含块）为参考进行偏移的位置
- offsetParent
  - offsetParent属性表示最近的上级定位元素（包含块）
- scrollLeft和scrollTop
  - 使用scrollLeft和scrollTop可以读写 移出可视区域外面的宽度和高度
  - scrollLeft：读写元素左侧已经滚过的距离
  - scrollTop：读写元素顶部已滚动的距离
- clientLeft和clientTop
  - 获取元素左/上边框的大小

#### 系统滚动条位置

- 获取系统滚动条的位置
  - pageYOffset/pageXOffset
  - document.documentElement.scrollTop/document.documentElement.scrollLeft
  - document.body.scrollTop/document.body.scrollLeft
- 设置系统滚动条的位置
  - window.scrollTo(x， y)
  - document.documentElement.scrollTop/document.documentElement.scrollLeft
  - document.body.scrollTop/document.body.scrollLeft

#### 获取整个文档的宽高

```js
function getDocSize() {
    return {
        height：document.documentElement.offsetHeight || document.body.offsetHeight，
        width：document.documentElement.offsetWidth || document.body.offsetWidth
    }
}
```

#### getBoundingClientRect

- obj.getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top， right， bottom， left等属性；
- rectObject.top：元素上边到视窗上边的距离;
- rectObject.right：元素右边到视窗左边的距离;
- rectObject.bottom：元素下边到视窗上边的距离;
- rectObject.left：元素左边到视窗左边的距离;
- ie9以上支持width/height属性。



### 节点操作

#### 创建节点

- createElement()：根据参数指定的标签名创建一个新的元素对象
- new Image()：创建img元素对象

#### 插入节点

- A.appendChild(B)：在A元素末尾插入B元素
- A.insertBefore(new， old)：在A元素下的old元素之前插入new元素

#### 复制节点

- A.clone(B)

#### 删除节点

- A.removeChild(B)：删除A元素下的B元素
- A.remove()：删除A元素，该节点所包含的所有子节点将同时被删除

#### 替换节点

- A.replace(new， old)：在A元素下把old元素替换成new元素



### 元素内容操作

#### 读取和插入HTML字符串

- innerHTML
  - 获取：获取元素中的所有内容，包括文本节点内容、元素节点内容、注释节点内容
  - 设置：如果字符串中有html标签，会被解析
- innerText
  - 获取：获取元素中的文本内容
  - 设置：如果字符串中有html标签，不会被解析
- outerHTML
  - 获取：在innerHTML的基础上，还获取到了自身元素
  - 设置：直接替换自身元素，如果字符串中有html标签，会被解析
- outerText
  - 获取：获取元素中的文本内容
  - 设置：直接替换自身元素，不会解析字符串中的html标签
- textContent
  - 获取：获取元素中的文本内容
  - 设置：不会解析字符串中的html标签



### 属性节点

#### 设置属性

- 自有属性：元素对象.属性名 = 属性值
- 自定义属性：元素对象.setAttribute(属性名， 属性值)
- h5自定义属性：元素对象.dataset.属性名 = 属性值

#### 获取属性

- 自有属性：元素对象.属性名
- 自定义属性：元素对象.getAttribute(属性名)
- h5自定义属性：元素对象.dataset.属性名

#### 删除属性

- 自有属性：元素对象.属性名 = ''
- 自定义属性：元素对象.removeAttribute(属性名)
- h5自定义属性：delete 元素对象.dataset.属性名



### 文档碎片节点

- DocumentFragment是一个虚拟的节点类型，仅仅存在内存中，没有添加到文档树中，所以看不到渲染效果
- 使用文档碎片的好处，就是避免浏览器渲染和占用资源
- 当文档片段设计完善后，再使用js一次性添加到文档树中显示出来，提高效率，减少页面重绘的次数。解决大量添加节点时候的性能问题
- 使用document.createDocumentFragment()方法创建，使用appendChild等方法插入



### 事件模型

#### 事件流

事件流就是多个节点对象对同一种事件进行响应的先后顺序，主要包括以下3种类型

- 冒泡型：事件从最精确的目标向最不精确的目标( document对象)触发，也就是事件从下向上进行响应，这个传递过程被形象地称为“冒泡”
- 捕获型：事件从最不精确的目标（document对象）开始触发，然后到最精确的目标，也就是事件从上向下进行响应
- 混合型：w3C的DOM事件模型支持捕获型和冒泡型两种事件流，其中捕获型事件流先发生，然后才发生冒泡型事件流。两种事件流会触及DOM中的所有层级对象，从 document对象开始，最后返回 document对象结束。因此，可以把事件传播的整个过程分为3个阶段
  - **捕获阶段**：事件从 document对象沿着文档树向下传播到目标节点，如果目标节点的任何一个上级节点注册了相同的事件，那么事件在传播的过程中就会首先在最接近顶部的上级节点执行，依次向下传播
  - **目标阶段**：注册在目标节点上的事件被执行
  - **冒泡阶段**：事件从目标节点向上触发，如果上级节点注册了相同的事件，将会逐级响应，依次向上传播

#### 绑定事件

- 静态绑定：把JS脚本作为属性值，直接赋值给事件属性
- 动态绑定：使用DOM对象的事件属性进行赋值
- 事件处理函数：事件处理函数是一类特殊的函数，与函数直接量结构相同，主要任务是实现事件处理，为异步调用，由事件触发进行响应。

#### DOM0级绑定事件

使用on+事件名这种方式注册的事件叫做DOM0级事件，所有浏览器都支持这种事件绑定

#### DOM2级绑定事件

- 在DOM事件模型中，通过调用对象的addEventListnenr()方法注册事件
  - type：注册事件的类型名，事件类型与事件属性不同，事件类型名没有on前缀，例如，对于事件属性 onclick来说，所对应的事件类型为 click
  - listener：监听函数，即事件处理函数，在指定类型的事件发生时将调用该函数，在调用这个函数时，默认传递给它的唯一参数是 event对象
  - useCapture：是一个布尔值，如果为true，则指定的事件处理函数将在事件传播的捕获阶段触发，如果为 false，则事件处理函数将在冒泡阶段触发
- 使用 addEventListener()方法能够为多个对象注册相同的事件处理函数，也可以为同一个对象注册多个处理函数。为同一个对象注册多个事件处理函数对于模块化开发非常有用。
- IE事件模型使用attachEvent(etype，eventName)
  - type：事件类型：onclick、onkeyup等
  - eventName：设置事件处理函数
  - 使用attachEvent注册事件时，其事件处理函数的调用对象不再是当前事件对象的本身，而是window对象，如果想要获取当前对象，则使用event事件对象

#### 销毁事件

- 在DOM事件模型中，使用removeEventListener()方法可以从指定对象中删除已经注册的事件处理函数
- removeEventListener()只能处理addEventListener方法注册的事件
- 当临时注册一个事件时，可以在处理完毕后删掉它，这样能够节省系统资源
- IE事件模型使用detachEvent方法注销事件

> DOM0级和DOM2级事件的区别
>
> DOM0级
>
> - 事件通过函数表达式绑定
> - 只能执行冒泡
> - 同一个元素对象对同一个事件只能绑定一次，绑定多次会产生覆盖
>
> DOM2级
>
> - 事件通过事件函数addEventListener()绑定
> - 可以控制冒泡和捕获
> - 同一个元素对象对同一个事件可以绑定多次
> - 可以绑定DOM2级事件，如DOMContentLoaded，

#### event对象

- event对象由事件自动创建，记录了当前事件的状态，如事件发生的源节点、键盘按键的响应状态、鼠标指针的移动位置、鼠标按键的响应状态等信息，
- event对象的属性提供了有关事件的细节，其方法可以控制事件的传播
- 2级DOM Events规范定义了一个标准的事件模型，它被除了IE低版本以外的所有现代浏览器所实现，而IE定义了专用的、不兼容的模型。简单比较两种事件模型如下：在DOM事件模型中， event对象被传递给事件处理函数，但是在IE事件模型中，它被存储在window对象的event属性中

#### event事件的鼠标定位

- clientX：以浏览器窗口左上顶角为原点，定位x轴坐标
- offsetX：以当前事件的目标对象左上顶角为原点，定位x轴坐标
- pageX：以 document对象(即文档窗口)左上顶角为原点，定位x轴坐标(不兼容IE)
- screenX：计算机屏幕左上顶角为原点，定位x轴坐标

#### 阻止传播

e.stopPropagation()、e.cancelBubble = true

#### 阻止默认事件

e.preventDefault()、e.retrunValue = false、return false

#### 事件委托

- 事件委托（delegate） 也称为事件托管或者事件代理，就是把目标节点的事件绑定到祖先的节点上
- 通过冒泡的原理，逐层冒泡被祖先元素捕捉到
- 优点：优化代码提升性能，把html和js分离，防止动态添加或删除节点中注册事件的丢失现象



## BOM

### BOM

浏览器对象模型（Browser Object Model），主要用在客户端浏览器的管理。一直没有被标准化，不过各个主流浏览器都支持BOM，浏览器提供商会按照各自的想法随意去扩展它。

### window对象

- 代表浏览器窗口，是BOM对象的核心
- 代替EMCAScript顶层全局对象Global，所有全局的变量和函数都是window的属性和方法。

### 客户端对象

- document：包含整个HTML文档，可以用来访问文档内容以及页面中所有元素
- navigator：包含客户端浏览器的信息
  - platform：浏览器所在的系统平台
  - onLine：判断用户是否联网
  - userAgent：获取用户代理信息
- location：包含当前网页文档的URL信息
  - href：整个URL地址信息
  - reload：强制刷新页面文档
  - replace：替换当前页面，不保存历史记录
- history：包含浏览器窗口访问过的URL信息
  - go：可以前进或后退n个页面
  - back：可以后退一个页面
  - forward：可以前进一个页面
- screen：包含客户端屏幕的信息

### 定时器

- 超时定时器
  - 定义：setTimeout(() => {}[, time, 函数参数])
  - 返回值：定时器的句柄（标识）
  - 清除：clearTimeout(定时器的句柄)
- 间歇定时器
  - 定义：setInterval(() => {}[, time, 函数参数])
  - 返回值：定时器的句柄（标识）
  - 清除：clearInterval(定时器的句柄)