<template>
    <!-- 运力投入市场份额（千万级机场） -->
    <div class="model-item">
        <boxDecorate></boxDecorate>
        <div class="model-title flex flex-yc flex-between">
            未来运力投入情况分析
            <div class="flex flex-yc flex-between sub-title">
                <p>国内运输总投入</p>
                <p>首航运力投入</p>
            </div>
        </div>
        <p class="tip">万/(座)</p>

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
        capacity: {
            type: Object
        }
    },
    watch: {
        capacity(val) {
            this.setOption();
        }
    },
    mounted() {
        this.setOption();
    },
    data() {
        return {
            option: {},
            areas: {
                db: "东北",
                xb: "西北",
                hd: "华东",
                hb: "华北",
                zn: "中南",
                xn: "西南",
                xj: "新疆"
            },
            xArea: [],
            total: [],
            self: [],
            arvage: []
        };
    },
    components: {
        boxDecorate,
        "v-chart": echarts
    },
    methods: {
        setOption() {
            let a = [],
                b = [],
                c = [],
                arvage = [];
            for (let item in this.capacity) {
                let d = this.capacity[item];
                a.push((d[0] / 10000).toFixed(1));
                b.push((d[1] / 10000).toFixed(1));
                arvage.push(((d[0] + d[1]) / 20000).toFixed(1));
                c.push(this.areas[item]);
            }
            this.total = b;
            this.self = a;
            this.xArea = c;
            this.option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    top: "15%",
                    right: "5%",
                    left: "8%",
                    bottom: "15%"
                },
                xAxis: {
                    data: this.xArea,
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.12)"
                        }
                    },
                    axisLabel: {
                        formatter: "{value} ",
                        color: "#fff",
                        textStyle: {
                            fontSize: "50%"
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
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
                        barMaxWidth: 15,
                        itemStyle: {
                            normal: {
                                color: this.mainColorA,
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: "#fff",
                                        textStyle: {
                                            fontSize: "50%"
                                        }
                                    },
                                    position: "top",
                                    formatter: function(p) {
                                        return p.value;
                                    }
                                }
                            }
                        },
                        data: this.total
                    },
                    {
                        type: "bar",
                        barMaxWidth: 15,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: this.mainColorB,
                                label: {
                                    show: false,
                                    show: true,
                                    textStyle: {
                                        color: "#fff"
                                    },
                                    position: "top",
                                    formatter: function(p) {
                                        return p.value;
                                    }
                                }
                            }
                        },
                        data: this.self
                    },
                    {
                        type: "line",
                        symbolSize: 1,
                        itemStyle: {
                            normal: {
                                color: "#24B6D0",
                                barBorderRadius: 0,
                                label: {
                                    show: false
                                }
                            }
                        },
                        data: arvage
                    }
                ]
            };
        }
    }
};
</script>
<style lang="less" scoped>
.area-chart {
    position: relative;
    width: 100%;
    height: 15vh;
}
.tip{
    position:absolute;
    font-size: .8rem;
    left: 10%;
    margin-top: 1rem;
}
</style>
