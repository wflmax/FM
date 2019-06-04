<!--首页-->
<template>
    <div class="big-data">
      <div class="logo-container">
        <img src="@/assets/img/hb-logo.png" class="logo"/>
      </div>
      <!-- 左半边 -->
      <div class="chart-container-left box-fl">
        <total></total>
        <timeDistribution></timeDistribution>
        <potentialDistribution></potentialDistribution>
      </div>
      <!-- 右半边 -->
      <div class="chart-container-right box-fr">
        <flowDistribution></flowDistribution>
        <proportion></proportion>
      </div>
      <earth></earth>
    </div>
</template>
<script>
import total from './components/total'
import proportion from './components/proportion'
import timeDistribution from './components/time-distribution'
import earth from './components/earth'
import potentialDistribution from './components/potential-distribution'
import flowDistribution from './components/flow-distribution'
export default {
  components: {
    proportion,
    timeDistribution,
    potentialDistribution,
    flowDistribution,
    total,
    earth
  },
  data () {
    return {

    }
  },

  mounted () {}
}
</script>
<style lang="less">
@import "./index.less";
</style>
