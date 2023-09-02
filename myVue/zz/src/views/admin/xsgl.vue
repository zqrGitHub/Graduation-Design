<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-form label-width="60px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学号">
              <el-input v-model="topdata.snumber" placeholder="请输入学生学号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="topdata.sname" placeholder="请输入学生姓名" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="宿舍号">
              <el-input v-model="topdata.susheid" placeholder="请输入宿舍号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="楼宇">
              <el-input v-model="topdata.lynumber" placeholder="请输入楼宇号" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="学院">
              <el-input v-model="topdata.xueyuan" placeholder="请输入学院" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="班级">
              <el-input v-model="topdata.banji" placeholder="请输入班级名字" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">添加</el-button>
          </el-col>
          <el-col :span="3">
            <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
              上传文件
            </el-button>
            <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
              <up-load :drawer="drawer" @fatherEvent="changeDrawer"></up-load>
            </el-drawer>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="exportData">
              导出所有学生
            </el-button>
          </el-col>
        </el-row>
      </el-form>

      <!-- 添加用户的对话框 -->
      <el-dialog title="添加学生" :visible.sync="addDialogVisible" width="50%" @close="$refs.addFormRef.resetFields()">
        <!-- 内容主体区 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
          <el-form-item label="姓名" prop="sname">
            <el-input v-model="addForm.sname"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="stelphone">
            <el-input v-model="addForm.stelphone"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" prop="saddress">
            <el-input v-model="addForm.saddress"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="snumber">
            <el-input v-model="addForm.snumber"></el-input>
          </el-form-item>
          <el-form-item label="初始密码" prop="spassword">
            <el-input v-model="addForm.spassword" disabled></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="xueyuan">
            <el-input v-model="addForm.xueyuan"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="banji">
            <el-input v-model="addForm.banji"></el-input>
          </el-form-item>
          <el-form-item label="楼宇号" prop="lynumber">
            <el-input v-model="addForm.lynumber"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号" prop="susheid">
            <el-input v-model="addForm.susheid"></el-input>
          </el-form-item>
          <el-form-item label="辅导员" prop="fudaoyuan">
            <el-input v-model="addForm.fudaoyuan"></el-input>
          </el-form-item>
          <el-form-item label="辅导员电话" prop="dudaoyuantel">
            <el-input v-model="addForm.dudaoyuantel"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人" prop="family">
            <el-input v-model="addForm.family"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话" prop="familytel">
            <el-input v-model="addForm.familytel"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertUser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

    <el-card>
      <!-- 列表数据 -->
      <el-table :data="studentlist" stripe border height="310">
        <el-table-column type="index" width="40px"></el-table-column>
        <el-table-column label="姓名" prop="sname"></el-table-column>
        <el-table-column label="学号" prop="snumber"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="联系电话" prop="stelphone"></el-table-column>
        <el-table-column label="学院" prop="xueyuan"></el-table-column>
        <el-table-column label="班级" prop="banji"></el-table-column>
        <el-table-column label="楼宇号" prop="lynumber"></el-table-column>
        <el-table-column label="宿舍号" prop="susheid"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-tooltip effect="dark" content="查看/编辑学生详细信息" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看/编辑对话框 -->

      <el-dialog title="查看/编辑学生详细信息" :visible.sync="viewdialogVisible" width="90%"
        @close="$refs.viewFormRef.resetFields()">
        <!-- 内容主体 -->
        <el-form :model="viewForm" ref="viewFormRef" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="学号" prop="snumber">
                <el-input v-model="viewForm.snumber" disabled></el-input>
              </el-form-item>
              <el-form-item label="学院" prop="xueyuan">
                <el-input v-model="viewForm.xueyuan" clearable></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="stelphone">
                <el-input v-model="viewForm.stelphone" clearable></el-input>
              </el-form-item>
              <el-form-item label="辅导员电话" prop="dudaoyuantel">
                <el-input v-model="viewForm.dudaoyuantel" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名" prop="sname">
                <el-input v-model="viewForm.sname" disabled></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="banji">
                <el-input v-model="viewForm.banji" clearable></el-input>
              </el-form-item>
              <el-form-item label="紧急联系人" prop="family">
                <el-input v-model="viewForm.family" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别" prop="sex">
                <el-input v-model="viewForm.sex" disabled></el-input>
              </el-form-item>
              <el-form-item label="所在楼宇" prop="lynumber">
                <el-input v-model="viewForm.lynumber" clearable></el-input>
              </el-form-item>
              <el-form-item label="紧急联系人电话" prop="familytel">
                <el-input v-model="viewForm.familytel" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="密码" prop="spassword">
                <el-input type="password" v-model="viewForm.spassword" show-password></el-input>
              </el-form-item>
              <el-form-item label="所在宿舍" prop="susheid">
                <el-input v-model="viewForm.susheid" clearable></el-input>
              </el-form-item>
              <el-form-item label="辅导员" prop="fudaoyuan">
                <el-input v-model="viewForm.fudaoyuan" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="adduser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import UpLoad from '../../components/UpLoad.vue';
