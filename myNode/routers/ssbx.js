// 引入express
const express = require('express');
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require('../pool.js')
// 上传报修图片
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:\\温理\\毕业\\毕业设计项目完成\\myVue\\zz\\public\\images') // 指定上传文件的目标文件夹
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // 保持上传文件的原始文件名
  }
})
const upload = multer({ storage })

// 宿舍报修信息存入数据库
r.post('/ssbx',upload.single('file'),(req,res)=>{
  console.log(req.file) // 打印上传的文件信息
  const newFileName = `/images/${req.file.filename}` 
  console.log(newFileName);
  console.log(req.body);
  let lynumber = req.body.lyNumber;
  let susheid = req.body.sushe;
  let uname = req.body.name;
  let tel = req.body.tel;
  let bxdate = req.body.date;
  let bxtime = req.body.time;
  let bxdel = req.body.detail;
  let state = 1;
  let switchon = 0;
  pool.query('insert into shbx (lynumber,susheid,uname,tel,bxdate,bxtime,bxdel,state,switchon,uploadimg) values (?,?,?,?,?,?,?,?,?,?)',[lynumber,susheid,uname,tel,bxdate,bxtime,bxdel,state,switchon,newFileName],(err,succ)=>{
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


// 查看自己的报修请求
r.post('/getbxsq',(req,res)=>{
  // 当前页数(先把传过来的string改为int)
  let pagenum = parseInt(req.body.pagenum);
  // 每页显示多少条数据
  let pagesize = parseInt(req.body.pagesize);
  // 起始索引页码
  let startIndex = (pagenum - 1) * pagesize;
  // 总条目数
  let total = '';
  pool.query('select * from shbx where uname=? and state=1',[req.query.uname],(err,succ)=>{
      // 返回总条目数
      total=succ.length
  })
  pool.query('select * from shbx where uname=? limit ?,?',[req.query.uname,startIndex,pagesize],(err,succ)=>{
    res.send({
      data:succ,
      total:succ.length,
      total
    })
  })
})

// 上传报修图片
// 保存上传的文件的目录
// const upload = multer({ dest: 'D:\\upLoadImg' })


// 处理文件上传请求
// r.post('/uploadImg', upload.single('file'), function(req, res) {
//   console.log(req.file) // 打印上传的文件信息
//   const newFileName = `/images/${req.file.filename}` 
//   console.log(newFileName);
//   pool.query('insert into test (uploadimg) values (?)',[newFileName],(err,succ)=>{
//     console.log(err);
//   })
//   res.send('File uploaded!')
// })

module.exports = r;