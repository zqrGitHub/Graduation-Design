// 引入express
const express = require('express');
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require('../../pool')

// 查看所有的请假请求
r.post('/getadqjsqq',(req,res)=>{
  // 当前页数(先把传过来的string改为int)
  let pagenum = parseInt(req.body.pagenum);
  // 每页显示多少条数据
  let pagesize = parseInt(req.body.pagesize);
  // 起始索引页码
  let startIndex = (pagenum - 1) * pagesize;
  // 总条目数
  let total = '';
  pool.query('select * from wcqj where state=1',(err,succ)=>{
      // 返回总条目数
      total=succ.length
  })
  pool.query('select * from wcqj where state=1 limit ?,?',[startIndex,pagesize],(err,succ)=>{
    res.send({
      data:succ,
      total:succ.length,
      total
    })
  })
})

// 处理请假
r.post('/getqjsq/onoff',(req,res)=>{
  let id = req.body.id;
  let switchon = req.body.switch;
  pool.query("update wcqj set switchon = ? where id= ?",[switchon,id],(err,succ)=>{
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

// 删除维修信息
r.post('/getAllqjsq/delete',(req,res)=>{
  let id = req.query.id;
  pool.query("update wcqj set state = 0 where id=?",[id],(err,succ)=>{
    res.send({
      code:200
    });
  })
})


module.exports = r;