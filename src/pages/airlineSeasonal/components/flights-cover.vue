<template>
    <!-- 航线覆盖情况 -->
    <div class="model-item" v-if="flights">
        <boxDecorate></boxDecorate>
        <div class="model-title flex flex-yc flex-between">
            航班覆盖情况
            <div class="flex flex-yc flex-between sub-title">
                <p>直飞</p>
                <p>经停</p>
            </div>
        </div>
        <div class="model-body flight-cover flex flex-yc flex-sa">
            <div class="item item-dom">
               <rateCircle class="area-chart" type=1 :rate="[flights.domDirectFlightsRate,flights.domStopFlightsRate]"></rateCircle>
                <div class="text">
                    {{flights.domFlightsCount}}
                    <span>国内总量</span>
                </div>
            </div>
            <div class="item item-dom">
               <rateCircle class="area-chart" type=1 :rate="[flights.intDirectFlightsRate,flights.intStopFlightsRate]"></rateCircle>
                <div class="text">
                    {{flights.intFlightsCount}}
                    <span>国际总量</span>
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
        flights: {
            type: Object
        }
    },
    components: {
        boxDecorate,
        rateCircle
    }
};
//  $(window).resize(vue.draw());
</script>
<style lang="less" scoped>
.flight-cover {
    height: 14vh;
    .item {
        height: 14vh;
        width: 19vh;
        position: absolute;
        left:12%;
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
            top: 10%;
            left: 0;
            padding-top: 20%;
            vertical-align: middle;
            span {
                display: block;
                font-size: 1.166rem;
            }
        }
        &:nth-child(2){
            left: auto;
            right: 12%;
        }
    }

}
</style>
