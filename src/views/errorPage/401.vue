<template>
  <div class="error">
    <div id="main">
      <img class="png"
           src="@/assets/images/error/401.png">
      <img class="png msg"
           src="@/assets/images/error/401_msg.png">
    </div>
    <div id="cloud"
         class="png"></div>

  </div>
</template>

<script>
export default {
  name: 'page401',
  data() {
    return {};
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.error {
  background: url('~@/assets/images/error/error_bg.jpg') repeat-x scroll 0 0
    #67ace4;
  height: 100%;
  #main {
    margin: 0 auto;
    padding-top: 50px;
    text-align: center;
    width: 560px;
    img {
      border: medium none;
      margin-bottom: 50px;
    }
    .error {
      height: 200px;
      position: relative;
      img {
        bottom: -50px;
        position: absolute;
        right: -50px;
      }
    }
    .msg {
      margin-bottom: 65px;
    }
  }

  #cloud {
    background: url('~@/assets/images/error/error_cloud.png') repeat-x scroll 0
      0 transparent;
    bottom: 0;
    height: 170px;
    position: absolute;
    width: 100%;
  }
}
</style>
