<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后勤服务</el-breadcrumb-item>
      <el-breadcrumb-item>损坏报修</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 请假提交 -->
    <el-card>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-row>
          <el-col :span="12">
            <!-- 选择请假日期 -->
            <el-form-item label="报修日期" prop="date">
              <el-date-picker v-model="addForm.date" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"
                :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 选择时间 -->
            <el-form-item label="报修时间" prop="time">
              <el-time-picker v-model="addForm.time" value-format="HH-mm-ss" placeholder="请选择时间"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 报修表单 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修人" prop="name">
              <el-input v-model="addForm.name" placeholder="请输入您的姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="addForm.tel" placeholder="请输入您的联系电话" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="楼宇号" prop="lyNumber">
              <el-input v-model.number="addForm.lyNumber" placeholder="请输入您所在楼宇号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍号" prop="sushe">
              <el-input v-model.number="addForm.sushe" placeholder="请输入您的宿舍号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="损坏图片" prop="upImage">
              <test ref="child" :formdata="addForm" urll="http://localhost:3001/ssbx"></test>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="问题描述" prop="detail">
          <el-input v-model="addForm.detail" type="textarea" :autosize="{ minRows: 2, maxRows: 8 }"
            placeholder="请描述具体损坏情况" clearable></el-input>
        </el-form-item>
        <!-- 取消/添加报修按钮 -->
        <el-row type="flex" justify="end">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="addRepairs">添加报修</el-button>
        </el-row>
      </el-form>
      <p class="tishi" style="margin:10px 0;font-weight: bold;">
        温馨提示：同学您好！如有紧急报修项目请与楼管老师联系或者直接拨打后勤电话：15058497125
      </p>
      <p class="tishi" style="font-weight: bold;">
        如不影响正常学习生活，请填写以上申请表，我们会尽快安排维修人员解决问题，谢谢您的配合！
      </p>
    </el-card>
  </div>
</template>

<script>
import test from '../test.vue';
export default {
  components: { test },
  data() {
    var checkPhone = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    return {
      addForm: {
        name: "",
        tel: "",
        lyNumber: "",
        sushe: "",
        // 选择开始请假的日期
        date: "",
        // 选择开始请假的时间
        time: "",
        // 选择返回的日期
        returndate: "",
        // 选择返回的时间
        returntime: "",
        detail: "",
      },
      // 报修规则
      addFormRules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        date: [{ required: true, message: "请选择报修日期", trigger: "blur" }],
        time: [{ required: true, message: "请选择报修时间", trigger: "blur" }],
        returndate: [{ required: true, message: "请选择报修日期", trigger: "blur" }],
        returntime: [{ required: true, message: "请选择报修时间", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入您的联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        lyNumber: [
          { required: true, message: "请填写您所在楼宇号", trigger: "blur" },
          { type: 'number', message: '楼宇号必须为数字值' },
        ],
        sushe: [
          { required: true, message: "请填写您所在的宿舍号", trigger: "blur" },
          { type: 'number', message: '宿舍号必须为数字值' }
        ],
        detail: [
          { required: true, message: "请填写报修详情", trigger: "blur" },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods: {
    addRepairs() {
      // 验证符合表单规则后发送请求
      this.$refs.addFormRef.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.$refs.child.submitUpload()
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: "添加报修成功",
                type: "success"
              });
              this.$refs.addFormRef.resetFields();
            }
          // })
        } else {
          // 不符合规则
          this.$message({
            showClose: true,
            message: "请填写正确的信息",
            type: "error",
          });
        }
      });
    },
    cancel() {
      this.$refs.addFormRef.resetFields();
    },
  }
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
