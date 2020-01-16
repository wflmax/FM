<template>
    <!-- 航线覆盖情况 -->
    <div class="model-item" v-if="passagers">
        <boxDecorate></boxDecorate>
         <div class="model-title flex flex-yc flex-between">
            旅客运输及航线占比
              <div class="flex flex-yc flex-between sub-title">
                <p>首航国内</p>
                <p>首航国际</p>
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
           <div class="item item-dom item-lg">
                <rateCircle class="area-chart" type = 1 :rate="[92.1,7.9]"></rateCircle>
                <div class="text">
                    {{routesAll}}
                    <span>航线总数</span>
                </div>
            </div>
        </div>
        <div class="tip">加密：<br>18条航线</div>
    </div>
</template>
<script>
import boxDecorate from "./box-decorate";
import rateCircle from "./rate-circle";

export default {
    data() {
        return {
            routesAll:151
        }
    },
    props: {
        passagers: {
            type: Object
        },
        routes:{
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
    height: 17vh;
    .item {
        height: 8rem;
        width: 8rem;
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
             font-size: 1.333rem;
            top: 0;
            left: 0;
            padding: 22% 12%;
            vertical-align: middle;
            span {

                display: block;
                font-size: 1rem;
            }
        }
    }
      .item-lg{
        width: 15rem;
        height:13rem;
            .text{
               padding-top: 30%;
        }
    }
}
.tip{
    font-size: 1.16rem;
    position: absolute;
    right: 1.16rem;
    bottom:1.16rem;
}
</style>
