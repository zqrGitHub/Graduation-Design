<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <el-menu mode="horizontal" default-active="1">
          <el-menu-item index="1">学生宿舍管理系统</el-menu-item>
          <el-menu-item index="2" style="float: right">
            <span class="huanying">欢迎！</span>
            <span class="loginame">{{ $store.state.adminname }}</span>
            <el-button size="small" @click="logout" class="btn"
              >退出登陆</el-button
            >
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-container class="c">
        <el-aside width="200px" style="margin-top: 1px">
          <el-menu
            mode="vertical"
            :default-active="activeurl"
            router
            class="a"
            unique-opened
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>个人中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="adgrxx">个人信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-school"></i>
                <span>楼宇管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="adlygl">楼宇列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-turn-off"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="adyhqx">用户权限</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-soccer"></i>
                <span>学生管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="adxsgl">学生列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>申请管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="adbxsq">
                  <el-badge is-dot class="item">报修申请</el-badge>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="adqjsq">
                  <el-badge is-dot class="item">请假申请</el-badge>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-pie-chart"></i>
                <span>统计中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="adsspf"> 宿舍评分 </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="t">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeurl: location.href.split("/").pop(),
    };
  },
  methods: {
    logout() {
      this.$router.push("/");
      this.$message({
        showClose: true,
        message: "退出登录",
        type: "success",
      });
      localStorage.removeItem("adminusername");
    },
  },
  mounted() {
    let username = localStorage.getItem("adminusername");
    this.$store.commit("updateAdminname", username);
  },
};
</script>

<style scoped>
.btn {
  margin-left: 10px;
}
.a {
  height: 1300px;
}
</style>
