/**
 * @description 路由器中间件 - 封装登录/注册路由
 */
const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const Users = require("../db/models/users");
const { SuccessModal, ErrorModal } = require("../model");
const md5 = require("../utils/md5");
const { sign, verify } = require("../utils/jwt");
const { CLIENT_ID, CLIENT_SECRET } = require("../config");
const { filterPassword } = require("../utils/tools");
const session_user = require("../session");

const Router = express.Router;
const router = new Router();

// 过期时间
const PHONE_EXPIRES = 30 * 60 * 1000;
const COOKIE_MAX_AGE = 3600000 * 24 * 7;

/**
 * @api {post} /login/user 用户账户密码登录
 * @apiDescription 用户账户密码登录
 * @apiName user
 * @apiGroup login: 登录
 * @apiParam {String} phone 用户名
 * @apiParam {String} password 密码
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://localhost:5000/login/user
 * @apiVersion 1.0.0
 */
router.post("/user", async (req, res) => {
  const { phone, password } = req.body;

  const user = await Users.findOne({ phone, password: md5(password) });

  if (!user) {
    res.json(new ErrorModal({ message: "用户名或密码错误" }));
    return;
  }

  let token;
  try {
    token = user.token;
    // 登录成功
    if (!token) {
      // 签发签名
      token = await sign({ id: user.id });
      // 存在数据库中
      user.token = token;
      await user.save();
    } else {
      await verify(user.token);
    }
  } catch {
    token = await sign({ id: user.id });
    // 存在数据库中
    user.token = token;
    await user.save();
  }

  // 返回响应
  res.cookie("user_session", token, { maxAge: COOKIE_MAX_AGE });
  res.json(new SuccessModal({ data: { user: {} } }));
});

/**
 * @api {post} /login/digits 发送验证码
 * @apiDescription digits 发送验证码
 * @apiName digits
 * @apiGroup login: 登录
 * @apiParam {Number} phone 手机号
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/digits
 * @apiVersion 1.0.0
 */
router.post("/digits", async (req, res) => {
  const { phone } = req.body;

  const verify_code = getVerifyCode(6);

  console.log(verify_code);

  session_user[phone] = {
    code: verify_code,
    expires: Date.now() + PHONE_EXPIRES,
  };

  res.json(new SuccessModal({}));
});

function getVerifyCode(len = 6) {
  let verify_code = "";
  for (let i = 0; i < len; i++) {
    verify_code += Math.floor(Math.random() * 10);
  }
  return verify_code;
}

/**
 * @api {post} /login/phone 手机号登陆
 * @apiDescription phone 手机号登陆
 * @apiName phone
 * @apiGroup login: 登录
 * @apiParam {Number} phone 手机号
 * @apiParam {Number} code 验证码
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/phone
 * @apiVersion 1.0.0
 */
router.post("/phone", async (req, res) => {
  const { phone, code } = req.body;

  const codeData = session_user[phone];

  if (codeData.expires > Date.now() && codeData.code == code) {
    let user = await Users.findOne({ phone });

    let token;
    if (user) {
      try {
        token = user.token;
        // 登录成功
        if (!token) {
          // 签发签名
          token = await sign({ phone });
          // 存在数据库中
          user.token = token;
          await user.save();
        } else {
          await verify(token);
        }
      } catch {
        const token = await sign({ phone });
        // 存在数据库中
        user.token = token;
        await user.save();
      }
    } else {
      token = await sign({ phone });
      // 存在数据库中
      user = await Users.create({
        phone,
        token,
      });
    }

    res.cookie("user_session", token, { maxAge: COOKIE_MAX_AGE });

    res.json(new SuccessModal({ data: {} }));
  } else {
    res.json(new ErrorModal({ message: "验证码无效～" }));
  }
});

/**
 * @api {get} /login/oauth/github github oauth 登陆
 * @apiDescription github oauth 登陆
 * @apiName github oauth
 * @apiGroup login: 登录
 * @apiParam {Number} code 授权码
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/oauth/github
 * @apiVersion 1.0.0
 */
router.get("/oauth/github", async (req, res) => {
  try {
    // 获取到了授权码 code
    const { code } = req.query;
    console.log('code>>>', code)
    // 接着去请求令牌 token
    const tokenResponse = await axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token`,
      data: {
        client_id: CLIENT_ID, // 固定不变
        client_secret: CLIENT_SECRET, // 固定不变，只在服务器保存，安全性更高
        code, // 上一步返回的code
      },
      headers: {
        accept: "application/json",
      },
    });
    // 得到用户token（类似于我们得到了用户登陆github的token了）
    const accessToken = tokenResponse.data.access_token;
    console.log('accessToken>>>', accessToken); // 1928a75941bbdae194d4935d2f1be893cf37a31c

    // 有了token，就有了访问用户信息权限的token
    // 根据token请求用户数据
    const { data } = await axios({
      method: "get",
      url: "https://api.github.com/user",
      headers: {
        accept: "application/json",
        Authorization: `token ${accessToken}`,
      },
    });

    const user = await Users.findOne({ username: data.login });

    let token;

    if (!user) {
      token = await sign({ username: data.id });

      await Users.create({
        username: data.id,
        avatar: data.avatar_url,
        nickName: data.name,
        password: data.node_id,
        token: token,
      });
    } else {
      // console.log(user);

      try {
        token = user.token;
        await verify(user.token);
      } catch {
        token = await sign({ username: data.id });
        user.token = token;
        await user.save();
      }
    }

    res.cookie("user_session", token, { maxAge: COOKIE_MAX_AGE });
    // 将得到的用户数据返回到页面上~
    res.redirect(`http://localhost:3000`);
  } catch (e) {
    console.log(e);
  }
});

/**
 * @api {post} /login/verify 验证用户是否登陆
 * @apiDescription 验证用户是否登陆
 * @apiName 验证用户是否登陆
 * @apiGroup login: 登录
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/verify
 * @apiVersion 1.0.0
 */
router.post("/verify", cookieParser(), async (req, res) => {
  try {
    const { user_session } = req.cookies;
    const data = await verify(user_session);
    const user = await Users.findOne(data);
    res.json(new SuccessModal({ data: filterPassword(user) }));
  } catch (e) {
    console.log(e);
    res.json(new ErrorModal({ message: "用户未登录，请先登录" }));
  }
});

module.exports = router;
