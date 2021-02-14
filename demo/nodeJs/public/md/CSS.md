## CSS

### 基础

#### CSS使用方式

- 内联方式：在html标签中使用style属性来设置CSS样式
- 内嵌方式：在head标签中使用style标签
- 外部导入方式：使用<link />标签导入
  - href：链接文档地址
  - rel：链接文档与本文档关系
  - type：链接数据类型

#### CSS特性

- 层叠性：重复声明，相互覆盖
- 继承性：被包含的元素拥有外层元素的样式

__注__：样式冲突，覆盖，不冲突，叠加



### 选择器

#### CSS选择器

- CSS2
  - 通用选择器：*
  - 标签选择器：HTML标签名
  - 类选择器：.className，多类名限制 .a.b{}
  - ID选择器：#id值，唯一性
  - 后代选择器：E F，层级无限
  - 链接伪类选择器(只用在a标签)：a:link、a:visited
  - 动态伪类选择器：e:active、e:hover
  - 组合选择器：选择器1, 选择器2, ...选择器n

- CSS3

  - 层次选择器：

    - E > F：子选择器，选择匹配所有的F元素，且匹配的F元素是E元素的子元素
    - E + F：相邻兄弟选择器，选择匹配的F元素，且F元素为E元素后面的兄弟元素
    - E ~ F：兄弟选择器，选择匹配的F元素，且位于E元素后面的所有的F元素

  - 属性选择器：

    - E[attr='val']：选择匹配具有attr的E元素，且attr的属性值为val
    - E[attr*='val']：选择匹配具有attr的E元素，且attr的属性值包含val
    - E[attr^='val']：选择匹配具有atrr的E元素，且attr的属性值以val开头
    - E[attr$='val']：选择匹配具有attr的E元素，且attr的属性值以val结尾

  - 伪类选择器：

    - E:first-child：选择父元素的第一个子元素并且该子元素为E
    - E:first-of-type：选择父元素的第一个E元素
    - E:last-child：选择父元素的最后一个子元素并且该子元素为E
    - E:last-of-type：选择父元素的最后一个E元素
    - E:nth-child(n)：数字，单词(odd表示奇数，even表示偶数)
    - E:nth-of-type(n)：数字，单词(odd表示奇数，even表示偶数)

  - 动态伪类选择器：

    - E:focus：匹配的E元素在获取焦点时生效
    - E:target：匹配所有的E元素，且匹配的元素被相关的URL指向(锚点指向)时生效

  - UI动态伪类选择器：

    - E:checked：选择匹配的E元素并且E元素已经被选择上(用于多选框或单选框)

  - 伪元素选择器：

    - E::before：选择匹配的E元素，并且在选择的元素内容前面拆入内容
    - E::after：选择匹配的E元素，并且在选择的元素的内容后面拆入内容

    __注__：使用before和after插入内容时要使用content属性，content的值可以是字符串(会把字符串渲染到页面)、url(图像地址，渲染图片)、attr(HTML属性名，将元素指定的属性名对应的值作为插入的内容)

#### CSS选择器权重值

- ID选择器为：0,1,0,0
- 类选择器、属性选择器、伪类选择器为：0,0,1,0
- 标签选择器、伪元素选择器为：0,0,0,1
- 通用符选择器：0,0,0,0
- 层次选择器拆分并进行相加计算权重值
- 行内样式的权重值为1,0,0,0

__注__：在属性值后面添加 !important 权重值最大，一般不推荐使用，在某些场景下可以使用



### 属性

#### 元素类型

- 显示

  - block（块元素）
  - inline（行内元素）
  - inline-block（行内块元素）
  - flex（弹性盒子）

- 不显示

  - display:none
  - visibility:hidden

  > display和visibility隐藏的区别
  >
  > 1. 继承性
  >    - visibility可以继承，子元素是因为继承了才隐藏
  >    - display不能被继承，而是直接带着所有内部元素直接隐藏
  > 2. 影响布局
  >    - visibility隐藏会保留元素原来所占的位置，会影响布局
  >    - display隐藏不会保留元素原来所占的位置，不会影响布局
  > 3. 引起重绘重排
  >    - visibility隐藏不会引起重排，会引起重绘
  >    - display隐藏会引起重排重绘
  > 4. js获取元素宽高
  >    - visibility隐藏js可以获取到元素的可视化宽高
  >    - display隐藏js不可以获取到元素的可视化宽高

#### block

- 文本操作
  - text-indent：文本缩进
  - word-break：换行
  - overflow：显示状态
  - text-align：文本对齐

