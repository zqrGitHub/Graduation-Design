<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的提交</el-breadcrumb-item>
      <el-breadcrumb-item>请假申请</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-table :data="repairsList" stripe border max-height="400px">
        <el-table-column type="index" width="50px"></el-table-column>
        <el-table-column
          label="楼宇号"
          prop="lynumber"
          width="90px"
        ></el-table-column>
        <el-table-column
          label="宿舍号"
          prop="susheid"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="请假人"
          prop="uname"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="联系电话"
          prop="tel"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="请假日期"
          prop="bxdate"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="请假时间"
          prop="bxtime"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="返校日期"
          prop="redate"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="返校时间"
          prop="retime"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="报修详情"
          prop="bxdel"
          width="300px"
        ></el-table-column>
        <el-table-column label="是否同意" width="100px">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.switchon == '1'"
              >已批准</el-tag
            >
            <el-tag type="danger" v-else>未批准</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页查询 -->
      <el-pagination
        @size-change="handleSizeChange"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 3, 5, 7]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
var moment = require("moment");
export default {
  data() {
    return {
      repairsList: [],
        // 搜索页数
        query: "",
        // 当前页
        pagenum: 1,
        // 每页显示的条数个数 1 3 5 7
        pagesize: 1,
        // 总共多少条数据
        total: 10,
    };
  },
  mounted() {
    this.oneQuest();
  },
  methods: {
    // 改变每页多少条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.oneQuest();
    },

    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val;
        this.oneQuest();
      },


    // 封装发送请求
    oneQuest(){
      let params = `&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      this.axios
      .post(
        `http://localhost:3001/getwcqj?uname=${localStorage.getItem(
          "username"
        )}`,params
      )
      .then((res) => {
        // // 总条数量
        this.total = res.data.total
        console.log(res.data.data);
        res.data.data.forEach((element) => {
          // console.log(element.bxtime);
          element.bxtime = moment(element.bxtime, "HH-mm-ss").format(
            "HH:mm:ss"
          );
          // console.log(element.state);
        });
        this.repairsList = res.data.data;
      });
    },

  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-left: 10px;
  font-size: 12px;
}
.el-card {
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important; */
  margin-top: 20px;
}
</style>
