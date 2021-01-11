/* 
  在NodeJs中事件轮询机制有六个阶段
  1.timers（定时器回调执行阶段）
  2.pending callbacks（系统阶段）
  3.idle,prepare（准备阶段）
  4.poll（轮询阶段）
    - 如果回调队列不为空
      - 从队列中取出回调函数同步执行（一个一个执行）直到队列为空 或 达到系统最大限度
    - 如果回调队列为空
      - 如果设置了setImmediate，进入下一个check阶段，目的：为了执行setImmediate的回调函数
      - 如果没有设置setImmediate，在此阶段停留，等待回调函数被插入到轮询队列，当定时器的时间到了，进入下一个check阶段，目的为了执行定时器的回调函数
  5.check（执行setImmediate回调阶段）
  6.close callbacks（关闭回调阶段，清除定时器、socket）
  特殊：process.nextTick(),能在任意阶段有限被执行
*/

setTimeout(() => {
  console.log('setTimeout');
})
setTimeout(() => {
  console.log('setTimeout2...')
}, 1000)
setImmediate(() => {
  console.log('setImmediate');
})

// 优先执行
process.nextTick(() => {
  console.log('process');
});