/* 
  在项目中有一个package.json的文件，这个项目就是一个包

  包管理器：npm ==>  node package manager
  nrm ls:可以查看npm指令下载包时的服务器是哪个
  nrm use xx:可以指定使用npm指令下载包的服务器是哪个

  npm install xxx / npm i xxx --save / npm i xxx
    安装指定包名到当前的项目中，如果项目中没有node_modules文件夹，会创建一个，并且会在node_modules文件夹中添加安装的包，
    并且会在package.json和package-lock.json的dependencies中添加相关配置
  npm install xxx@x.x.x / npm i xxx@x.x.x
    安装指定版本指定包名...

  npm install xxx -D
    安装到开发环境，在package.json文件中，会把安装到开发环境的包的配置信息添加到devDependencies依赖中，在package-lock.json中的dependencies不区分生产环境和开发环境

  npm install / npm i
    将package-lock.json和package.json中所有的依赖包下载到当前的项目下

  npm install xxx -g / npm i xxx -g
    安装指定包到全局中，安装在全局的包，在任意地方都可以使用，一般给指令包安装到全局

  npm remove xxx
    卸载指定包，node_modules、package.json和package-lock.json中相关的数据都会删除

  注：如果在当前项目中没有找到node_modules目录，就会沿着目录层级一层一层往上找，直到找到根盘符
*/

const $ = require('jquery')
const uniq = require('uniq')

const arr = [4, 2, 3, 4, 5, 2, 3,];
console.log(uniq(arr));