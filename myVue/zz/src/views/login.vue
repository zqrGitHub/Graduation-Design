<template>
  <div class="bgimg">
    <h1>学生宿舍管理系统</h1>
    <!-- 表单区域 -->
    <div class="formArea">
      <el-form :model="loginForm"  ref="ruleForm" :rules="rules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            prefix-icon="el-icon-s-custom"
            placeholder="请输入账号"
            @blur.native.capture="usernameCheck"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入6位数字密码"
            @blur.native.capture="passwordCheck"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 用户角色 -->
        <el-radio-group v-model="radio1">
          <el-radio-button label="学生"></el-radio-button>
          <el-radio-button label="管理员"></el-radio-button>
        </el-radio-group>
        <!-- 验证码 -->
        <span v-html="yzm" @click="this.getCode" class="yzm"></span>
        <!-- <el-input v-model="input" placeholder="请输入验证码" class="yanzhengma"></el-input> -->
        <el-form-item prop="yanzhengma">
          <el-input
            class="yanzhengma"
            type="text"
            v-model="loginForm.yanzhengma"
            prefix-icon="el-icon-connection"
            placeholder="请输入验证码"
            @blur.native.capture="yanzhengmaCheck"
          ></el-input>
        </el-form-item>
        <!-- 登陆注册 -->
        <el-form-item class="anniu">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // 登陆表单数据绑定对象
      loginForm: {
        username: "",
        password: "",
        yanzhengma: "",
      },
      // 登陆表单数据验证规则对象
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        yanzhengma: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
      radio1: "",
      input: "",
      token: "",
      yzm: "",
    }
  },
  methods: {
    ...mapMutations(["updateUsername", "updateUsersusheid","updateAdminname"]),
    // 完整登陆业务
    // 验证用户名
    usernameCheck() {
      let reg = /^\d{11}$/;
      if (reg.test(this.loginForm.username)) {
        return true;
      } else {
        this.$message({
          showClose: true,
          message: "账号格式不正确",
          type: "warning",
        });
        return false;
      }
    },
    // 验证密码
    passwordCheck() {
      let reg = /^\d{6}$/;
      if (reg.test(this.loginForm.password)) {
        return true;
      } else {
        this.$message({
          showClose: true,
          message: "密码格式不正确",
          type: "warning",
        });
        return false;
      }
    },
    // 验证验证码
    yanzhengmaCheck() {
      let reg = /^[A-Za-z0-9][A-Za-z0-9][A-Za-z0-9][A-Za-z0-9]$/;
      if (reg.test(this.loginForm.yanzhengma)) {
        return true;
      } else {
        this.$message({
          showClose: true,
          message: "验证码格式不正确",
          type: "warning",
        });
        return false;
      }
    },
    // 实现登陆
    login() {
      // 先验证身份，请求不同的表
      if (this.radio1 == "") {
        this.$message({
          showClose: true,
          message: "请选择角色",
          type: "warning",
        });
      } else if (this.radio1 == "学生") {
        let params = `username=${this.loginForm.username}&userpassword=${this.loginForm.password}&useryzm=${this.loginForm.yanzhengma}`;
        let config = {
          headers: {
            authorizition: localStorage.getItem("token"),
          },
        };
        if (
          this.usernameCheck() &&
          this.passwordCheck() &&
          this.yanzhengmaCheck()
        ) {
          // 向学生接口服务器发送请求,同时携带验证码验证
          this.axios
            .post("http://localhost:3001/login", params, config)
            .then((res) => {
              // console.log(res.data.data[0].sname);
              if (res.data.code == 200) {
                let username = res.data.data[0].sname;
                let susheid = res.data.data[0].susheid;
                // 登陆成功跳转学生界面
                // console.log(res.data.code);
                // console.log("账号密码验证成功跳转学生界面");
                this.$message({
                  showClose: true,
                  message: "登陆成功",
                  type: "success",
                });
                // 将名字存入本地缓存,做状态管理vueX
                this.updateUsername(username);
                this.updateUsersusheid(susheid);
                localStorage.setItem("username", username);
                localStorage.setItem("usersusheid", susheid);
                // 跳转学生页面
                this.$router.push("/home");
                // 清空输入框
                this.loginForm.username = "";
                this.loginForm.password = "";
                this.loginForm.yanzhengma = "";
              } else if (res.data.code == 202) {
                this.$message({
                  showClose: true,
                  message: "验证码输入错误,看不清可以点击验证码刷新",
                  type: "warning",
                });
                // this.$message.error("验证码输入错误,看不清可以点击验证码刷新");
                this.getCode();
                this.loginForm.yanzhengma = "";
              } else {
                // console.log("登陆失败");
                this.$message({
                  showClose: true,
                  message: "账号或密码错误",
                  type: "error",
                });
                // 清空输入框
                this.loginForm.username = "";
                this.loginForm.password = "";
                this.loginForm.yanzhengma = "";
                // 刷新验证码
                this.getCode();
              }
            });
        } else {
          // console.log("拒绝你的发送请求");
          this.$alert("请按规则填写您的信息", "提示", {
            confirmButtonText: "确定",
          });
          // 清空输入框
          this.loginForm.username = "";
          this.loginForm.password = "";
          this.loginForm.yanzhengma = "";
          // 刷新验证码
          this.getCode();
        }
      } else {
        // console.log("向管理员发请求");
        let params = `username=${this.loginForm.username}&userpassword=${this.loginForm.password}&useryzm=${this.loginForm.yanzhengma}`;
        let config = {
          headers: {
            authorizition: localStorage.getItem("token"),
          },
        };
        if (
          this.usernameCheck() &&
          this.passwordCheck() &&
          this.yanzhengmaCheck()
        ) {
          // 向管理员接口服务器发送请求,同时携带验证码验证
          this.axios
            .post("http://localhost:3001/loginAdmin", params, config)
            .then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                let username1 = res.data.data[0].aname;
                // 登陆成功跳转管理员界面
                // console.log(res.data.code);
                // console.log("账号密码验证成功跳转学生界面");
                this.$message({
                  showClose: true,
                  message: "登陆成功",
                  type: "success",
                });
                // 跳转管理员页面
                // // 将名字存入本地缓存,做状态管理vueX
                this.updateAdminname(username1);
                localStorage.setItem("adminusername", username1);
                // 跳转学生页面
                this.$router.push("/adminhome");
                // 清空输入框
                this.loginForm.username = "";
                this.loginForm.password = "";
                this.loginForm.yanzhengma = "";
              } else if (res.data.code == 202) {
                this.$message({
                  showClose: true,
                  message: "验证码输入错误,看不清可以点击验证码刷新",
                  type: "warning",
                });
                // this.$message.error("验证码输入错误,看不清可以点击验证码刷新");
                this.getCode();
                this.loginForm.yanzhengma = "";
              } else {
                // console.log("登陆失败");
                this.$message({
                  showClose: true,
                  message: "账号或密码错误",
                  type: "error",
                });
                // 清空输入框
                this.loginForm.username = "";
                this.loginForm.password = "";
                this.loginForm.yanzhengma = "";
                // 刷新验证码
                this.getCode();
              }
            });
        } else {
          // console.log("拒绝你的发送请求");
          this.$alert("请按规则填写您的信息", "提示", {
            confirmButtonText: "确定",
          });
          // 清空输入框
          this.loginForm.username = "";
          this.loginForm.password = "";
          this.loginForm.yanzhengma = "";
          // 刷新验证码
          this.getCode();
        }
      }
    },
    // 获取验证码
    getCode() {
      let config = {
        headers: {
          authorizition: localStorage.getItem("token"),
        },
      };
      this.axios.get("http://localhost:3001/getcode", config).then((res) => {
        // console.log(res);
        this.yzm = res.data;
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.loginForm.username = "";
      this.loginForm.password = "";
      this.loginForm.yanzhengma = "";
      this.radio1 = "";
    },
  },
  // 页面加载的时候向服务器拿token
  mounted() {
    this.axios.get("http://localhost:3001/gettoken").then((res) => {
      // console.log(res);
      this.token = res.data.token;
      // console.log(this.token);
      localStorage.setItem("token", this.token);
      // 加载验证码
      let config = {
        headers: {
          authorizition: localStorage.getItem("token"),
        },
      };
      this.axios.get("http://localhost:3001/getcode", config).then((res) => {
        console.log(res);
        this.yzm = res.data;
      });
    });
  },
};
</script>

<style scoped>
.bgimg {
  width: 100%;
  height: 100%;
  background: url("../assets/img/background.jpg");
  background-size: 100% 100%;
  overflow: hidden;
}
.bgimg h1 {
  text-align: center;
  color: white;
  font-size: 42px;
  letter-spacing: 0.2em;
  margin-top: 80px;
}
.formArea {
  width: 500px;
  height: 400px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -150px;
}
.aaa {
  padding-left: 20px;
  width: 75% !important;
}
.login_form {
  position: absolute;
  top: 50px;
  left: 10px;
  width: 80%;
  margin-left: 10%;
}
.yanzhengma {
  margin-top: 20px;
}
.yzm {
  margin-left: 50px;
}
.anniu {
  margin-left: 110px;
}
</style>
