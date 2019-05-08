<template>
    <!-- 出行时刻分布 -->
    <div class="time-warp">
        <h4 class="title">0-24点出行时刻分布</h4>
        <v-chart :options="option" class="time-chart"/>
        <div class="lengs flex">
          <p>航班量（架次）</p>
          <p>高铁量（班次）</p>
        </div>
        <div class="other-info flex flex-yc">
          <div class="flex flex-yc">
             <i class="iconfont iconhangban"></i>
             <p>总体出港航班量<span><b>105</b>架次</span></p>
          </div>
          <div class="flex flex-yc">
             <i class="iconfont iconhangban"></i>
             <p>总体出港航班量<span><b>105</b>架次</span></p>
          </div>
          <div class="flex flex-yc">
             <i class="iconfont iconhangban"></i>
             <p>总体出港航班量<span><b>105</b>架次</span></p>
          </div>
        </div>
        <div class="other-info flex flex-yc">
          <div class="flex flex-yc">
             <i class="iconfont iconhangban"></i>
             <p>总体出港航班量<span><b>105</b>架次</span></p>
          </div>
          <div class="flex flex-yc">
             <i class="iconfont iconhangban"></i>
             <p>总体出港航班量<span><b>105</b>架次</span></p>
          </div>
          <div class="flex flex-yc">
             <i class="iconfont iconhangban"></i>
             <p>总体出港航班量<span><b>105</b>架次</span></p>
          </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import data from "./../data";
export default {
    components: {
        "v-chart": ECharts
    },
    data() {
        return {
            option: {
                grid: {
                    left: "0",
                    right: "0",
                    top:'2%',
                    bottom: "10%",
                    containLabel: true
                },

                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "transparent"
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#363e83 "
                        }
                    },
                     axisLabel: {
                            inside: false,
                            textStyle: {
                                color: "#fff",
                                fontWeight: "normal",
                                fontSize: "12"
                            }
                        },
                },
                xAxis: [
                    {
                        type: "category",
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "transparent"
                            }
                        },
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: "#fff",
                                fontWeight: "normal",
                                fontSize: "12"
                            }
                        },
                        data: ["0-2", "2-4","4-6", "6-8","8-10", "10-12","12-14", "14-16","16-18", "18-20","20-22", "22-24"]
                    },
                    {
                        type: "category",
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: ["0-2", "2-4","4-6", "6-8","8-10", "10-12","12-14", "14-16","16-18", "18-20","20-22", "22-24"]
                    }
                ],
                series: [
                    {
                        type: "bar",
                        xAxisIndex: 1,
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                color: "rgba(255,255,255,0.31)",
                                borderWidth: 0,
                                barBorderRadius: 50,
                            }
                        },
                        barWidth: "8%",
                        data: [100, 100,100,100,100,100,100,100,100,100,100,100]
                    },
                    {
                        type: "bar",
                        xAxisIndex: 1,
                        barGap: "100%",
                        data: [100, 100,100,100,100,100,100,100,100,100,100,100],
                        zlevel: 1,
                        barWidth: "8%",
                        itemStyle: {
                            normal: {
                                 color: "rgba(255,255,255,0.31)",
                                borderWidth: 0,
                                barBorderRadius: 50,
                            }
                        }
                    },
                    {
                        name: "男",
                        type: "bar",
                        itemStyle: {
                            normal: {
                                show: true,
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#40C3D1"
                                        },
                                        {
                                            offset: 1,
                                            color: "#1767F2"
                                        }
                                    ]
                                ),
                                barBorderRadius: 50,
                                borderWidth: 0
                            }
                        },
                        zlevel: 2,
                        barWidth: "8%",
                        data: [8, 15,8, 15,8, 15,8, 15, 8, 15,88, 45]
                    },
                    {
                        name: "女",
                        type: "bar",
                        barWidth: "8%",
                        itemStyle: {
                            normal: {
                                show: true,
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#F94A6F"
                                        },
                                        {
                                            offset: 1,
                                            color: "#CE4CE5"
                                        }
                                    ]
                                ),
                                barBorderRadius: 50,
                                borderWidth: 0
                            }
                        },
                        zlevel: 2,
                        barGap: "100%",
                        data: [8, 15,8, 15,8, 15,8, 15, 8, 15,88, 45]
                    }
                ]
            }
        };
    },
    props: {},
    mounted() {},
    methods: {
        init() {}
    }
};
</script>

