<template>
  <!-- <el-upload
  class="upload-demo"
  drag
  :action="uploadUrl"
  :on-success="handleUploadSuccess" 
  :show-file-list="false"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip"></div>
  </el-upload> -->
  <el-upload class="upload-demo" drag :action="uploadUrl" :on-success="handleUploadSuccess" multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传xls/xlsx格式的文件</div>
  </el-upload>
</template>

<script>
export default {
  props:['drawer'],
  data() {
    return {
      uploadUrl: 'http://localhost:3001/upload'
    }
  },
  methods: {
    handleUploadSuccess(response) {
      console.log("上传成功");
      // 处理上传成功后的响应
      this.$message({
        showClose: true,
        message: "文件上传成功",
        type: "success",
      });
      setTimeout(()=>{
        this.$emit('fatherEvent',false)
      },1000)
    }
  }
}
</script>
<style scoped>
.upload-demo {
  margin-top: 20px;
  text-align: center;
}
</style>