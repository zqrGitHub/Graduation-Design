<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>申请管理</el-breadcrumb-item>
      <el-breadcrumb-item>请假申请</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-table :data="repairsList" stripe border max-height="400px">
        <el-table-column type="index" width="50px"></el-table-column>
        <el-table-column label="楼宇号" prop="lynumber" width="90px"></el-table-column>
        <el-table-column label="宿舍号" prop="susheid" width="70px"></el-table-column>
        <el-table-column label="请假人" prop="uname" width="100px"></el-table-column>
        <el-table-column label="联系电话" prop="tel" width="110px"></el-table-column>
        <el-table-column label="请假日期" prop="bxdate" width="100px"></el-table-column>
        <el-table-column label="请假时间" prop="bxtime" width="100px"></el-table-column>
        <el-table-column label="返校日期" prop="redate" width="100px"></el-table-column>
        <el-table-column label="返校时间" prop="retime" width="100px"></el-table-column>
        <el-table-column label="请假理由" prop="bxdel" width="150px"></el-table-column>
        <el-table-column label="请假图片" prop="uploadimg" width="150px">
          <template slot-scope="scope">
            <!-- <el-image v-for="(item, index) in scope.row.image" :key="index" :src="item">
            </el-image> -->
            <el-image style="min-width:100; height:100px" :src="scope.row.uploadimg" :preview-src-list="[scope.row.uploadimg]">
              <div class="demo-image__error">
                <el-image></el-image>
              </div>
            </el-image>
            <!-- <img :src="scope.row.image" min-width="70" height="70"/> -->
          </template>
        </el-table-column>
        <!-- 相关操作 -->
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- 是否已处理开关 -->
            <el-tooltip effect="dark" :content="scope.row.switchon == '0' ? '不同意' : '同意'" placement="top" :enterable="false">
              <el-switch v-model="scope.row.switchon" active-value="1" inactive-value="0"
                @change="userStateChanged(scope.row)"></el-switch>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页查询 -->
      <el-pagination @size-change="handleSizeChange" :page-size="pagesize" @current-change="handleCurrentChange"
        :current-page="pagenum" :page-sizes="[1, 3, 5, 7]" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
var moment = require("moment");
export default {
  inject: ['reload'],
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
    oneQuest() {
      let params = `&pagenum=${this.pagenum}&pagesize=${this.pagesize}`;
      this.axios
        .post(
          `http://localhost:3001/getadqjsqq`,
          params
        )
        .then((res) => {
          // // 总条数量
          this.total = res.data.total;
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
    // 处理请假需求
    userStateChanged(user) {
      let id = user.id;
      let switchon = user.switchon;
      let params = `id=${id}&switch=${switchon}`
      this.axios.post('http://localhost:3001/getqjsq/onoff', params).then(res => {
        if (res.data.code = 200) {
          this.$notify({
            title: "成功",
            message: "修改信息成功",
            type: "success",
          });
        }
      })
    },
    // 删除请假信息
    removeUserById(userid) {
      let id = userid;
      this.$confirm("此操作将永久删除报修信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求
          this.axios
            .post(`http://localhost:3001/getAllqjsq/delete?id=${id}`)
            .then((res) => {
              // if (res.data.code == 200) {
              console.log(res);
              // }
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-left: 10px;
  font-size: 12px;
}

.el-card {
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important; */
  margin-top: 20px;
}

.el-button {
  margin-left: 15px;
}
</style>
