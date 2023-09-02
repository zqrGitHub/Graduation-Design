<template>
  <div>
    <el-upload :action="url" list-type="picture-card" :auto-upload="false" ref="upload"
      :data="formdata">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- <button @click="submitUpload">上传</button> -->
  </div>
</template>
<script>
export default {
  props: ["formdata","urll"],
  data() {
    return {
      url:this.urll,
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.uploadFiles; // 获取上传文件列表
      const index = fileList.indexOf(file); // 获取要删除的文件的索引
      fileList.splice(index, 1); // 从上传文件列表中移除该文件
    },
    submitUpload(file) {
      this.$refs.upload.submit();
      const fileList = this.$refs.upload.uploadFiles
      for (let i = 0; i < fileList.length; i++) {
        this.handleRemove(file)
      }
      this.$message({
        showClose: true,
        message: "添加报修成功",
        type: "success"
      });
    }
  }
}
</script>