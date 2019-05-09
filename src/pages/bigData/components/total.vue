<template>
    <!-- 总体信息 -->
    <div class="total-warp">
        <h4 class="title">
            空铁联运总体信息
            <span class="sub">空铁联运可达城市</span>
            <span class="num font-nun">3456</span>
            <i class="iconfont iconqushi"></i>
        </h4>
        <v-chart :options="optionflight" class="flight-chart"/>
    </div>
</template>

<script>
import data from "./../data";
import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts/lib/chart/radar";
export default {
    components: {
        "v-chart": ECharts
    },
    data() {
        return {
            optionflight: {
                color: ["#DB4BC1"],
                radar: [
                    {
                        indicator: [
                            {
                                text: "互通航班城市",
                                max: 300
                            },
                            {
                                text: "承运航司量",
                                max: 300
                            },
                            {
                                text: "航班线路总量",
                                max: 300
                            },
                            {
                                text: "承运航班总量",
                                max: 100
                            },
                            {
                                text: "飞机制造商",
                                max: 300
                            }
                        ],
                        textStyle: {
                            color: "red"
                        },
                        center: ["50%", "50%"],
                        radius: "65%",
                        startAngle: 90,
                        splitNumber: 2,
                        shape: "polygon",
                        name: {
                            formatter: "{value}",
                            textStyle: {
                                fontSize: 14,
                                color: "#ffffff",
                                backgroundColor:'rgba(206, 76, 229, 1)',
                                padding: [6, 8, 5, 8],
                                borderRadius:3
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: [
                                    "transparent",
                                    "transparent)",
                                    "rgba(114, 172, 209, 0)",
                                    "transparent",
                                    "rgba(114, 172, 209, 0)"
                                ]
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(249,74,111,.34)"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(249,74,111,.34)"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "雷达图",
                        type: "radar",
                        itemStyle: {
                            emphasis: {
                                lineStyle: {
                                    width: 4
                                }
                            }
                        },
                        data: [
                            {
                                name: "飞机",
                                value: [234, 30, 120, 50, 150],
                                areaStyle: {
                                    normal: {
                                        color: new ECharts.graphic.LinearGradient(
                                            0,
                                            0,
                                            1,
                                            0,
                                            [
                                                {
                                                    offset: 0,
                                                    color:
                                                        "rgba(249, 74, 111, 1)"
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        "rgba(206, 76, 229, 1)"
                                                }
                                            ],
                                            false
                                        )
                                    }
                                },
                                symbolSize: 2.5,
                                itemStyle: {
                                    normal: {
                                        borderColor: new ECharts.graphic.LinearGradient(
                                            0,
                                            0,
                                            1,
                                            0,
                                            [
                                                {
                                                    offset: 0,
                                                    color:
                                                        "rgba(249, 74, 111, 1)"
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        "rgba(206, 76, 229, 1)"
                                                }
                                            ],
                                            false
                                        ),
                                        borderWidth: 2.5,
                                        shadowBlur:20,
                                        shadowColor: "rgba(206, 76, 229, .3)"
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        opacity: 0.5
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        };
    },
    props: {},
    mounted() {},
    methods: {}
};
</script>

