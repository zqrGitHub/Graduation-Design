<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>楼宇管理</el-breadcrumb-item>
      <el-breadcrumb-item>楼宇列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-form label-width="60px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="楼宇号">
              <el-select
                v-model="lynumber"
                placeholder="请选择"
                clearable
                @change="lynamechange"
                @clear="clear"
              >
                <el-option
                  v-for="item in lynamelist"
                  :key="item.id"
                  :label="item.lynumber"
                  :value="item.lynumber"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input
                v-model="userName"
                placeholder="请输入楼宇负责人姓名"
                clearable
                @clear="clear"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="search"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 下面的视图 -->
    <el-card>
      <el-row>
        <el-col :span="16">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
            >添加</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="lylist" stripe border height="315">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="楼宇号" prop="lynumber"></el-table-column>
        <el-table-column label="负责人" prop="lyleader"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="联系电话" prop="tel"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>

            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removelyInfoById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加楼宇负责人对话框 -->
      <el-dialog
        title="添加楼宇负责人"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="xiaoshi"
      >
        <!-- 内容主体区 -->
        <el-form
          :model="addForm"
          ref="addFormRef"
          :rules="addFormRules"
          label-width="80px"
        >
          <el-form-item label="楼宇号" prop="lynumber">
            <el-input v-model="addForm.lynumber" clearable=""></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="leader">
            <el-input v-model="addForm.leader" clearable=""></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="addForm.tel" clearable=""></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑负责人对话框 -->
      <el-dialog
        title="查看/编辑楼宇详细信息"
        :visible.sync="editdialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!-- 内容主体 -->
        <el-form
          :model="editForm"
          ref="editFormRef"
          :rules="editFormRules"
          label-width="120px"
        >
          <el-form-item label="楼宇号" prop="lynumber">
            <el-input v-model="editForm.lynumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="楼宇负责人" prop="lyleader">
            <el-input v-model="editForm.lyleader" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="editForm.sex" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="editForm.tel" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="comf">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  inject:["reload"],
  data() {
    var checkPhone = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的手机号"));
    };
    return {
      // 所有的楼宇负责人信息
      lylist: [],
      lynamelist: [],
      lynumber: "",
      userName: "",
      // 控制添加对话框的显示隐藏
      addDialogVisible: false,
      addForm: {
        lynumber: "",
        leader: "",
        sex: "",
        tel: "",
      },
      // 添加表单验证规则
      addFormRules: {
        lynumber: [
          { required: true, message: "请输入楼宇号", trigger: "blur" },
        ],
        leader: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
      // 编辑对话框的显示与隐藏
      editdialogVisible: false,
      editForm: {
        id: "",
        lynumber: "",
        lyleader: "",
        sex: "",
        tel: "",
      },
      // 编辑表单的验证规则对象
      editFormRules: {
        lyleader: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
    };
  },
  // 页面加载的时候就先拿到所有数据加载进入表格
  mounted() {
    // 发送请求拿到所有楼管数据
    this.axios.get("http://localhost:3001/getAll").then((res) => {
      this.lylist = res.data;
    });
    // 拿到所有楼栋的信息
    this.axios.get("http://localhost:3001/getAll/lyname").then((res1) => {
      this.lynamelist = res1.data;
    });
  },
  methods: {
    lynamechange() {
      // 拿到楼宇名字搜索
      this.axios
        .get(`http://localhost:3001/getAll/ly?lyname=${this.lynumber}`)
        .then((res2) => {
          this.lylist = res2.data;
        });
    },
    // 点击清除按钮调用加载全部数据
    clear() {
      // 刷新页面
      this.reload();
    },
    // 通过用户名搜索
    search() {
      this.axios
        .get(`http://localhost:3001/getAll/user?username=${this.userName}`)
        .then((res3) => {
          console.log(res3);
          this.lylist = res3.data;
        });
    },
    // 点击确定按钮添加信息
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        // console.log(valid);
        // 如果符合规则的表单发送请求
        if (valid) {
          let params = `lynumber=${this.addForm.lynumber}&leader=${this.addForm.leader}&sex=${this.addForm.sex}&tel=${this.addForm.tel}`;
          this.axios
            .post("http://localhost:3001/getAll/insert", params)
            .then((res) => {
              // console.log(res);
              if (res.data.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "添加楼宇信息成功",
                  type: "success",
                });
                this.addDialogVisible = false;
                // 刷新页面
                this.reload();
              }
            });
        }
      });
    },
    // 点击编辑按钮发送请求拿数据
    showEditDialog(user) {
      // console.log(user.id);
      this.editdialogVisible = true;
      this.axios
        .get(`http://localhost:3001/getsolo?userid=${user.id}`)
        .then((res) => {
          console.log(res);
          this.editForm = res.data[0];
        });
    },
    // 查看/编辑对话框中点取消按钮重置所有选择框
    addDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改数据发送请求
    comf() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          let params = `id=${this.editForm.id}&lyleader=${this.editForm.lyleader}&sex=${this.editForm.sex}&tel=${this.editForm.tel}`;
          this.axios
            .post("http://localhost:3001/getAll/modify", params)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: "信息修改成功",
                  type: "success",
                });
                this.editdialogVisible = false;
                this.reload();
              } else {
                this.$message({
                  showClose: true,
                  message: "信息修改失败",
                  type: "error",
                });
                this.editdialogVisible = false;
              }
            });
        }
      });
    },
    // 当添加框点取消，表单复原
    xiaoshi() {
      this.$refs.addFormRef.resetFields();
    },
    removelyInfoById(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求
          this.axios
            .post(`http://localhost:3001/getAll/delete?id=${id}`)
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
    },
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
  margin-left: 30px;
}
.el-table {
  margin-top: 10px;
}
</style>
