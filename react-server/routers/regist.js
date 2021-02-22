/**
 * @description 路由器中间件 - 封装登录/注册路由
 */
const express = require("express");
const Users = require("../db/models/users");
const { SuccessModal, ErrorModal } = require("../model");
const md5 = require("../utils/md5");
const { sign } = require("../utils/jwt");
const { filterPassword } = require("../utils/tools");
const session_user = require("../session");
const Router = express.Router;
const router = new Router();

/**
 * @api {post} /regist/verify_phone 验证手机号是否存在
 * @apiDescription 验证手机号是否存在
 * @apiName verify_phone
 * @apiGroup regist: 注册
 * @apiParam {String} phone 手机号
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://localhost:5000/regist/verify_phone
 * @apiVersion 1.0.0
 */
router.post("/verify_phone", async (req, res) => {
  const { phone } = req.body;

  const user = await Users.findOne({ phone });

  if (user) {
    res.json(
      new ErrorModal({
        code: 20002,
        nickName: user.nickName,
        avatar: user.avatar,
        message: "手机号已存在, 请返回登录",
      })
    );
    return;
  }

  res.json(new SuccessModal({ data: {} }));
});

/**
 * @api {post} /regist/verify_code 验证验证码是否正确
 * @apiDescription verify_code  验证验证码是否正确
 * @apiName verify_code
 * @apiGroup regist: 注册
 * @apiParam {Number} phone 手机号
 * @apiParam {Number} code 验证码
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/regist/verify_code
 * @apiVersion 1.0.0
 */
router.post("/verify_code", async (req, res) => {
  const { phone, code } = req.body;

  const codeData = session_user[phone];

  if (codeData.expires > Date.now() && codeData.code == code) {
    res.json(new SuccessModal({ data: {} }));
  } else {
    res.json(new ErrorModal({ message: "验证码无效～" }));
  }
});

/**
 * @api {post} /regist/user 注册
 * @apiDescription user  注册
 * @apiName user
 * @apiGroup regist: 注册
 * @apiParam {Number} phone 手机号
 * @apiParam {Number} password 密码
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/regist/user
 * @apiVersion 1.0.0
 */
router.post("/user", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const token = await sign({ phone });
    // 存在数据库中
    const user = await Users.create({
      phone,
      token,
      password: md5(password),
    });

    res.cookie("user_session", token, { maxAge: 3600 * 24 * 7 });
    res.json(new SuccessModal({ data: { user: filterPassword(user) } }));
  } catch (e) {
    console.log("error", e);
  }
});

module.exports = router;
