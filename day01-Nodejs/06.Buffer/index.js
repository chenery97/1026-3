/* 
  Buffer
    - 它是一个类数组的对象，用于存储数据（存储的全部都是二进制数据）
    - Buffer的效率很高，存储和读取的速度都很快，本质就是对内存的直接操作
    - Buffer的大小一旦确定了就不可以修改

  (node:23192) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
*/

// Buffer()即将废弃 不推荐使用
// const buffer = Buffer(10);

// 安全的，占用干净的内存
const buffer1 = Buffer.alloc(10);
// 不安全的，会占用等待垃圾回收的内存，数据有问题
const buffer2 = Buffer.allocUnsafe(10);
// 英文字符占一个字节，中文占三个字节
const buffer3 = Buffer.from('hello, my name is chenery, 哦豁');
console.log(buffer1, buffer1.length);
console.log(buffer2, buffer2.length);
console.log(buffer3, buffer3.length);