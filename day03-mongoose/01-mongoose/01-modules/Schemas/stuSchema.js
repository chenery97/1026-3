// 创建stuSchema
// 1.引入mongoose模块
const mongoose = require('mongoose')
// 2.获取Schema对象
const Schema = mongoose.Schema
// 3.创建stuSchema对象
const stuSchema = new Schema(
  {
    stu_id: {
      type: String, // 当前字段的数据类型
      required: true, // 当前字段为必填项
      unique: true, // 当前字段值的唯一性
    },
    stu_name: {
      type: String,
      required: true,
    },
    stu_age: {
      type: Number,
      required: true,
    },
    stu_gender: {
      type: String,
      required: true,
      default: "male", // 当前字段不填时的默认值
    },
    stu_grade: {
      type: String,
      required: true,
    },
    stu_score: {
      type: [Object], // 数据类型是一个数组，数组中的数据必须是对象
      required: true,
    },
    stu_info: {
      type: Schema.Types.Mixed, // 可以是任意的数据类型
    },
    stu_enable: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { collection: "stu_list" }
);

// 在stuModel模块中需要用到stuSchema对象，所以把这个对象暴露给外部
module.exports = stuSchema