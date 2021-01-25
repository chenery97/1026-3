const module1 = require('./module1') // 在module1模块中的导出方式：module.exports = module1
const module2 = require('./module2') // 在module2模块中的导出方式：module.exports = { module2 } 导出的是一个对象，对象中包含module2属性或方法
const module3 = require('./module3') // 在module3模块中的导出方式：exports.module3 = module3 导出的是一个对象，对象中包含module3属性或方法

// 直接使用属性或方法
module1()
// 从对象身上使用属性或方法
module2.module2()
module3.module3()

/**
 *  在浏览器运行环境中模块之间要导入或导出，可以使用CommonJS的规范
 *  需要通过browserify把js文件进行编译成浏览器认识的，可以正常运行
 *  页面在浏览器运行时，使用编译后js文件
 * 
 * */