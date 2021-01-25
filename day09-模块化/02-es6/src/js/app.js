import { foo1, bar1 } from './module1'
import {data1} from './module1'
import {foo2, bar2, data2} from './module2'
import module3 from './module3'

foo1()
bar1()
console.log(data1)
foo2()
bar2()
console.log(data2)
console.log(module3.anthor)
module3.foo()

console.log('-------app')