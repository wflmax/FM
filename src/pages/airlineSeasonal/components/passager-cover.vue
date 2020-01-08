<template>
    <!-- 航线覆盖情况 -->
    <div class="model-item" v-if="passagers">
        <boxDecorate></boxDecorate>
         <div class="model-title flex flex-yc flex-between">
            旅客运输情况
              <div class="flex flex-yc flex-between sub-title">
                <p>首航国内运输旅客</p>
                <p>首航国际运输旅客</p>
            </div>
        </div>
        <div class="model-body passagers-cover flex flex-yc flex-sa">
            <div class="item item-dom item-lg">
                <rateCircle class="area-chart" type = 1 :rate="[passagers.domPassagersRate,passagers.intPassagersRate]"></rateCircle>
                <div class="text">
                    {{passagers.passagersCount}}
                    <span>计划运输旅客</span>
                </div>
            </div>
            <div class="item item-dom">
                <rateCircle class="area-chart" :color="mainColorA" :rate="[passagers.domPassagersAllRate]"></rateCircle>
                <div class="text">
                    {{passagers.domPassagersAllRate}}%
                    <span>国内市场占比</span>
                </div>
            </div>
            <div class="item item-dom">
                <rateCircle class="area-chart" :color="mainColorB" :rate="[passagers.intPassagersAllRate]"></rateCircle>
                <div class="text">
                    {{passagers.intPassagersAllRate}}%
                    <span>国际市场占比</span>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import boxDecorate from "./box-decorate";
import rateCircle from "./rate-circle";

export default {
    props: {
        passagers: {
            type: Object
        }
    },
    components: {
        boxDecorate,
        rateCircle
    }
};
</script>
<style lang="less" scoped>
.passagers-cover {
    height: 15vh;

    .item {
        height: 7.5rem;
        width: 7.5rem;
        position: relative;
        .area-chart {
            width: 100%;
            height: 100%;
        }
        .text {
            position: absolute;
            height: 100%;
            width: 100%;
            text-align: center;
            color: #fff;
            font-size: 1.165rem;
            top: 0;
            left: 0;
            padding: 22% 12%;
            vertical-align: middle;
            span {

                display: block;
                font-size: 1.166rem;
            }
        }
    }
      .item-lg{
        width: 15rem;
        height: 12rem;
            .text{
               padding-top: 30%;
        }
    }
}
</style>
