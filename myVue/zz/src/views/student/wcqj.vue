<template>
  <div class="a">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假事宜</el-breadcrumb-item>
      <el-breadcrumb-item>外出请假</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <!-- 选择日期 -->
            <el-form-item label="请假日期" prop="date">
              <el-date-picker
                v-model="addForm.date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 选择时间 -->
            <el-form-item label="请假时间" prop="time">
              <el-time-picker
                v-model="addForm.time"
                value-format="HH-mm-ss"
                placeholder="请选择时间"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 选择返校日期 -->
        <el-row>
          <el-col :span="12">
            <!-- 选择日期 -->
            <el-form-item label="返校日期" prop="returndate">
              <el-date-picker
                v-model="addForm.returndate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                :picker-options="pickerOptionss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 选择时间 -->
            <el-form-item label="返校时间" prop="returntime">
              <el-time-picker
                v-model="addForm.returntime"
                value-format="HH-mm-ss"
                placeholder="请选择时间"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>


        <!-- 请假表单 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="请假人" prop="name">
              <el-input
                v-model="addForm.name"
                placeholder="请输入您的姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel">
              <el-input
                v-model="addForm.tel"
                placeholder="请输入您的联系电话"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="楼宇号" prop="lyNumber">
              <el-input
                v-model.number="addForm.lyNumber"
                placeholder="请输入您所在楼宇号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍号" prop="sushe">
              <el-input
                v-model.number="addForm.sushe"
                placeholder="请输入您的宿舍号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请假图片">
              <test :formdata="addForm" ref="child" urll="http://localhost:3001/wcqj"></test>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="请假缘由" prop="detail">
          <el-input
            v-model="addForm.detail"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8 }"
            placeholder="请描述具体请假情况"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 取消/添加报修按钮 -->
        <el-row type="flex" justify="end">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="addRepairs">确定</el-button>
        </el-row>
      </el-form>
      <p class="tishi" style="font-weight: bold;margin-bottom: 5px;">
        温馨提示：同学您好!如有紧急情况可以直接与老师联系
      </p>
      <p class="tishi" style="font-weight: bold;">
        如不影响正常学习生活，请填写以上申请表，我们会尽快审批您的请假信息，谢谢您的配合！
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
        // 请假的日期
        date: "",
        // 请假的时间
        time: "",
        // 返校的日期
        returndate: "",
        // 返校的时间
        returntime: "",
        detail: "",
      },
      // 报修规则
      addFormRules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        date: [{ required: true, message: "请选择请假日期", trigger: "blur" }],
        time: [{ required: true, message: "请选择请假时间", trigger: "blur" }],
        returndate: [{ required: true, message: "请选择返校日期", trigger: "blur" }],
        returntime: [{ required: true, message: "请选择返校时间", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入您的联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        lyNumber: [
          { required: true, message: "请填写您所在楼宇号", trigger: "blur" },
          { type: 'number', message: '楼宇号必须为数字值'},
        ],
        sushe: [
          { required: true, message: "请填写您所在的宿舍号", trigger: "blur" },
          { type: 'number', message: '宿舍号必须为数字值'}
        ],
        detail: [
          { required: true, message: "请填写请假详情", trigger: "blur" },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      pickerOptionss: {
        disabledDate(times) {
          return times.getTime() > Date.now();
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
            if(res.data.code == 200){
              this.$message({
                showClose: true,
                message: "请假信息提交成功",
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
    cancel(){
      this.$refs.addFormRef.resetFields();
    }
  },
  }
</script>

<style scoped>
  .el-breadcrumb {
  margin-left: 10px;
  font-size: 15px;
}
.el-card {
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important; */
  margin-top: 20px;
}
</style>