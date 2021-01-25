const module1 = require('./module1')
const module2 = require('./module2')

module1()
module2()

function fun() {
  console.log('gulp - app.js')
  console.log('1' == 1)
  module1();
  module2();
}

fun()