- 盒子模型

  ```css
  分类：标准盒模型和IE盒模型
  默认情况下，块级元素的宽高等于内容区的宽高，可以通过设置box-sizing使用IE盒模型
  content-box,盒子宽/高计算 width/height
  border-box,盒子宽/高计算 width/height+padding-right/top+padding-left/bottom+border-right/top-width+border-left/bottom-width
  ```

  - 内容区：用来存放具体内容

    - 宽度：设置内容区的宽度
      - width：
      - min-width：最小宽度
      - max-width：最大宽度
    - 高度：设置内容区的高度
      - height：
      - min-height：最小高度
      - max-height：最大高度

  - 内边距：用来定义内容区域和边框的距离

    - padding
      - padding：top/bottom left/right
      - padding：top right/left bottom
      - padding：top right bottom left
    - padding-top
    - padding-right
    - padding-bottom
    - padding-left

    __注意__：行内元素上设置的上、下内边距对行高没有影响。行内块级元素可以设置内边距并且有正常的效果。

  - 边框：边框是内容区和内边距周围的一条或多条线

    1. 边框三要素：宽度(默认由浏览器决定) 样式(默认为none) 颜色(默认是元素自身的文本颜色)
    2. 三要素单独设置

    - border-width：value
      - border-width：top/bottom left/right
      - border-width：top right/left bottom
      - border-width：top right bottom left
    - border-style：value
      - border-style：top/bottom left/right
      - border-style：top right/left bottom
      - border-style：top right bottom left
    - border-color：value
      - border-color：top/bottom left/right
      - border-color：top right/left bottom
      - border-color：top right bottom left

    3. 单边设置

    - border-top：width style color
    - border-right：width style color
    - border-bottom：width style color
    - border-left：width style color

    4. 整体设置

    - border：border-width border-style border-color

    5. 边框圆角：border-radius

  - 外边距：定义元素盒子和元素盒子之间的距离

    - margin
      - margin：top/bottom left/right
      - margin：top right/left bottom
      - margin：top right bottom left
    - margin-top
    - margin-right
    - margin-bottom
    - margin-left

    __注__：行内元素上设置上、下外边距对行高没有影响，设置左右外边距可以正常使用。行内块元素设置上下左右外边距都可以正常使用。

    外边距折叠问题：

    原因：产生外边距折叠的根本原因，margin之间有直接接触，外边距只有块元素的垂直外边距会折叠，左右外边距不会折叠。

    情况一：盒子的下margin和它下一个兄弟元素的上margin产生了折叠。

    解决方案：设置第一个元素inline-block或直接设置元素一边的外边距（设置上外边距或下外边距）。

    情况二：盒子的上margin和它第一个子元素的上margin产生的折叠（父级塌陷）。

    解决方案：父元素设置边框或内边距，把margin隔开。

    > #### BFC
    >
    > BFC是块级格式化上下文，是web页面可视化渲染的一部分，开启BFC后会生成一个隔离的空间，里面的子元素不会影响外面的元素。
    >
    > 作用：
    >
    > 1. 防止外边距折叠
    > 2. 清除浮动带来的影响
    >
    > 开启BFC：
    >
    > 1. display：inline-block
    > 2. overflow：hidden/auto/scroll
    > 3. float：left/right
    > 4. position：absolute/fixed
    > 5. display：flow-root

  - 盒子阴影：
    - box-shadow：lrshadow tbshadow blur color [inset]
      - lrshadow：左右阴影。负数表示在盒子左侧、正数表示在盒子右侧
      - tbshadow：上下阴影。负数表示在盒子上侧、正数表示在盒子下侧
      - blur：模糊度
      - color：阴影的颜色
      - inset：可选，如果加上inset，阴影会投递在盒子内部
    
  - 横向格式化：
    - 块级盒子组成部分(横向)：包含它的父级元素的宽度 = 子元素的margin-left + 子元素的border-left + 子元素的padding-left + 子元素的width + 子元素的padding-right + 子元素的border-right + 子元素的margin-right
    - 依据：七个属性中只有子元素的width、子元素的margin-left、子元素的margin-right可以设置为auto，其他的属性只能设置为具体的值或默认值（默认值为0）。
    - 情况一：width、margin-left、margin-right，其中两个设置为具体的值，一个为auto的情况。值为auto的属性自动计算后补全总和
    - 情况二：width、margin-left、margin-right，三个属性都设置为auto之外的值，margin-right不生效（过渡约束）
    - 情况三：width、margin-left、margin-right，其中两个设置为auto
      - margin-left和margin-right两个设置为auto，两侧外边距平分，子元素在父元素中水平居中
      - 某一外边距和width设置为auto，外边距为auto的那个值为0，width被设置为填满容纳块所需的值
    - 情况四：width、margin-left、margin-right，三个属性都设置为auto，两边外边距都为0，width被设置为填满容纳块所需的值
    
  - 背景：在前景色的后面，元素的背景在边框的外边距处终止。（默认时包括内容区、内边距、边框）不会延伸到外边距区域
    - background-color：背景色
    - background-image：背景图
      - background-repeat：背景重复方式
      - background-position：背景定位
      - background-attachment：背景粘滞
      - background-size：背景图尺寸
      - background-clip：用来控制背景延伸到哪里
      - background-origin：背景定位基准，默认定位在padding的外边界

