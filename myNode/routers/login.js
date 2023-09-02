// 引入express
const express = require("express");
// 创建路由器对象
const r = express.Router();
// 引入jsonwebtoken模块
const jwt = require("jsonwebtoken");
// 引入生成验证码的svg-captcha模块
const captcha = require("svg-captcha");
// 引入mysql连接池
const pool = require('../pool.js')
// 设置密钥
const key = "my pp";

// 颁发token并返回给客户端
r.get("/gettoken", (req, res) => {
  let payload = {
    name: "周周",
    userId: 1001,
    exp: Date.now() / 1000 + 3600,
  };
  let token = jwt.sign(payload, key);
  res.send({
    code: 200,
    token,
  });
});

let redis = {};

// 接收请求，拿到消息头中的token，验证token是否有效，返回验证码图片，获取验证码图片使用svg图片，svg-captcha模块可以实现
r.get("/getcode", (req, res) => {
  // 生成验证码
  let cap = captcha.create();
  // 从消息头中解析token字符串
  let token = req.get("authorizition");
  console.log(token);
  jwt.verify(token, key, (err, decode) => {
    if (err != null) {
      //token验证失败
      res.send("验证码获取失败！刷新重试");
      return;
    }
    // token验证成功
    // 将token与正确答案，绑定在一起存入redis缓存
    redis[token] = cap.text;
    console.log("当前redis", redis);
    res.send(cap.data);
  });
});

// 学生登陆接口，先验证验证码是否有效
r.post("/login", (req, res) => {
  console.log(req.body);
  // 用户输入的验证码;
  let ucode = req.body.useryzm;
  // console.log(ucode);
  let token = req.get("authorizition");
  console.log(token);
  jwt.verify(token, key, (err, decode) => {
    console.warn(err);
    if (err != null) {
      //token验证失败
      res.send("刷新重试");
      return;
    }
    // token验证成功
    // 将token与正确答案，绑定在一起存入redis数据库
    let answer = redis[token];
    console.log(answer);
    if (ucode.toLowerCase() == answer.toLowerCase()) {
      // 链接数据库查询是否有该用户
      pool.query('select * from studentinfo where snumber=? and spassword=?',[req.body.username,req.body.userpassword],(err,succ)=>{
        if(succ.length == 0 ){
          res.send({
            code:201,
            message:'登陆失败'
          })
        }else{
          res.send({
            code:200,
            message:'登陆成功',
            data:succ
          })
        }
      })
    } else {
      res.send({
        code:202,
        message:'验证码输入错误'
      })
    }
  });
});

r.post("/loginAdmin", (req, res) => {
  console.log(req.body);
  // 用户输入的验证码;
  let ucode = req.body.useryzm;
  // console.log(ucode);
  let token = req.get("authorizition");
  console.log(token);
  jwt.verify(token, key, (err, decode) => {
    console.warn(err);
    if (err != null) {
      //token验证失败
      res.send("刷新重试");
      return;
    }
    // token验证成功
    // 将token与正确答案，绑定在一起存入redis数据库
    let answer = redis[token];
    console.log(answer);
    if (ucode.toLowerCase() == answer.toLowerCase()) {
      // 链接数据库查询是否有该用户
      pool.query('select * from admininfo where anumber=? and apassword=?',[req.body.username,req.body.userpassword],(err,succ)=>{
        if(succ.length == 0 ){
          res.send({
            code:201,
            message:'登陆失败'
          })
        }else{
          res.send({
            code:200,
            message:'登陆成功',
            data:succ
          })
        }
      })
    } else {
      res.send({
        code:202,
        message:'验证码输入错误'
      })
    }
  });
});

module.exports = r;
