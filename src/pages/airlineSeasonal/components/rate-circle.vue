<template >
    <!-- 环比样式-->
    <v-chart :options="option" :autoresize="true" />
</template>

<script>
import Vue from "vue";
import echarts from "vue-echarts";

export default {
    data() {
        return {
            option: {},
            colors: [this.mainColorA, this.mainColorB]
        };
    },
    props: {
        rate: {
            type: Array,
            default: () => []
        },
        type: {
            type: Number,
            default: 0
        },
        color: String
    },
    mounted() {
        this.setOption();
    },
    watch: {},
    methods: {
        setOption() {
            if (this.type == 0) {
                this.option = {
                    series: [
                        {
                            type: "pie",
                            radius: ["85%", "96%"],
                            center: ["50%", "50%"],
                            data: [
                                {
                                    value: this.rate[0],
                                    labelLine: {
                                        show: false
                                    },
                                    itemStyle: {
                                        color: this.color
                                    }
                                },
                                {
                                    value: 52,
                                    name: "rose2",
                                    itemStyle: {
                                        color: "transparent"
                                    }
                                }
                            ]
                        },
                        {
                            type: "pie",
                            radius: ["82%", "85%"],
                            center: ["50%", "50%"],
                            data: [
                                {
                                    value: 1,
                                    itemStyle: {
                                        color: this.color,
                                        opacity: 0.3
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            ]
                        },
                        {
                            type: "pie",
                            radius: ["95%", "100%"],
                            center: ["50%", "50%"],
                            data: [
                                {
                                    value: 75,
                                    itemStyle: {
                                        color: this.color
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    label: {
                                        show: false
                                    }
                                },
                                {
                                    value: 25,
                                    itemStyle: {
                                        color: "transparent"
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    label: {
                                        show: false
                                    }
                                }
                            ]
                        }
                    ]
                };
            } else {
                let placeHolderStyle = {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: "rgba(0, 0, 0, 0)",
                        borderColor: "rgba(0, 0, 0, 0)",
                        borderWidth: 0
                    }
                };
                let data = [];
                for (var i = 0; i < this.rate.length; i++) {
                    data.push(
                        {
                            value: this.rate[i],
                            name: this.rate[i] + "%",
                            itemStyle: {
                                normal: {
                                    borderWidth: 10,
                                    borderColor: this.colors[i]
                                }
                            }
                        },
                        {
                            value: 1,
                            name: "",
                            itemStyle: placeHolderStyle
                        }
                    );
                }
                this.option = {
                    color:this.colors,
                    series: [
                        {
                            type: "pie",
                            clockWise: false,
                            radius: ["65%", "65%"],
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    label: {},
                                    labelLine: {}
                                }
                            },
                            data: data
                        }
                    ]
                };
            }
        }
    },
    components: {
        "v-chart": echarts
    }
};
</script>
