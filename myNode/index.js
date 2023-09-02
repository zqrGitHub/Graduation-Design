// 创建服务器
const express = require("express");
const app = express();
const port = 3001;
// 允许所有请求跨域
const cors = require('cors');
app.use(cors());
// 获取post数据中间件
app.use(express.urlencoded({
  extended:false
}))
app.use(express.json())

// 引入路由

// 登陆路由
const loginRouter = require('./routers/login');
// 获取用户信息路由
const yanzhengma = require('./routers/getUserInfo');
// 修改用户信息路由
const updateUser = require('./routers/updateUser');
// 获取室友信息
const getyoushi = require('./routers/getshiyou');
// 学生插入报修信息
const ssbx = require('./routers/ssbx');
// 学生插入请假信息
const wcqj = require('./routers/wcqj');

// 管理员路由
const AdUserInfo = require("./routers/admin/getAdUserInfo");
const updateAdUser = require("./routers/admin/updateAdUser");
const getAll = require('./routers/admin/lylb');
const yhqx = require('./routers/admin/yhqx');
const Adbxsq = require('./routers/admin/bxsq');
const Adqjsq = require('./routers/admin/qjsq');
const Adxslb = require('./routers/admin/xslb');
const Adtjzx = require('./routers/admin/tjzx');

// 挂载路由
app.use(yanzhengma);
app.use(loginRouter);
app.use(updateUser);
app.use(getyoushi);
app.use(ssbx);
app.use(wcqj);
// 挂载管理由路由
app.use(AdUserInfo);
app.use(updateAdUser);
app.use(getAll);
app.use(yhqx);
app.use(Adbxsq);
app.use(Adqjsq);
app.use(Adxslb);
app.use(Adtjzx);


app.listen(port,()=>{
  console.log('server is running!');
})

