<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户权限</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input
            placeholder="请输入姓名"
            v-model="queryInfo.query"
            clearable
            @clear="clear"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search(queryInfo.query)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 弹出对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%"
      @close="cancel">
        <!-- 内容主体区 -->
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="80px"
        >
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="addForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="addForm.telephone"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="addForm.role" placeholder="请选择角色">
              <el-option label="管理员" value="0"></el-option>
              <el-option label="普通用户" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="adduser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 表格数据区域 -->
      <el-table :data="userlist" stripe border height="420">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="联系电话" prop="tel"></el-table-column>
        <el-table-column
          label="角色"
          prop="role"
        ></el-table-column>
        <el-table-column label="操作" id="cz">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              effect="dark"
              content="修改"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
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
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改用户信息的对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editdialogVisible"
        width="50%"
        @close="$refs.editFormRef.resetFields()"
      >
        <!-- 内容主体 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
          <el-form-item label="姓名" prop="">
            <el-input v-model="editForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="editForm.tel" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="editForm.role" placeholder="请选择角色">
              <el-option label="管理员" value="0"></el-option>
              <el-option label="普通用户" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  inject:['reload'],
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
      // 打开对话框
      addDialogVisible: false,
      // 打开修改对话框
      editdialogVisible:false,
      queryInfo: {
        query: "",
      },
      // 所有用户
      userlist: [],
      // 添加用户的表单数据
      addForm: {
        userName: "",
        sex: "",
        telephone: "",
        role: "",
      },
      // 为添加用户添加规则
      addFormRules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        role: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
      },
      // 修改用户的表单数据
      editForm: {
        id:'',
        name: "",
        tel: "",
        role: "",
      },
      // 修改的规则
      editFormRules: {
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择用户角色", trigger: "blur" }]
      },
    };
  },
  // 页面挂载加载数据
  mounted() {
    this.axios.get("http://localhost:3001/getAll/yhqx").then((res) => {
      res.data.forEach((element) => {
        element.role = element.role == "1" ? "普通用户" : "管理员";
      });
      this.userlist = res.data;
    });
  },
  methods: {
    search(name) {
      this.axios
        .get(`http://localhost:3001/getAll/yhqx/solo?name=${name}`)
        .then((res) => {
          res.data.forEach((element) => {
            element.role = element.role == "1" ? "普通用户" : "管理员";
          });
          this.userlist = res.data;
        });
    },
    clear() {
      this.axios.get("http://localhost:3001/getAll/yhqx").then((res) => {
        res.data.forEach((element) => {
          element.role = element.role == "1" ? "普通用户" : "管理员";
        });
        this.userlist = res.data;
      });
    },
    adduser() {
      this.$refs.addFormRef.validate((valid) => {
        if(valid){
          let params = `username=${this.addForm.userName}&sex=${this.addForm.sex}&tel=${this.addForm.telephone}&role=${this.addForm.role}`;
          this.axios.post('http://localhost:3001/getAll/yhqx/insert',params).then(res=>{
            if (res.data.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "用户信息成功",
                  type: "success",
                });
                this.addDialogVisible = false;
                // 刷新页面
                this.reload();
              }
          })
        }
      })
    },
    // 点击取消按钮的时候
    cancel(){
      this.addDialogVisible = false;
      this.$refs.addFormRef.resetFields();
    },
    showEditDialog(user){
      this.editdialogVisible = true;
      this.axios
        .get(`http://localhost:3001/getyhqxsolo?userid=${user.id}`)
        .then((res) => {
          console.log(res);
          this.editForm = res.data[0];
 
        });
    },
    // 编辑按钮
    editUserInfo(){
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          let params = `tel=${this.editForm.tel}&role=${this.editForm.role}&id=${this.editForm.id}`;
          this.axios
            .post("http://localhost:3001/getAll/yhqx/modify", params)
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
    removeUserById(id){
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求
          this.axios
            .post(`http://localhost:3001/getAllyhqx/delete?id=${id}`)
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
.el-table {
  margin-top: 10px;
}
</style>
