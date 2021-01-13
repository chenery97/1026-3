;
// 因为内部使用了await，所以外层要套一个async函数，该函数只是不需要被复用，所以包装成一个匿名函数自调用
(async function () {
  // 1.引入mongoose模块
  const mongoose = require('mongoose')
  
  try {
    // 2.连接MongoDB数据库
    await mongoose.connect("mongodb://localhost:27017/node_dbs", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // 因为mongoose.connect()返回的是一个promise对象，所以使用await可以等待promise对象的状态改变成fulfilled，证明数据库连接成功
    console.log('mongoose 连接成功')

    // 3.获取mongoose对象中的Schema
    const Schema = mongoose.Schema

    // 4.创建Schema对象（集合的约束对象）
    const stuSchema = new Schema({
      stu_id: {
        type: String, // 当前字段的数据类型
        required: true, // 当前字段为必填项
        unique: true // 当前字段值的唯一性
      },
      stu_name: {
        type: String,
        required: true
      },
      stu_age: {
        type: Number,
        required: true
      },
      stu_gender: {
        type: String,
        required: true,
        default: 'male' // 当前字段不填时的默认值
      },
      stu_grade: {
        type: String,
        required: true
      },
      stu_score: {
        type: [Object], // 数据类型是一个数组，数组中的数据必须是对象
        required: true
      },
      stu_info: {
        type: Schema.Types.Mixed // 可以是任意的数据类型
      },
      stu_enable: {
        type: Number,
        required: true,
        default: 1
      }
    }, { collection: 'stu_list' })
    
    // 5.创建集合对象，并将Schema对象添加到集合中
    // 创建集合时，MongoDB会自动给集合名转成小写，并且在最后添加一个s，在创建Schema对象时，传入第二个参数可以解决这个问题
    const stuModel = mongoose.model('stu_list', stuSchema)
    
    // 增
    // 参数1：要插入的文档，插入多个文档时，传入一个数组的形式，插入一个文档时，传入一个对象的形式
    // 参数2：回调，参数1是错误对象，参数2是插入的数据对象，如果不写回调，则返回一个promise对象
    /* stuModel.create(
      [
        {
          stu_id: Date.now(),
          stu_name: "bbb",
          stu_age: 17,
          stu_grade: "1026",
          stu_score: [{ 语文: 90 }, { 数学: 89 }, { 英语: 87 }],
        },
        {
          stu_id: Date.now() + 1,
          stu_name: "ccc",
          stu_age: 15,
          stu_grade: "1215",
          stu_score: [{ 语文: 99 }, { 数学: 99 }, { 英语: 97 }],
        },
      ],
      (err, data) => {
        if (err) console.log("插入失败", err);
        else console.log("插入成功", data);
      }
    ) */
    // 查
    // find()是查询所有符合条件的
    // 参数1：查询条件，决定返回的数据
    // 参数2：投影，决定返回哪些字段，1为要返回的字段，0为不返回的字段，_id不写默认会返回，什么都不写默认返回全部字段
    // 参数3：回调，参数1是错误对象，参数2是查询后返回的数据，是个数组，如果没有符合条件的数据，那么为空数组，不写回调会返回一个promise对象
    /* stuModel.find({ stu_age: 29 }, {_id: 0, stu_name: 1}, (err, data) => {
      if (err) console.log('查询出错', err)
      else console.log('查询成功', data)
    })
    // 参数和find()一样，不同的是使用findOne()查询，只会返回第一条匹配的数据，而且返回的是一个对象，如果查找不到则为null
    stuModel.findOne({ stu_age: 22 }, { _id: 0, stu_name: 1 }, (err, data) => {
      if (err) console.log('查询出错', err)
      else console.log('查询成功', data)
    }) */
    // 更新
    // updateOne()只匹配到第一条数据进行更新
    // 参数1：查询条件
    // 参数2：要更新的数据
    // 参数3：回调，参数1是错误对象，参数2是更新的提示信息，不写回调会返回一个promise对象
    /* stuModel.updateOne({ stu_age: 29 }, { $set: { stu_age: 22 } }, (err, data) => {
      if (err) console.log('更新失败', err)
      else console.log('更新成功', data)
    }) */
    // 参数和updateOne()一样，不同的是使用updateMany()更新的是所有匹配的数据
    /* stuModel.updateMany({ stu_age: 17 }, { $set: { stu_gender: 'female' } }, (err, data) => {
      if (err) console.log('更新失败', err)
      else console.log('更新成功', data)
    }) */
    // 删
    // deleteOne()只匹配到第一条数据进行删除
    // 参数1：查询条件
    // 参数2：回调，参数1是错误对象，参数2是删除的提示信息，不行回调会返回一个promise对象
    /* stuModel.deleteOne({ stu_age: 29 }, (err, data) => {
      if (err) console.log('删除失败', err)
      else console.log('删除成功', data)
    }) */
    // 参数和deleteOne()一样，不同的是使用deleteMany()删除的是所有匹配的数据
    /* stuModel.deleteMany({ stu_name: /[a-z]+/g }, (err, data) => {
      if (err) console.log('删除失败', err)
      else console.log('删除成功', data)
    }) */

    
  } catch (error) {
    console.log('mongoose 连接失败', error)
  }
})()
