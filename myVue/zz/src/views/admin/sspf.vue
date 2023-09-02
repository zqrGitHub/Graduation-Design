<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计中心</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍评分</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <!-- 查找板块 -->
      <el-form :model="searchForm" ref="addFormRef" label-width="60px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="楼宇号" prop="lynumber">
              <el-input
                v-model="searchForm.lynumber"
                placeholder="请输入楼宇号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="宿舍号" prop="susheid">
              <el-input
                v-model="searchForm.susheid"
                placeholder="请输入宿舍号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学院" prop="xuyuan">
              <el-input
                v-model="searchForm.xuyuan"
                placeholder="请输入学院名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="班级" prop="banji">
              <el-input
                v-model="searchForm.banji"
                placeholder="请输入班级名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="数据表展示">
          <!-- 数据列表 -->
          <el-table :data="datalist" stripe border height="380px">
            <el-table-column label="楼宇号" prop="lynumber"></el-table-column>
            <el-table-column label="宿舍号" prop="susheid"></el-table-column>
            <el-table-column label="学院" prop="xuyuan"></el-table-column>
            <el-table-column label="班级" prop="banji"></el-table-column>
            <el-table-column
              label="卫生（分）"
              prop="weisheng"
              sortable
            ></el-table-column>
            <el-table-column label="纪律（分）" sortable prop="jilv"></el-table-column>
            <el-table-column
              label="宿舍文化（分）"
              prop="wenhua"
              sortable
            ></el-table-column>
            <el-table-column label="总分（分）" sortable prop="total"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination> -->
        </el-tab-pane>
        <el-tab-pane label="统计图展示" name="second">
          <!-- 数据统计图 -->
          <div id="myChart">
            <div ref="left" style="width: 900px; height: 400px"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        lynumber: "",
        susheid: "",
        xuyuan: "",
        banji: "",
      },
      datalist: [],
      susheid: [],
      weisheng: [],
      jilv: [],
      wenhua: [],
      activeName: "second",
    };
  },
  watch: {
    searchForm:{
      handler(val){
        this.mutiSearch();
      },
      deep:true,
    }
  },
  mounted() {
    this.axios.get("http://localhost:3001/getAllsspf").then((res) => {
      console.log(res.data);
      this.datalist = res.data.data;
      this.susheid = res.data.sshpf;
      this.weisheng = res.data.weisheng;
      this.jilv = res.data.jilv;
      this.wenhua = res.data.wenhua;
      // 渲染必须放里面
      this.drawColumn();
    });
  },
  methods: {
    drawColumn() {
      // 大坑这么用必须
      let left = this.$echarts.init(this.$refs.left);
      var option = {
        title: {
          text: "宿舍评分各项数据统计图",
          left: "center",
          top: "auto"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["卫生", "纪律", "文化"],
          top: "30px"
        },
        xAxis: [
          {
            type: "category",
            // name: "宿舍号",
            data: this.susheid,
            axisPointer: {
              type: "shadow"
            },
          }
        ],
        yAxis: [
          {
            type: "value",
            // name: "卫生",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value} 分"
            }
          },
          {
            type: "value",
            name: "纪律",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: "{value} 分"
            }
          },
        ],
        series: [
          {
            name: "卫生",
            type: "bar",
            data: this.weisheng
          },
          {
            name: "纪律",
            type: "bar",
            data: this.jilv
          },
          {
            name: "文化",
            type: "line",
            yAxisIndex: 1,
            data: this.wenhua
          }
        ]
      };
      left.setOption(option);
    },
    mutiSearch(){
      let params = `lynumber=${this.searchForm.lynumber}&susheid=${this.searchForm.susheid}&xueyuan=${this.searchForm.xuyuan}&banji=${this.searchForm.banji}`;
      this.axios.post('http://localhost:3001/getAllsspf/mutisearch',params).then(res=>{
        this.datalist = res.data;
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
</style>
