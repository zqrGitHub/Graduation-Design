<template>
  <div>
    <el-card>
      <div class="logo">
        <img src="../assets/img/1.jpg" alt="logo" />
        <h1>好好学习，天天向上</h1>
      </div>
      <!-- 轮播图 -->
      <el-carousel height="300px" type="card" :interval="2000">
        <el-carousel-item>
          <img src="../assets/img/11.jpg" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/img/background.jpg" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/img/12.jpg" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/img/13.jpg" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/img/20.jpg" alt />
        </el-carousel-item>
      </el-carousel>
      <h2 class="welcome">欢迎使用学生宿舍管理系统！</h2>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="css" scoped>
.el-carousel__item img {
  height: 100%;
  width: 100%;
}
.welcome {
  text-align: center;
  margin: 40px 0px;
}
.logo {
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
}
.logo img {
  height: 100%;
}
.logo h1 {
  display: inline-block;
  margin-left: 140px;
}
</style>