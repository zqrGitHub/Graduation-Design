<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生活服务</el-breadcrumb-item>
      <el-breadcrumb-item>校园卡充值</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <h2 class="money">校园卡查询</h2>
      <el-form
        :model="searchForm"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="学号" prop="studentNumber">
              <el-input
                v-model="searchForm.studentNumber"
                placeholder="请输入您的学号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="searchForm.pass"
                placeholder="请输入您的密码"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="search"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <el-collapse v-model="activeNames" v-if="isShow">
        <el-collapse-item title="校园卡查询结果:" name="1">
          <!-- 展示结果表单 -->
          <el-form :model="resultForm" label-width="110px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input v-model="resultForm.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账号">
                  <el-input v-model="resultForm.idNumber" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="余额">
                  <el-input v-model="resultForm.balance" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="上次充值时间">
                  <el-input v-model="resultForm.lastTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上次充值金额">
                  <el-input v-model="resultForm.laseMoney" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <!-- 充值选择区域 -->
      <h2 class="money">校园网充值</h2>
      <el-form>
        <p>请选择充值金额:</p>
        <el-row style="margin-top: 10px">
          <el-col :span="5">
            <el-radio v-model="money" label="10" border>10元</el-radio>
          </el-col>
          <el-col :span="5">
            <el-radio v-model="money" label="20" border>20元</el-radio>
          </el-col>
          <el-col :span="5">
            <el-radio v-model="money" label="50" border>50元</el-radio>
          </el-col>
          <el-col :span="5">
            <el-radio v-model="money" label="100" border>100元</el-radio>
          </el-col>
          <el-col :span="4">
            <el-input v-model="input" placeholder="其他金额"></el-input>
          </el-col>
        </el-row>
        <div class="submit">
          <el-button type="primary" round @click="recharge">充值</el-button>
          <el-button type="info" round @click="cancel">取消</el-button>
        </div>
      </el-form>
      
      <!-- 支付页面的对话框 -->
      <el-dialog
        title="请您选择支付方式"
        :visible.sync="ChoosePaymentMethod"
        width="50%"
        @close="dialogClosed"
      >
        <!-- 内容主体区 -->
        <el-tabs type="border-card">
          <el-tab-pane label="支付宝支付">
            <!-- <img src="../../assets/img/zhifubao.jpg" alt="支付宝码" /> -->
          </el-tab-pane>
          <el-tab-pane label="微信支付">
            <!-- <img src="../../assets/img/weixin.png" alt="微信支付码" /> -->
          </el-tab-pane>
        </el-tabs>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDiolog">确定</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询数据
      searchForm: {
        studentNumber: "",
        pass: "",
      },
      // 是否展示结果
      isShow: false,
      // 绑定钱
      money: "",
      input: "",
      //查出来的数据
      resultForm: {
        name: "周芩任",
        idNumber: "21219141244",
        balance: "10",
        lastTime: "2019-03-15",
        laseMoney: "50",
      },
      // 默认展开的面板
      activeNames: ["1"],
      // 控制选择支付方式对话框的显示与隐藏
      ChoosePaymentMethod: false,
      // 验证规则
      rules: {
        studentNumber: [
          { required: true, message: "请输入学号", trigger: "blur" },
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    search() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) {
          this.$notify({
            title: "警告",
            message: "请输入学号和密码",
            type: "warning",
          });
        } else {
          this.resultForm.idNumber = this.searchForm.studentNumber;
          this.isShow = true;
          this.activeNames = "1"
          this.$refs.addFormRef.resetFields();
        }
      });
    },
    recharge(){
      if (this.money == "") {
        this.$notify({
          title: "警告",
          message: "请您先选择充值金额",
          type: "warning"
        });
      } else {
        if(this.isShow == false){
          this.$notify({
          title: "警告",
          message: "请您先查询您的余额",
          type: "warning"
        });
        }else{
          this.ChoosePaymentMethod = true;
        }
      }
    },
    // 确定充值
    cancelDiolog(){
      this.ChoosePaymentMethod = false;
      this.activeNames = "2";
      this.money = "";
    },
    // 取消充值
    cancel(){
      this.ChoosePaymentMethod = false;
      this.activeNames = "2";
      this.isShow = false;
      this.money = "";
    }
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
.el-button {
  margin-left: 40px;
}
.money {
  margin-top: 20px;
  margin-bottom: 15px;
}

.submit {
  display: flex;
  justify-content: center;
  margin: 40px 0px;
}
.submit .el-button {
  margin-left: 40px;
}
.el-tab-pane {
  display: flex;
  justify-content: center;
}
.el-tab-pane img {
  width: 40%;
}
</style>
