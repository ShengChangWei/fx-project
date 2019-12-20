<template>
  <div class="index-container">
    <div class="nav">
      <div class="nav-logo">
        <img src="@/assets/images/pc/header_logo.png"
             alt="">
      </div>
      <div class="nav-title">
        <img src="@/assets/images/pc/0.png"
             alt="">
        <span>
          <img src="@/assets/images/pc/header_title.png"
               alt="">
        </span>
        <img class="right-img"
             src="@/assets/images/pc/0.png"
             alt="">
      </div>
    </div>
    <div class="content clearfix">
      <div class="side">
        <el-scrollbar style="height: 100%">
          <side></side>
        </el-scrollbar>
      </div>
      <div class="main">
        <main-map></main-map>
      </div>
    </div>
  </div>
</template>

<script>
import side from './components/side.vue';
import mainMap from './components/main-map.vue';
export default {
  name: 'index',
  components: {
    side,
    mainMap
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  position: relative;
  height: 100%;
  width: 100%;
  color: #fff;
  .nav {
    height: 50px;
    background: url(~@/assets/images/pc/header_bg.png);
    line-height: 50px;
    text-align: center;
    position: relative;

    .nav-logo {
      position: absolute;
      left: 0;
    }
    .nav-title {
      font-size: 24px;
      .right-img {
        transform: rotate(180deg);
      }
    }
  }
  .content {
    height: calc(100% - 50px);
    background: url(~@/assets/images/pc/bg.jpg);

    .side {
      width: 440px;
      float: left;
      height: 100%;
    }
    .main {
      float: left;
      width: calc(100% - 440px);
      height: 100%;
    }
  }
}
</style>
