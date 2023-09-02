// 引入express
const express = require('express');
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require('../pool.js')

r.get('/getshiyou',(req,res)=>{
  // console.log(req.query);
  pool.query('select * from studentinfo where susheid=?',[req.query.susheid],(err,succ)=>{
    console.log(succ);
    res.send(succ);
  })
});

module.exports = r;