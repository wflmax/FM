<!--首页-->
<template>
    <div class="big-data">
      <total></total>
      <timeDistribution></timeDistribution>
      <potentialDistribution></potentialDistribution>
      <flowDistribution></flowDistribution>
      <proportion></proportion>
    </div>
</template>
<script>
import total from "./components/total";
import proportion from "./components/proportion";
import timeDistribution from "./components/time-distribution";
import potentialDistribution from "./components/potential-distribution";
import flowDistribution from "./components/flow-distribution";
export default {
    components: {
        proportion,
        timeDistribution,
        potentialDistribution,
        flowDistribution,
        total
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

