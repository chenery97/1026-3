/* 
function (exports, require, module, __filename, __dirname) {
  -- exports：用于暴露模块
  -- require：用于引入模块
  -- module：用于暴露模块
  -- __filenam：当前文件的绝对路径
  -- __dirname：当前文件所在的文件夹的绝对路径

  const author = 'chenery'
  console.log(arguments.callee.toString())
}
*/
const author = "chenery";
// 使用arguments.callee.toString() 可以查看当前整体函数体
console.log(arguments.callee.toString());
