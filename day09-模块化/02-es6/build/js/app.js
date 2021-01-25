'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _module.foo1)();
(0, _module.bar1)();
console.log(_module.data1);
(0, _module2.foo2)();
(0, _module2.bar2)();
console.log(_module2.data2);
console.log(_module4.default.anthor);
_module4.default.foo();

console.log('-------app');