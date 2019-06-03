
<!--公共头部 默认-->
<template>
  <div class="header flex flex-yc">
    <div class="logo flex flex-yc ">
      <h1>
        <p href="/">
          <img src="@/assets/img/logo.png">
          <span class="sub rel">Air-rail Map</span>
        </p>
      </h1>
    </div>
    <div class="nav flex flex-yc flex-sa">
      <p class="flex flex-column flex-xc">
        <i class="iconfont iconfenxi"></i>分析
      </p>
      <p class="flex flex-column flex-xc " @click="feedBack()">
        <i class="iconfont iconfeedback"></i>反馈
      </p>
      <p class="flex flex-column flex-xc">
        <i class="iconfont iconhezuotuandui"></i>合作
      </p>
    </div>
  </div>
</template>
<script>
import Bus from '@/components/bus/bus'
export default {
  methods: {
    // 反馈事件
    feedBack () {
      Bus.$emit('feed-back', true)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  background: #fff;
  box-shadow: 0 3px 12px 1px rgba(234, 234, 234, 0.68);
  position: fixed;
  padding: 20px 0;
  z-index: 9;
  .logo {
    padding-left: 40px;
  }
  .sub {
    width: 211px;
    height: 34px;
    font-size: 35px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(170, 170, 170, 1);
    padding-left: 40px;
    &::before {
      content: "";
      position: absolute;
      left: 20px;
      width: 1px;
      height: 50px;
      top:0;
      background: rgb(204, 203, 203);
    }
  }
  .nav{
    color: #999;
    font-size: 16px;
    font-weight: 400;
    width: 50%;
    padding-left: 3 00px;
    i{display: inline-block;font-size:24px;margin-bottom:5px;}
  }
}
</style>