#### inline

- 修饰字体
  - font-family：字体族
  - font-size：字体大小
  - font-weight：字体粗细
  - font-style：字体风格
  - color：字体颜色

- 修饰文本
  - text-decoration：下划线、删除线、上划线
  - letter-spacing：字符间距
  - text-shadow：文字阴影
- 内联盒子：上半行距、内容区域、下半行距
  - 行高：line-height
    - 垂直居中对齐
      - 单行文本：height和line-height设置相同的值
      - 多行文本：多行文本使用标签包裹，并设置display：inline-block，在父级设置height和line-height相同的值，在包裹多行文本的标签上使用vertical-align：middle
      - 图片：同上
  - 对齐方式：vertical-align
    - 图片缝隙问题
      - 图片块状化，快状化之后就没有所谓的基线对齐了
      - 基线底部对齐
      - 父元素的font-size设置为0

#### flex

- 父元素：弹性容器
  - dispaly：flex，声明为弹性容器
  - flex-direction：设置主轴方向
  - flex-wrap：主轴换行
  - justify-content：主轴内容分布
  - align-items：辅轴内容分布（按行分布）
  - align-content：辅轴内容分布（所有行看成一个整体按一行来分布）
- 子元素：弹性元素
  - align-self：单独设置辅轴内容分布
  - flex-grow：设置增长因子
  - order：弹性元素排序
  - flex-shrink：收缩因子
- 轴的问题
  - 主轴：内容沿着次轴开始流动，执行弹性元素的流动方向。默认主轴方向是水平方向，左边开始，右边结束
  - 辅轴（垂直轴、交叉轴、侧轴）：弹性元素沿着此轴进行堆叠，指放置新弹性元素行的方向。垂直轴始终与主轴垂直，垂直轴是从上面开始，下面结束

#### 浮动

- 浮动原理：父类高度塌陷，让跟随的内容可以和浮动元素在一个水平线上，块状盒子和浮动元素会重叠，但是块状元素中的行框盒子和浮动元素不会重叠
- 副作用及规则：
  - 浮动元素的上边缘位置，要考虑在它之前的块元素或浮动元素
  - 设置为浮动元素后，该元素会自动变为块元素
  - 子元素浮动将会导致父元素的高度塌陷
  - 浮动元素四周的外边距不折叠
  - 浮动元素的左边界不能超过容纳块的左内边界，右浮动最远只能到达容纳块的右内边界
  - 浮动元素的顶边不能比父元素的顶边高，为的是避免一直向文档的顶端浮动
  - 在文档中处于前面的元素向左浮动，那后面的浮动元素的左外边界在前一个元素右外边界的右侧
  - 浮动元素的顶边不能比前面任何一个浮动元素的顶边高
  - 浮动元素的后代也浮动时，将扩大范围，包含浮动的后代元素
- float：value
  - none：没有浮动，默认值
  - left：元素向左浮动
  - right：元素向右浮动
- 抗浮动
  - 元素盒子的边不能和前面的浮动元素相邻
  - clear属性用来设置自身怎么样，而不是浮动的元素怎么样
  - clear
    - none：允许元素向另一个元素的任何一边浮动
    - left：元素左侧抗浮动
    - right：元素右侧抗浮动
    - both：元素两侧抗浮动

#### 定位

- position：value
  - static：默认值
  - relative：相对定位。相对于自身进行定位，相对定位的元素移动到其他地方，本来的位置不会被占据
  - absolute：绝对定位。绝对定位的元素从文档流中删除，其位置相对于容纳块来确定。
    - 绝对定位的元素的容纳块是position的值不为static的最近的祖辈元素
    - 如果没有祖辈元素，元素的容纳块是初始容纳块（所谓的初始容纳块就是根元素容纳块）
  - fixed：固定定位。固定定位的元素从文档流中删除，其位置相对于浏览器视口进行定位。
  
  > 包含块：定位元素根据包含块进行定位
  >
  > 1. position值为static或relative时，其包含块就是父元素
  > 2. position值为absolute时，其包含块就是最近值不为static的定位祖先元素
  > 3. position值为fixed时，其包含块就是viewport
  > 4. 当从内向外没有包含块时，其包含块就是html初始包含块
- z-index：定位元素的堆叠顺序
  - auto：默认值，为0
  - 数值：值可以为任何整数，值越大离我们就越近，值越小离我们就越远
