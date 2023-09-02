// 引入express
const e = require("express");
const express = require("express");
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require("../../pool");

// 加载数据
r.get("/getAllsspf", (req, res) => {
  let sshpf=[];
  let weisheng=[];
  let jilv = [];
  let wenhua = [];
  // 宿舍号
  pool.query("select susheid from sspf", (err, succ) => {
     succ.forEach(element => {
      sshpf.push(element.susheid);
     });
     sshpf = sshpf.map(Number);
  });
  // 卫生得分
  pool.query("select weisheng from sspf", (err, succ) => {
    succ.forEach(element => {
      weisheng.push(element.weisheng);
     });
     weisheng = weisheng.map(Number);
 });
//  纪律得分
pool.query("select jilv from sspf", (err, succ) => {
  succ.forEach(element => {
    jilv.push(element.jilv);
   });
   jilv = jilv.map(Number);
});
// 文化得分
pool.query("select wenhua from sspf", (err, succ) => {
  succ.forEach(element => {
    wenhua.push(element.wenhua);
   });
   wenhua = wenhua.map(Number);
   console.log(wenhua);
});
  pool.query("select * from sspf", (err, succ) => {
    res.send(
      {
        data:succ,
        sshpf,
        weisheng,
        jilv,
        wenhua,
      }
    );
  });
});

r.post('/getAllsspf/mutisearch',(req,res)=>{
  let lynumber = req.body.lynumber;
  let susheid = req.body.susheid;
  let xuyuan = req.body.xueyuan;
  let banji = req.body.banji;
  pool.query(`select * from sspf where lynumber like '%${lynumber}%' and susheid like '%${susheid}%' and xuyuan like '%${xuyuan}%' and banji like '%${banji}%'`,(err,succ)=>{
    res.send(succ);
  })
})



module.exports = r;
