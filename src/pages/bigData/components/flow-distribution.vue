<template>
    <!-- 流量分布 -->
    <div class="flow-warp">
        <h4 class="title"><span class="font-nun">0-24</span>点贵阳航班/列车流量分布</h4>
        <div class="flight">
           <p class="sub-title">进出港航班数量（架次）</p>
            <v-chart :options="optionflight" class="flight-chart"/>
            <div class="lengs flex">
              <p>计划进/出港航班数量（架次）</p>
              <p>实际进港航班数量（架次）</p>
              <p>实际出港航班数量（架次）</p>
            </div>
        </div>
         <div class="subway">
           <p class="sub-title train">进出站列车数量（车次）</p>
            <v-chart :options="optionTrain" class="flight-chart"/>
            <div class="lengs flex train">
              <p>计划进/出站列车数量（车次）</p>
              <p>实际进站列车数量（车次）</p>
              <p>实际出站列车数量（车次）</p>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import data from "./../data";
var xAxisData = [];
for(let i=0;i<24;i++){
  xAxisData.push(i);
}

 let flihtDepplan=data.flow.flight.depPlan,
 flihtArrplan=data.flow.flight.arrPlan,
  flihtDepAct=data.flow.flight.depAct,
  flihtArrAct=data.flow.flight.arrAct;
let trainDepplan=data.flow.train.depPlan,
 trainArrplan=data.flow.train.arrPlan,
  trainDepAct=data.flow.train.depAct,
  trainArrAct=data.flow.train.arrAct;

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
                    top:'4%',
                    bottom: "10%",
                    containLabel: true
                },
                backgroundColor: "transparent",
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
                        name: "bar3",
                        type: "line",
                        stack: "two",
                        smooth:true,
                        data: flihtArrplan,
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
                        smooth:true,
                         showSymbol:false,
                        data: flihtDepplan,
                         lineStyle: {
                            normal: {
                                color: "#fff" // 线条颜色
                            }
                        },
                    },
                    {
                        name: "bar",
                        type: "line",
                        stack: "one",
                        smooth:true,
                         showSymbol:false,
                        lineStyle: {
                            normal: {
                                color: "#FF38C6" // 线条颜色
                            }
                        },
                        data: flihtArrAct,
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
                        smooth:true,
                        data: flihtDepAct,
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
                                            offset:0,
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
                    }

                ]
            },
             optionTrain: {
              grid: {
                    left: "0",
                    right: "0",
                    top:'4%',
                    bottom: "10%",
                    containLabel: true
                },
                backgroundColor: "transparent",


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
                        name: "bar3",
                        type: "line",
                        stack: "two",
                        data: trainArrplan,
                        smooth:true,
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
                        smooth:true,
                         showSymbol:false,
                        data: trainDepplan,
                         lineStyle: {
                            normal: {
                                color: "#fff" // 线条颜色
                            }
                        },
                    },
                    {
                        name: "bar",
                        type: "line",
                        stack: "one",
                        smooth:true,
                        showSymbol:false,
                        lineStyle: {
                            normal: {
                                color: "#40D1BD" // 线条颜色
                            }
                        },
                        data: trainArrAct,
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
                        smooth:true,
                        data: trainDepAct,
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
                                            offset: 1,
                                            color: "transparent"
                                        }
                                    ],
                                    false
                                )
                            }
                        }
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
  width: 100%!important;
  position: relative;
  height: 24vh!important;
}
</style>

