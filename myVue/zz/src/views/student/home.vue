<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <el-menu mode="horizontal" default-active="1">
          <el-menu-item index="1">学生宿舍管理系统</el-menu-item>
          <el-menu-item index="2" style="float: right">
            <span class="huanying">欢迎！</span>
            <span class="loginame">{{ $store.state.username }}</span>
            <el-button size="small" @click="logout" class="btn">退出登陆</el-button>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-container class="c">
        <el-aside width="200px" style="margin-top: 1px">
          <el-menu mode="vertical" :default-active="activeurl" router class="a" unique-opened>
            <el-menu-item index="welcome">
              <i class="el-icon-document"></i>
              <span slot="title">欢迎界面</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>个人中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="grxx">个人信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-check"></i>
                <span>宿舍信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="ssxx">住宿信息</el-menu-item>
              </el-menu-item-group>
              <!-- <el-menu-item-group>
                <el-menu-item index="hqsq">换寝申请</el-menu-item>
              </el-menu-item-group> -->
            </el-submenu>
            <!-- <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>每日提交</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="jkdk">健康打卡</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-document-add"></i>
                <span>请假事宜</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="wcqj">外出请假</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-monitor"></i>
                <span>后勤服务</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="shbx">损坏报修</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>生活服务</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="xyk">校园卡充值</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-chat-dot-round"></i>
                <span>我的提交</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="bxsq">
                  <el-badge is-dot class="item">报修申请</el-badge>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="qjsq">
                  <el-badge is-dot class="item">请假申请</el-badge>
                </el-menu-item>
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
      localStorage.removeItem("username");
      localStorage.removeItem("usersusheid");
    },
  },
  mounted() {
    let username = localStorage.getItem("username");
    this.$store.commit("updateUsername", username);
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
