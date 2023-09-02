// 引入express
const express = require('express');
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require('../../pool');

// 获取所有用户
r.get('/getAll/yhqx',(req,res)=>{
  pool.query("select * from yhqx where state=1",(err,succ)=>{
    res.send(succ);
  })
})

// 模糊查询单一用户
r.get('/getAll/yhqx/solo',(req,res)=>{
  let name = req.query.name;
  pool.query(`select * from yhqx where name like '%${name}%'`,(err,succ)=>{
    res.send(succ);
  })
})

// 添加用户
r.post('/getAll/yhqx/insert',(req,res)=>{
  let username = req.body.username;
  let sex = req.body.sex;
  let tel = req.body.tel;
  let role = req.body.role;
  let state = 1;
  pool.query("insert into yhqx (name,sex,role,tel,state) values (?,?,?,?,?)",[username,sex,role,tel,state],(err,succ)=>{
    if(succ.affectedRows == 1){
      res.send({
        code:200,
        message:'数据插入成功!'
      })
    }else{
      res.send({
        code:201,
        message:'数据插入失败!'
      })
    }
  })
})

// 编辑按钮查询单个用户权限
r.get('/getyhqxsolo',(req,res)=>{
  let id = req.query.userid;
  pool.query("select * from yhqx where id = ?",[id],(err,succ)=>{
    res.send(succ);
  })
})

// 编辑区中修改用户权限
r.post('/getAll/yhqx/modify',(req,res)=>{
  let tel = req.body.tel;
  let role = req.body.role;
  let id = req.body.id;
  pool.query("update yhqx set role=?,tel=? where id=?",[role,tel,id],(err,succ)=>{
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

// 删除单个用户
r.post('/getAllyhqx/delete',(req,res)=>{
  let id = req.query.id;
  pool.query("update yhqx set state = 0 where id = ?",[id],(err,succ)=>{
    res.send({
      code:200
    });
  })
})



module.exports = r;