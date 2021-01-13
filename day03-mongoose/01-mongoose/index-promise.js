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
    
    // 查
    // find()是查询所有符合条件的
    // 参数1：查询条件，决定返回的数据
    // 参数2：投影，决定返回哪些字段，1为要返回的字段，0为不返回的字段，_id不写默认会返回，什么都不写默认返回全部字段
    // 参数3：回调，参数1是错误对象，参数2是查询后返回的数据，是个数组，如果没有符合条件的数据，那么为空数组，不写回调会返回一个promise对象
    const searchResult = await stuModel.find({ stu_gender: 'male' }, { _id: 0, stu_name: 1, stu_score: 1 })
    
    console.log("查询成功", searchResult);
    
  } catch (error) {
    console.log(error)
  }
})()
