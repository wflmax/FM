<template>
    <!-- 占比 -->
    <div class="proportion-warp flex">
        <div class="proportion-flight proportion-box">
            <h4 class="title">机型占比</h4>
            <!-- <div class="proportion-body flex">
                <div class="proportion-tag">
                    <p class="font-nun">
                        <span class="a">A380</span> 20%
                    </p>
                    <p class="font-nun">
                        <span class="d">A380</span> 20%
                    </p>
                </div>
                <div class="proportion-circle"></div>
                <div class="proportion-tag">
                    <p class="font-nun">
                        <span class="b">A380</span> 20%
                    </p>
                    <p class="font-nun">
                        <span class="c">A380</span> 20%
                    </p>
                </div>
            </div>-->
            <v-chart :options="optionFlight" class="flight-chart"/>
        </div>
        <div class="proportion-subway proportion-box">
            <h4 class="title">车型占比</h4>
            <div class="proportion-body flex">
                <div class="proportion-tag">
                    <p class="font-nun">
                        <span class="a">CRH380B</span> 20%
                    </p>
                    <p class="font-nun">
                        <span class="b">CRH380B</span> 20%
                    </p>
                </div>
                <div class="proportion-circle"></div>
                <div class="proportion-tag">
                    <p class="font-nun">
                        <span class="c">CRH380B</span> 20%
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";

export default {
    components: {
        "v-chart": ECharts
    },
    data() {
        return {
            optionFlight: {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: [
                        "CHR1A统型",
                        "CHR2A统型",
                        "CHR2A1统型",
                        "CHR22A统型",
                        "CHR3A统型",
                        "CHR4A统型",
                        "CHR5A统型",
                        "CHR6A统型",
                        "其他"
                    ]
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["40%", "55%"],
                        label: {
                            normal: {
                                // formatter:function(params){
                                //   console.log(params)
                                //   var html= '<p class="font-nun"><span class="b">'+params.name+'</span> 20%</p>';
                                //   return html;
                                // },
                                formatter: "{b|{b}}\n {per|{d}%}  ",
                                // shadowBlur:3,
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 2,
                                // shadowColor: '#999',
                                // padding: [0, 7],
                                rich: {
                                    b: {
                                        fontSize: 14,
                                        lineHeight: 33,
                                        color: "#fff",
                                        borderRadius: 2,
                                        padding: [2, 15],
                                        backgroundColor: "#334455"
                                    },
                                    per: {
                                        color: "#eee"
                                    }
                                }
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 535, name: "CHR1A统型" },
                            { value: 310, name: "CHR2A统型" },
                            { value: 234, name: "CHR2A1统型" },
                            { value: 135, name: "CHR22A统型" },
                            { value: 1048, name: "CHR3A统型" },
                            { value: 251, name: "CHR4A统型" },
                            { value: 147, name: "CHR5A统型" },
                            { value: 147, name: "CHR6A统型" },
                            { value: 102, name: "其他" }
                        ]
                    }
                ]
            }
        };
    },
    props: {},
    mounted() {}
};
</script>

