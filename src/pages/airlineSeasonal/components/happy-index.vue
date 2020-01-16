<template>
    <v-chart :autoresize="true" :options="planeBase" />
</template>
<script>
import Vue from "vue";
import echarts from "vue-echarts";
export default {
    props: {
        index: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        index(val) {
            this.setOption();
        }
    },

    mounted() {
        this.setOption();
    },
    data() {
        return {
            planeBase: {}
        };
    },
    methods: {
        setOption() {
            this.planeBase = {
                color: ["#D0244C", "#fff"],
                radar: {
                    name: {
                        textStyle: {
                            color: "#DBC472",
                            fontSize: "50%"
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ["transparent"],
                            shadowColor: "rgba(0, 0, 0, 0.3)",
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#DBC472"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#DBC472"
                        }
                    },
                    radius: "64%",
                    center: ["60%", "57%"],
                    nameGap: "7",
                    indicator: [
                        {
                            name: "座位间距",
                            max: 5
                        },
                        {
                            name: "娱乐设施",
                            max: 5
                        },
                        {
                            name: "电源",
                            max: 5
                        },
                        {
                            name: "座椅角度",
                            max: 5
                        },
                        {
                            name: "座椅宽度",
                            max: 5
                        }
                    ]
                },
                series: [
                    {
                        type: "radar",
                        data: [
                            {
                                value: this.index,
                                areaStyle: {
                                    normal: {
                                        color: "rgba(208, 36, 76, 5)"
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
        }
    },
    components: {
        "v-chart": echarts
    }
};
</script>
