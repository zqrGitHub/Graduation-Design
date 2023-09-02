// 引入express
const express = require('express');
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require('../pool.js');

// 修改个人信息
r.put('/updateUser',(req,res)=>{
  let obj = req.body;
  console.log(obj);
  pool.query('update studentinfo set spassword=?,stelphone=?,saddress=? where snumber=?',[obj.userpassword,obj.usertel,obj.useraddress,obj.userid],(err,succ)=>{
    console.log(succ);
    if(succ.affectedRows == 0){
      res.send({code:201,msg:'修改失败！'});
		}else{
      if(succ.changedRows == 0){
        res.send({code:201,msg:'修改失败！'});
      }else{
        res.send({code:200,msg:'修改成功！'});
      }
		}
  })
})

module.exports = r;