(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const module1 = require('./module1')
const module2 = require('./module2')
const module3 = require('./module3')


module1()
module2.module2()
module3.module3()
},{"./module1":2,"./module2":3,"./module3":4}],2:[function(require,module,exports){
function module1() {
  console.log('module1')
}

module.exports = module1
},{}],3:[function(require,module,exports){
function module2() {
  console.log('module2')
}

module.exports = {
  module2
}
},{}],4:[function(require,module,exports){
function module3() {
  console.log('module3')
}

exports.module3 = module3
},{}]},{},[1]);
