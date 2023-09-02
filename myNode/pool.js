// 创建数据库连接池
const mysql = require('mysql');
const pool = mysql.createPool({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'',
  database:'zzdatabase',
  connectionLimit:15
})
// 导出数据库模块
module.exports = pool;