// 引入express
const express = require('express');
// 创建路由器对象
const r = express.Router();
// 引入数据库连接池
const pool = require('../../pool')
// 处理文件中间件
const multer = require('multer');
const xlsx = require('xlsx');

// 显示所有学生信息
r.get('/allStudent',(req,res)=>{
  pool.query('select * from studentinfo where state = 1',(err,succ)=>{
    res.send(succ);
  })
})
// 点击编辑按钮获得学生的数据
r.get('/getStudentSolo',(req,res)=>{
  let userid = req.query.userid;
  pool.query('select * from studentinfo where id = ?',[userid],(err,succ)=>{
    res.send(succ);
  })
})

// 修改学生信息
r.post('/getAll/xslb/modify',(req,res)=>{
  console.log(req.body);
  let snumber = req.body.snumber;
  let xueyuan = req.body.xueyuan;
  let stelphone = req.body.stelphone;
  let dudaoyuantel = req.body.dudaoyuantel;
  let banji = req.body.banji;
  let family = req.body.family;
  let lynumber = req.body.lynumber;
  let familytel = req.body.familytel;
  let spassword = req.body.spassword;
  let susheid = req.body.susheid;
  let fudaoyuan = req.body.fudaoyuan;
  pool.query("update studentinfo set xueyuan=?,stelphone=?,dudaoyuantel=?,banji=?,family=?,lynumber=?,familytel=?,spassword=?,susheid=?,fudaoyuan=? where snumber=?",[xueyuan,stelphone,dudaoyuantel,banji,family,lynumber,familytel,spassword,susheid,fudaoyuan,snumber],(err,succ)=>{
    console.log(err,succ);
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
// 删除学生
r.post('/getAllxslb/delete',(req,res)=>{
  let id = req.query.id;
  pool.query("update studentinfo set state = 0 where id = ?",[id],(err,succ)=>{
    res.send({
      code:200
    });
  })
})

// 多条件查询
r.post('/getAllxslb/mutisearch',(req,res)=>{
  let snumber = req.body.snumber;
  let sname = req.body.sname;
  let susheid = req.body.susheid;
  let lynumber = req.body.lynumber;
  let xueyuan = req.body.xueyuan;
  let banji = req.body.banji;
  pool.query(`select * from studentinfo where snumber like '%${snumber}%' and sname like '%${sname}%' and susheid like '%${susheid}%' and lynumber like '%${lynumber}%' and xueyuan like '%${xueyuan}%' and banji like '${banji}%'`,(err,succ)=>{
    res.send(succ);
  })
})

// 添加学生
r.post('/getAll/xsgl/insert',(req,res)=>{
  let snumber = req.body.snumber;
  let sname = req.body.sname;
  let sex = req.body.sex;
  let stelphone =req.body.stelphone;
  let susheid = req.body.susheid;
  let xueyuan = req.body.xueyuan;
  let banji = req.body.banji;
  let lynumber = req.body.lynumber;
  let fudaoyuan = req.body.fudaoyuan;
  let dudaoyuantel = req.body.dudaoyuantel;
  let family = req.body.family;
  let familytel = req.body.familytel;
  let spassword = req.body.spassword;
  let saddress = req.body.saddress;
  let state = 1;
  pool.query('insert into studentinfo (snumber,sname,spassword,sex,stelphone,saddress,susheid,fudaoyuan,dudaoyuantel,xueyuan,lynumber,banji,family,familytel,state) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[snumber,sname,spassword,sex,stelphone,saddress,susheid,fudaoyuan,dudaoyuantel,xueyuan,lynumber,banji,family,familytel,state],(err,succ)=>{
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

// 处理文件上传功能
const upload = multer({ dest: 'D:\\file' });
r.post("/upload", upload.single('file'),(req,res)=>{
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  // console.log(data);
  const values = data.map((item) => [item["姓名"], item["学号"], item["性别"],item["密码"],
  item["学院"], item["班级"], item["楼宇"],item["宿舍"],item["联系电话"], item["紧急联系人"], item["紧急联系人电话"],item["辅导员"],item["辅导员电话"],item["家庭住址"],item["状态"]]);
  console.log(values);
  pool.query("INSERT INTO studentinfo (sname,snumber,sex,spassword,xueyuan,banji,lynumber,susheid,stelphone,family,familytel,fudaoyuan,dudaoyuantel,saddress,state) VALUES ?",[values],(err,succ)=>{
    if (err) {
      console.log(err);
    }else{
      res.send('success');
    }
  })
})

// 处理导出数据为excel文件
r.get("/api/data",(req,res)=>{
  pool.query('select * from studentinfo where state = 1',(err,succ)=>{
    // console.log(succ);
    // 将查询结果转换为二维数组
    const data = succ.map(row => Object.values(row));
    res.send(data);
  })
})

module.exports = r;