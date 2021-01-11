const anthor = 'module1'

// 不能使用exports直接赋值
// 内部底层实现 exports = module.exports = {}
// 因为exports指向了module.exports，规范中规定如果exports和module.exports指向了不同的对象，则使用的是module.exports
// 所有只能在exports上扩展属性或方法

// exports = anthor
/* exports = {
  anthor: anthor
} */

exports.anthor = anthor