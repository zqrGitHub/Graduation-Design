// 引入express
const express = require('express');
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require('../../pool')

// 获取个人信息
r.get('/getAdUser',(req,res)=>{
  console.log(req.query);
  pool.query('select * from admininfo where aname=?',[req.query.username],(err,succ)=>{
    res.send({
      data:succ
    })
  })
})

module.exports = r;