import ExcelJS from 'exceljs';
export default {
  components: { UpLoad },
  inject: ["reload"],
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
      drawer: false,
      studentlist: [],
      // 查看/编辑相关属性
      viewdialogVisible: false,
      viewForm: {
        snumber: "",
        sname: "",
        name: "",
        sex: "",
        stelphone: "",
        susheid: "",
        xueyuan: "",
        banji: "",
        lynumber: "",
        fudaoyuan: "",
        dudaoyuantel: "",
        family: "",
        familytel: "",
        spassword: "",
      },
      // 修改的规则
      rules: {
        xueyuan: [{ required: true, message: "请输入学院", trigger: "blur" }],
        stelphone: [
          { required: true, message: "请选择用户角色", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        dudaoyuantel: [
          { required: true, message: "请输入正确的电话号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        banji: [{ required: true, message: "请输入班级", trigger: "blur" }],
        family: [
          { required: true, message: "请输入紧急联系人", trigger: "blur" },
        ],
        lynumber: [
          { required: true, message: "请输入楼宇号", trigger: "blur" },
        ],
        familytel: [
          { required: true, message: "请输入正确的电话号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        spassword: [
          { required: true, message: "请输入6位密码", trigger: "blur" },
        ],
        susheid: [{ required: true, message: "请输入宿舍号", trigger: "blur" }],
        fudaoyuan: [
          { required: true, message: "请输入辅导员名字", trigger: "blur" },
        ],
      },
      // 添加学生相关属性
      addDialogVisible: false,
      addForm: {
        snumber: "",
        sname: "",
        sex: "",
        stelphone: "",
        susheid: "",
        xueyuan: "",
        banji: "",
        lynumber: "",
        fudaoyuan: "",
        dudaoyuantel: "",
        family: "",
        familytel: "",
        spassword: "123456",
        saddress: '',
      },
      // 添加学生属性的规则
      addFormRules: {
        xueyuan: [{ required: true, message: "请输入学院", trigger: "blur" }],
        stelphone: [
          { required: true, message: "请选择用户角色", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        dudaoyuantel: [
          { required: true, message: "请输入正确的电话号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        banji: [{ required: true, message: "请输入班级", trigger: "blur" }],
        family: [
          { required: true, message: "请输入紧急联系人", trigger: "blur" },
        ],
        lynumber: [
          { required: true, message: "请输入楼宇号", trigger: "blur" },
        ],
        familytel: [
          { required: true, message: "请输入正确的电话号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        spassword: [
          { required: true, message: "请输入6位密码", trigger: "blur" },
        ],
        susheid: [{ required: true, message: "请输入宿舍号", trigger: "blur" }],
        fudaoyuan: [
          { required: true, message: "请输入辅导员名字", trigger: "blur" },
        ],
        sname: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: "blur" },
        ],
        snumber: [
          { required: true, message: "请输入学号", trigger: "blur" },
        ],
        saddress: [
          { required: true, message: "请输入家庭住址", trigger: "blur" },
        ],
      },
      // 存储最上方条件筛选框数据
      topdata: {
        snumber: "",
        sname: "",
        susheid: "",
        lynumber: "",
        xueyuan: "",
        banji: "",
      },
    };
  },
  watch: {
    topdata: {
      handler(val) {
        this.mutiSearch();
      },
      deep: true,
    },
  },
  // 挂载加载所有数据
  mounted() {
    this.axios.get("http://localhost:3001/allStudent").then((res) => {
      res.data.forEach((element) => {
        element.sex = element.sex == "1" ? "男" : "女";
      });
      this.studentlist = res.data;
    });
  },
  methods: {
    // 点击编辑查看按钮时获取单一学生的信息
    showEditDialog(user) {
      let userid = user.id;
      this.viewdialogVisible = true;
      this.axios
        .get(`http://localhost:3001/getStudentSolo?userid=${userid}`)
        .then((res) => {
          console.log(res.data);
          res.data.forEach((e) => {
            e.sex = e.sex == "1" ? "男" : "女";
          });
          this.viewForm = res.data[0];
        });
    },
    adduser() {
      this.$refs.viewFormRef.validate((valid) => {
        if (valid) {
          let params = `snumber=${this.viewForm.snumber}&xueyuan=${this.viewForm.xueyuan}&stelphone=${this.viewForm.stelphone}&dudaoyuantel=${this.viewForm.dudaoyuantel}&banji=${this.viewForm.banji}&family=${this.viewForm.family}&lynumber=${this.viewForm.lynumber}&familytel=${this.viewForm.familytel}&spassword=${this.viewForm.spassword}&susheid=${this.viewForm.susheid}&fudaoyuan=${this.viewForm.fudaoyuan}`;
          this.axios
            .post("http://localhost:3001/getAll/xslb/modify", params)
            .then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: "信息修改成功",
                  type: "success",
                });
                this.viewdialogVisible = false;
                this.reload();
              } else {
                this.$message({
                  showClose: true,
                  message: "信息修改失败",
                  type: "error",
                });
                this.viewdialogVisible = false;
              }
            });
        }
      });
    },
    cancel() {
      this.viewdialogVisible = false;
      this.$refs.viewFormRef.resetFields();
    },
    // 删除对应的学生
    removeUserById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求
          this.axios
            .post(`http://localhost:3001/getAllxslb/delete?id=${id}`)
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
    // 多条件查询
    mutiSearch() {
      let params = `snumber=${this.topdata.snumber}&sname=${this.topdata.sname}&susheid=${this.topdata.susheid}&lynumber=${this.topdata.lynumber}&xueyuan=${this.topdata.xueyuan}&banji=${this.topdata.banji}`;
      this.axios
        .post("http://localhost:3001/getAllxslb/mutisearch", params)
        .then((res) => {
          res.data.forEach((element) => {
            element.sex = element.sex == "1" ? "男" : "女";
          });
          this.studentlist = res.data;
        });
    },
    insertUser() {
      this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          let params = `snumber=${this.addForm.snumber}&sname=${this.addForm.sname}&sex=${this.addForm.sex}&stelphone=${this.addForm.stelphone}&susheid=${this.addForm.susheid}&xueyuan=${this.addForm.xueyuan}&banji=${this.addForm.banji}&lynumber=${this.addForm.lynumber}&fudaoyuan=${this.addForm.fudaoyuan}&dudaoyuantel=${this.addForm.dudaoyuantel}&family=${this.addForm.family}&familytel=${this.addForm.familytel}&spassword=${this.addForm.spassword}&saddress=${this.addForm.saddress}`;
          this.axios.post('http://localhost:3001/getAll/xsgl/insert', params).then(res => {
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
    changeDrawer(value) {
      this.drawer = value
      this.reload()
    },
    exportData() {
      // 发送请求获取数据
      this.axios.get("http://localhost:3001/api/data")
        .then(res => {
          console.log(res);
          const data = res.data
          // 创建一个新的工作簿
          const workbook = new ExcelJS.Workbook()
          // 创建一个新的工作表
          const worksheet = workbook.addWorksheet('Data')
          // 添加标题行
          worksheet.addRow(['序号', '学号',"姓名","密码","性别","联系方式","住址","寝室号","辅导员","辅导员联系方式","床位号","学院","楼宇号","班级","紧急联系人","紧急联系人电话","状态"]);
          // 将数据写入工作表
          worksheet.addRows(data)
          // 将工作簿转换为二进制数据流
          return workbook.xlsx.writeBuffer()
        })
        .then(buffer => {
          // 将数据流转换为Blob对象
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          // 创建一个下载链接并点击下载
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = '学生表.xlsx'
          link.click()
        })
        .catch(error => {
          console.error(error)
        })
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

.el-button {
  margin-left: 30px;
}
</style>
