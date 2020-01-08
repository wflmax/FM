<template>
    <!-- 航线覆盖情况 -->
    <div class="model-item" v-if="routes">
        <boxDecorate></boxDecorate>
        <div class="model-title flex flex-yc flex-between">
            航线覆盖情况
              <div class="flex flex-yc flex-between sub-title">
                <p>首航国内航线</p>
                <p>首航国际及港澳台航线</p>
            </div>
        </div>
        <div class="model-body flight-cover flex flex-yc flex-sa">
            <div class="item item-dom">
                <rateCircle class="area-chart" :color="mainColorA" :rate="[routes.domRoutesAllRate]"></rateCircle>
                <div class="text">
                    {{routes.domRoutesAllRate}}%
                    <span>理论占比</span>
                </div>
            </div>
            <div class="item item-dom">
                 <rateCircle class="area-chart" :color="mainColorA" :rate="[routes.domRoutesHistoryRate]"></rateCircle/>
                <div class="text">
                    {{routes.domRoutesHistoryRate}}%
                    <span>实际占比</span>
                </div>
            </div>
            <div class="item item-dom">
                <rateCircle class="area-chart" :color="mainColorB" :rate="[routes.intRoutesAllRate]"></rateCircle>
                <div class="text">
                    {{routes.intRoutesAllRate}}%
                    <span>理论占比</span>
                </div>
            </div>
            <div class="item item-dom">
                <rateCircle class="area-chart" :color="mainColorB" :rate="[routes.intRoutesHistoryRate]"></rateCircle>
                <div class="text">
                    {{routes.intRoutesHistoryRate}}%
                    <span>实际占比</span>
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
        routes: {
            type: Object
        }
    },
    components: {
        boxDecorate,
        rateCircle,
    }
};
//  $(window).resize(vue.draw());
</script>
<style lang="less" scoped>
.flight-cover {
    height: 12vh;
    .item {
        height: 7rem;
        width: 7rem;
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
             padding-top: 22%;
            vertical-align: middle;
            span {

                display: block;
                font-size: 1.166rem;
            }
        }
    }
}
</style>
