<!--首页-->
<template>
    <div class="big-data">
      <img src="@/assets/img/hb-logo.png" class="logo"/>
      <total></total>
      <timeDistribution></timeDistribution>
      <potentialDistribution></potentialDistribution>
      <flowDistribution></flowDistribution>
      <proportion></proportion>
      <earth></earth>
    </div>
</template>
<script>
import total from './components/total';
import proportion from './components/proportion';
import timeDistribution from './components/time-distribution';
import earth from './components/earth';
import potentialDistribution from './components/potential-distribution';
import flowDistribution from './components/flow-distribution';
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
