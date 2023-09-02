// 引入express
const express = require('express');
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require('../../pool');

// 页面加载获取所有楼管信息
r.get('/getAll',(req,res)=>{
  pool.query("select * from lylb where state=1",(err,succ)=>{
    res.send(succ)
  })
})

// 所有的楼宇名字信息
r.get('/getAll/lyname',(req,res)=>{
   pool.query("select lynumber from lylb where state=1",(err,succ)=>{
    res.send(succ)
  })
})

// 根据楼宇名字查询数据
r.get('/getAll/ly',(req,res)=>{
  // console.log(req.query);
  let lyname = req.query.lyname;
  pool.query("select * from lylb where lynumber=?",[lyname],(err,succ)=>{
    res.send(succ)
  })
})

// 通过用户名查询数据
r.get('/getAll/user',(req,res)=>{
  let username = req.query.username;
  pool.query(`select * from lylb where lyleader like '%${username}%'`,(err,succ)=>{
    res.send(succ);
  })
})

// 增加负责人的数据
r.post('/getAll/insert',(req,res)=>{
  // console.log(req.body);
  let lynumber = req.body.lynumber;
  let leader = req.body.leader;
  let sex = req.body.sex;
  let tel = req.body.tel;
  let state = 1;
  pool.query("insert into lylb (lynumber,lyleader,sex,tel,state) values (?,?,?,?,?)",[lynumber,leader,sex,tel,state],(err,succ)=>{
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

// 编辑按钮查询单个负责人
r.get('/getsolo',(req,res)=>{
  let id = req.query.userid;
  pool.query("select * from lylb where id = ?",[id],(err,succ)=>{
    res.send(succ);
  })
})

// 编辑区中修改负责人信息
r.post('/getAll/modify',(req,res)=>{
  let id = req.body.id;
  let lyleader = req.body.lyleader;
  let sex = req.body.sex;
  let tel = req.body.tel;
  pool.query("update lylb set lyleader=?,sex=?,tel=? where id=?",[lyleader,sex,tel,id],(err,succ)=>{
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

// 删除单个负责人
r.post('/getAll/delete',(req,res)=>{
  let id = req.query.id;
  pool.query("update lylb set state = 0 where id = ?",[id],(err,succ)=>{
    res.send({
      code:200
    });
  })
})

module.exports = r;