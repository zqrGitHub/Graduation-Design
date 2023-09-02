<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍信息</el-breadcrumb-item>
      <el-breadcrumb-item>住宿信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <h1 v-text="suseid + '号宿舍人员名单'" style="text-align:center"></h1>
      <el-table :data="userlist" stripe border height="420">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="学号" prop="snumber"></el-table-column>
        <el-table-column label="姓名" prop="sname"></el-table-column>
        <el-table-column label="入学照" prop="image">
          <template slot-scope="scope">
            <!-- <el-image v-for="(item, index) in scope.row.image" :key="index" :src="item">
            </el-image> -->
            <el-image style="min-width:100; height:100px" :src="scope.row.image" :preview-src-list="[scope.row.image]">
            <div class="demo-image__error">
              <el-image></el-image>
            </div>
          </el-image>
            <!-- <img :src="scope.row.image" min-width="70" height="70"/> -->
          </template>
        </el-table-column>
        <el-table-column label="床位号" prop="sbed"></el-table-column>
        <el-table-column label="联系电话" prop="stelphone"></el-table-column>
        <el-table-column label="家庭住址" prop="saddress"></el-table-column>
        <el-table-column label="辅导员" prop="fudaoyuan"></el-table-column>
        <el-table-column label="辅导员电话" prop="dudaoyuantel"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlist: [

      ],
      suseid: ''
    };
  },
  mounted() {
    this.axios
      .get(`http://localhost:3001/getshiyou?susheid=${localStorage.getItem('usersusheid')}`)
      .then((res) => {
        console.log(res);
        this.userlist = res.data;
        this.suseid = res.data[0].susheid;
      });
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

h1 {
  margin-top: 10px;
}

.el-table {
  margin-top: 50px;
}
</style>
