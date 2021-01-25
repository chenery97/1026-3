(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./module1":2,"./module2":3,"./module3":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo1 = foo1;
exports.bar1 = bar1;
function foo1() {
  console.log('module1 foo1()');
}

function bar1() {
  console.log('module1 bar1()');
}

var data1 = exports.data1 = [1, 2, 3, 4];
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function foo2() {
  console.log('module2 foo2()');
}

function bar2() {
  console.log('module2 bar2()');
}

var data2 = [4, 3, 2, 1];

exports.foo2 = foo2;
exports.bar2 = bar2;
exports.data2 = data2;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  anthor: 'chenery',
  foo: function foo() {
    console.log('module3 foo()');
  }
};
},{}]},{},[1]);
