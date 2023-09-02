<template>
  <div>
    <el-result icon="warning" title="您的页面走丢了" subTitle="点击下方按钮返回主页">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="$router.push('/home')">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
  export default {
    mounted () {
      console.log(this.$router);
    },
  }
</script>

<style lang="scss" scoped>

</style>