<template>
  <div class="loading-box">
    <div class="mask" style="z-index:999"></div>
    <div class="loading">
      <img class="loading-pic" src="../../image/loadingGIF.gif"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  mounted() {}
};
</script>
<style scoped>

.loading {
  position: fixed;
  width: 100%;
  top: 30%;
  height: auto;
  text-align: center;
   z-index: 1000;

}

p {
  font-size: 1.1rem;
  color: #333;
  margin-top: 1rem;
  font-weight: bold;
}
.loading .loading-pic {
  max-width: 14rem;
  height: auto;
  margin: 0 auto;
  background: #fff;
  border-radius: 1rem;
}
</style>
