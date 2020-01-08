<template>
    <!-- 换季后出行时刻分布 -->
    <div class="model-item">
        <boxDecorate></boxDecorate>
         <div class="model-title flex flex-yc flex-between">
            未来出行时刻分布
            <div class="flex flex-yc flex-between sub-title">
                <p>全国航班时刻</p>
                <p>首航时刻</p>
            </div>
        </div>
        <v-chart :options="option" class="area-chart" :autoresize="true" />
    </div>
</template>
<script>
import boxDecorate from "./box-decorate";
import Vue from "vue";
import echarts from "vue-echarts";
import "echarts/lib/chart/line";

export default {
    props: {
        schedules: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            option: {}
        };
    },
    mounted() {
        this.setOption();
    },
    watch: {
        schedules(val) {
            this.setOption;
        }
    },
    methods: {
        setOption() {
            var that = this;
            this.option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    top: "10%",
                    right: "8%",
                    left: "11%",
                    bottom: "14%"
                },
                xAxis: [
                    {
                        type: "category",
                        data: that.schedules.map(function(dataItem,index) {
                            return index;
                        }),
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.12)"
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            color: "#fff",
                            textStyle: {
                                fontSize: "50%"
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        splitLine: { show: false },
                        axisLine: {
                            lineStyle: {
                                 color: this.mainColorA
                            }
                        },

                        axisLabel: {
                            formatter: "{value} ",
                            color: "#fff",
                             textStyle: {
                                fontSize: "50%"
                            }
                        }
                    },
                    {
                        splitLine: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: this.mainColorB
                            }
                        },
                        axisLabel: {
                            formatter: "{value} ",
                            color: "#fff",
                             textStyle: {
                                fontSize: "50%"
                            }
                        }
                    }
                ],
                series: [

                    {
                        type: "bar",

                        data: that.schedules.map(function(dataItem) {
                            return dataItem[1];
                        }),
                        barWidth: "3px",
                        itemStyle: {
                            normal: {
                                color: this.mainColorA
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        }
                    },
                    {
                        type: "bar",
                        yAxisIndex: 1,
                        data: that.schedules.map(function(dataItem) {
                            return dataItem[0];
                        }),
                        barWidth: "3px",
                        itemStyle: {
                            normal: {
                                color: this.mainColorB
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            };
        }
    },
    components: {
        boxDecorate,
        "v-chart": echarts
    }
};
</script>
<style lang="less" scoped>
.area-chart {
    position: relative;
    width: 100%;
     height: 14vh;
}


</style>
