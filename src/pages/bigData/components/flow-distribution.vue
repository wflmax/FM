<template>
    <!-- 流量分布 -->
    <div class="flow-warp">
        <h4 class="title">0-24点贵阳航班/列车流量分布</h4>
        <div class="flight">
           <p class="sub-title">进出港航班数量（架次）</p>
            <v-chart :options="optionflight" class="flight-chart"/>
        </div>
         <div class="subway">
           <p class="sub-title">进出站列车数量（班次）</p>
            <v-chart :options="optionSubway" class="flight-chart"/>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
var xAxisData = [];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];

for (var i = 0; i < 24; i++) {
    xAxisData.push(i);
    data1.push((Math.random() * 10).toFixed(2));
    data2.push((-Math.random() *10).toFixed(2));
    data3.push((-Math.random() * 10).toFixed(2));
    data4.push((Math.random()  * 10).toFixed(2));
}


export default {
    components: {
        "v-chart": ECharts
    },
    data() {
        return {
            optionflight: {
              grid: {
                    left: "0",
                    right: "0",
                    top:'2%',
                    bottom: "10%",
                    containLabel: true
                },
                backgroundColor: "transparent",
                legend: {
                    data: ["bar", "bar2", "bar3", "bar4"],
                    align: "left",
                    left: 0
                },
                brush: {
                    toolbox: [
                        "rect",
                        "polygon",
                        "lineX",
                        "lineY",
                        "keep",
                        "clear"
                    ],
                    xAxisIndex: 0
                },
                toolbox: {
                    feature: {
                        magicType: {
                            type: ["stack", "tiled"]
                        },
                        dataView: {}
                    }
                },
                tooltip: {},
                xAxis: {
                    data: xAxisData,
                    name: "X Axis",
                    silent: false,
                    axisLine: { onZero: true },
                    splitLine: { show: false },
                    splitArea: { show: false },
                    axisLabel: {
                            inside: false,
                            textStyle: {
                                color: "#fff",
                                fontWeight: "normal",
                                fontSize: "12"
                            }
                        },
                },
                yAxis: {
                    inverse: true,
                    splitArea: { show: false },
                    splitLine:{
                      lineStyle:{
                         color: 'rgba(255,255,255,0.3)'
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

                visualMap: {
                    type: "continuous",
                    dimension: 1,
                    text: ["High", "Low"],
                    inverse: true,
                    itemHeight: 200,
                    calculable: true,
                    min: -2,
                    max: 6,
                    top: 60,
                    left: 10,
                    inRange: {
                        colorLightness: [0.4, 0.8]
                    },
                    outOfRange: {
                        color: "#bbb"
                    },
                    controller: {
                        inRange: {
                            color: "#2f4554"
                        }
                    }
                },
                series: [
                    {
                        name: "bar",
                        type: "line",
                        stack: "one",
                         showSymbol:false,
                        lineStyle: {
                            normal: {
                                color: "#FF38C6" // 线条颜色
                            }
                        },
                        data: data1,
                        areaStyle: {
                            //区域填充样式
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 1,
                                            color: "#FF38C6"
                                        },
                                        {
                                            offset: 0,
                                            color: "transparent"
                                        }
                                    ],
                                    false
                                )
                            }
                        }
                    },
                    {
                        name: "bar2",
                        type: "line",
                        stack: "one",
                        data: data2,
                         showSymbol:false,
                          lineStyle: {
                            normal: {
                                color: "#FF3C59" // 线条颜色
                            }
                        },
                        areaStyle: {
                            //区域填充样式
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#FF3C59"
                                        },
                                        {
                                            offset: 1,
                                            color: "transparent"
                                        }
                                    ],
                                    false
                                )
                            }
                        }
                    },
                    {
                        name: "bar3",
                        type: "line",
                        stack: "two",
                        data: data3,
                         showSymbol:false,
                        lineStyle: {
                            normal: {
                                color: "#fff" // 线条颜色
                            }
                        },
                    },
                    {
                        name: "bar4",
                        type: "line",
                        stack: "two",
                         showSymbol:false,
                        data: data4,
                         lineStyle: {
                            normal: {
                                color: "#fff" // 线条颜色
                            }
                        },
                    }
                ]
            },
             optionSubway: {
              grid: {
                    left: "0",
                    right: "0",
                    top:'2%',
                    bottom: "10%",
                    containLabel: true
                },
                backgroundColor: "transparent",
                legend: {
                    data: ["bar", "bar2", "bar3", "bar4"],
                    align: "left",
                    left: 0
                },
                brush: {
                    toolbox: [
                        "rect",
                        "polygon",
                        "lineX",
                        "lineY",
                        "keep",
                        "clear"
                    ],
                    xAxisIndex: 0
                },
                toolbox: {
                    feature: {
                        magicType: {
                            type: ["stack", "tiled"]
                        },
                        dataView: {}
                    }
                },
                tooltip: {},
                xAxis: {
                    data: xAxisData,
                    name: "X Axis",
                    silent: false,
                    axisLine: { onZero: true },
                    splitLine: { show: false },
                    splitArea: { show: false },
                    axisLabel: {
                            inside: false,
                            textStyle: {
                                color: "#fff",
                                fontWeight: "normal",
                                fontSize: "12"
                            }
                        },
                },
                yAxis: {
                    inverse: true,
                    splitArea: { show: false },
                    splitLine:{
                      lineStyle:{
                         color: 'rgba(255,255,255,0.3)'
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


                series: [
                    {
                        name: "bar",
                        type: "line",
                        stack: "one",
                        showSymbol:false,
                        lineStyle: {
                            normal: {
                                color: "#40D1BD" // 线条颜色
                            }
                        },
                        data: data1,
                        areaStyle: {
                            //区域填充样式
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "transparent"
                                        },
                                        {
                                            offset: 1,
                                            color: "#40D1BD"
                                        }
                                    ],

                                    false
                                )
                            }
                        }
                    },
                    {
                        name: "bar2",
                        type: "line",
                        stack: "one",
                        data: data2,
                         showSymbol:false,
                          lineStyle: {
                            normal: {
                                color: "#1767F2" // 线条颜色
                            }
                        },
                        areaStyle: {
                            //区域填充样式
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#1767F2"
                                        },

                                        {
                                            offset: 0.3,
                                            color: "#0073FF"
                                        },
                                        {
                                            offset: 1,
                                            color: "transparent"
                                        }
                                    ],
                                    false
                                )
                            }
                        }
                    },
                    {
                        name: "bar3",
                        type: "line",
                        stack: "two",
                        data: data3,
                         showSymbol:false,
                        lineStyle: {
                            normal: {
                                color: "#fff" // 线条颜色
                            }
                        },
                    },
                    {
                        name: "bar4",
                        type: "line",
                        stack: "two",
                         showSymbol:false,
                        data: data4,
                         lineStyle: {
                            normal: {
                                color: "#fff" // 线条颜色
                            }
                        },
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

<style lang="less" scoped>
@import '../../../assets/css/func.less';
.flight-chart{
  width: px2rem(2376);
  height: 30vh!important;
}
</style>

