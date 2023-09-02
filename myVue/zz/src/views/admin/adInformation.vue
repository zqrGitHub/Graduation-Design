<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-form :model="userForm" label-width="80px" :rules="rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="userForm.name" clearable disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="sex">
              <el-input v-model="userForm.sex" clearable disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账号" prop="uid">
              <el-input v-model="userForm.uid" clearable disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="userForm.password"
                show-password
                type="password"
                clearable
                :disabled="userForm.recando"
                placeholder="请输入6位数字密码"
                @blur.native.capture="passwordCheck"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话号码" prop="tel">
              <el-input
                v-model="userForm.tel"
                clearable
                :disabled="userForm.recando"
                placeholder="请输入电话号码"
                @blur.native.capture="telCheck"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家庭住址" prop="address">
              <el-input
                v-model="userForm.address"
                clearable
                :disabled="userForm.recando"
                placeholder="请输入家庭住址"
                @blur.native.capture="addressCheck"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button type="warning" @click="updateUser">修改信息</el-button>
          <el-button type="success" :disabled="userForm.recando" @click="submit"
            >提交</el-button
          >
          <el-button type="primary" :disabled="userForm.recando" @click="cancel"
            >取消</el-button
          >
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      userForm: {
        name: "",
        sex: "",
        uid: "",
        password: "",
        tel: "",
        address: "",
        recando: true,
      },
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        tel: [{ required: true, message: "手机号码不能为空", trigger: "blur" }],
        address: [
          { required: true, message: "家庭住址不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // 发送请求查询对应名字的所有数据库数据
    let username = localStorage.getItem("adminusername");
    this.axios
      .get(`http://localhost:3001/getAdUser?username=${username}`)
      .then((res) => {
        console.log(res);
        this.userForm.name = res.data.data[0].aname;
        this.userForm.sex = res.data.data[0].asex ? "男" : "女";
        this.userForm.uid = res.data.data[0].anumber;
        this.userForm.password = res.data.data[0].apassword;
        this.userForm.tel = res.data.data[0].atelphone;
        this.userForm.address = res.data.data[0].aadress;
      });
  },
  methods: {
    // 显示可修改的信息
    updateUser() {
      this.userForm.recando = false;
    },
    // 取消提交信息
    cancel() {
      // 刷新当前页面
      this.reload();
      this.userForm.recando = true;
    },
    // 三个正则表达式验证：手机号，密码，地址
    // 验证手机号
    telCheck() {
      let reg = /^1[3456789]\d{9}$/;
      if (reg.test(this.userForm.tel)) {
        return true;
      } else {
        this.$message({
          showClose: true,
          message: "手机格式不正确",
          type: "warning",
        });
        return false;
      }
    },
    // 验证密码
    passwordCheck() {
      let reg = /^\d{6}$/;
      if (reg.test(this.userForm.password)) {
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
    // 验证地址
    addressCheck() {
      let reg = /^(.+?)+(,\s*.+?)*$/; //任意个数字符串
      if (reg.test(this.userForm.address)) {
        return true;
      } else {
        this.$message({
          showClose: true,
          message: "请输入家庭住址",
          type: "warning",
        });
        return false;
      }
    },
    // 提交修改信息请求
    submit() {
      let params = `userpassword=${this.userForm.password}&usertel=${this.userForm.tel}&useraddress=${this.userForm.address}&userid=${this.userForm.uid}`;

      // 提交之前给个选项是否确定修改信息
      this.$confirm("此操作将修改您的信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 用户确认要修改信息
          // 判断他输入的值是否合理，通过了正则验证我再发送请求
          if (this.telCheck() && this.passwordCheck() && this.addressCheck()) {
            this.axios
              .put("http://localhost:3001/updateAdUser", params)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    showClose: true,
                    message: "信息修改成功",
                    type: "success",
                  });
                  this.reload();
                } else {
                  this.$message({
                    showClose: true,
                    message: "信息修改失败",
                    type: "error",
                  });
                  this.userForm.recando = true;
                }
              });
          } else {
            this.$message({
              showClose: true,
              message: "请填写正确的信息",
              type: "error",
            });
          }
        })
        // 用户取消修改个人信息
        .catch(() => {
          this.userForm.recando = true;
          this.reload();
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
