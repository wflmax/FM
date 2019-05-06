<!--首页-->
<template>
    <div class="big-data">
      <proportion></proportion>
      <timeDistribution></timeDistribution>
      <potentialDistribution></potentialDistribution>
      <flowDistribution></flowDistribution>
    </div>
</template>
<script>
import proportion from "./components/proportion";
import timeDistribution from "./components/time-distribution";
import potentialDistribution from "./components/potential-distribution";
import flowDistribution from "./components/flow-distribution";
export default {
    components: {
        proportion,
        timeDistribution,
        potentialDistribution,
        flowDistribution
      },
    data() {
        return {

        };
    },

    mounted() {}
};
</script>
<style lang="less">
@import "./index.less";
</style>