- 水平居中
  - 父元素是relative
  - 子元素设置为absolute
  - 子元素设置left为父元素的50%
  - 子元素设置margin-left为负的自身宽度的一半

#### 过渡

​	元素从一种样式逐渐改变为另一种样式的效果

- 步骤
  1. transition-property：过渡属性名
  2. transition-duration：过渡持续时间
  3. transition-timing-function：过渡的时序
  4. transition-delay：过渡延迟时间
- 单属性设置
  - transition：transition-property transition-duration transition-timing-function transition-delay
- 单属性多个过渡设置
  - transition：transition-property transition-duration transition-timing-function transition-delay，transition-property transition-duration transition-timing-function transition-delay，...

#### 动画

​	控制过渡效果更加精细

- 步骤
  1. 定义关键帧：@keyframes 动画名
  2. 将关键帧应用在元素上
     1. animation-name：动画名
     2. animation-duration：动画持续时间
     3. animation-delay：动画延迟时间
     4. animation-iteration-count：动画迭代次数
     5. animation-direction：动画播放方向
     6. animation-timing-function：动画的时序

- step()
  - 使用step()时，属性不是连续不断滑入的（没有过渡，直接从一个效果到另一个效果）
  - step的设置是针对两个关键帧之间的，而非整个规则

#### 颜色处理

- filter（滤镜）：处理图像的各种效果
- opacity（透明度）：指定一个元素的透明度。当属性的值被应用到某个元素上时，把这个元素当成一个整体来看待。（内容、背景色、前景色、边框）
- 渐变
  - linear-gradient（线性渐变）：[方向/角度] color1 color2...
  - repeating-linear-gradient（重复性线性渐变）
  - radial-gradient（径向渐变）：[大小] [at point] color1 color2...
  - repeating-radial-gradient（重复性径向渐变）
- 透明度的使用
  - filter：opacity，一般用在图像上
  - opacity：一般用在某个元素上，在动画中使用用来做淡入淡出的效果
  - rgba：用来设置背景透明度但是内容不透明的效果

#### 变形

- transform
  1. 元素移动
     - translateX()：沿元素自身的x轴移动元素
     - translateY()：沿元素自身的y轴移动元素
     - translate(x-value，y-value)：同时沿着元素自身的x轴和y轴移动元素
  2. 元素缩放
     - scaleX()：在x轴上进行缩放
     - scaleY()：在y轴上进行缩放
  3. 元素变形
     - skewX()：元素在水平方向上扭曲变形
     - skewY()：元素在垂直方向上扭曲变形
  4. 元素旋转
     - rotateZ()/rotate()：沿着z轴旋转指定角度
- transform-origin：改变元素的原点位置

#### 响应式

​	使用媒体查询做响应式页面

- 用法
  1. 在HTML标签中使用media属性进行媒体查询
  2. 在CSS中定义@media块，使用这个语法可以在同一个样式表中为多种媒体定义样式
- 格式：media="媒体类型" 逻辑关键字 (媒体特性)
  - 媒体类型
    - all：所有能够呈现内容的媒体
    - print：打印机或是文档的打印预览
    - screen：呈现文档的屏幕媒体，电脑显示器运行在这上面的web浏览器
    - speech：语音合成器，屏幕阅读器
  - 逻辑关键字
    - and：并且，每个都成立整个查询结果才成立
    - not：对整个查询结果取反，如果所有条件都满足，不应用样式表
    - ，：表示或者的意思
  - 媒体特性
    - min-width：指web浏览器中的视图区域加滚动条的宽度大于指定的宽度
    - max-width：指web浏览器中的视图区域加滚动条的宽度小于等于指定的宽度
    - orientation：指定了设备处于横屏还是竖屏，通过width和height进行判断，如果height大于或等于width时返回'landscape'看做是横屏状态



### 重绘重排

重绘重排是DOM编程中耗能的主要原因之一

- 重排(回流)：当render tree中的一部分或者是全部，因为元素的尺寸、布局、隐藏等等改变引起页面的重新渲染，这个过程称作为重排。完成重排以后，浏览器会重新绘制受影响的元素，该过程称作为重绘。
- 重绘：当render tree中更新的属性只会影响元素的外观、风格，不会影响元素的布局的时候，浏览器需要重新绘制当前元素的样式，被称作为重绘。

__注__：重绘不会引起重排，但重排一定会引起重绘，一个元素的重排通常会带来一系列的反应，甚至触发整个文档的重排和重绘，性能代价是高昂的。

> 重排的情况：
>
> 1. 页面初始化渲染（无法避免）
> 2. 添加或删除可见的DOM元素
> 3. 元素位置改变
> 4. 元素尺寸改变
> 5. 元素内容改变
> 6. 浏览器窗口尺寸改变

