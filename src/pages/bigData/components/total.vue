<template>
    <!-- 总体信息 -->
    <div class="total-warp">
        <h4 class="title">
            空铁联运总体信息
            <span class="sub">空铁联运可达城市</span>
            <span class="num font-nun">{{data.citysCount}}</span>
            <i class="iconfont iconqushi"></i>
        </h4>
        <div class="flex flex-yc">
            <div class="flight-box chart-box">
                <div class="chart" id="chartDom">
                    <v-chart :options="optionflight" class="flight-chart charts"/>
                    <canvas id="myCanvasf"></canvas>
                </div>
                <div class="list">
                    <p class="flex flex-yc">
                        <span class="name">互通航班城市</span>
                        <span class="fun">{{data.flightCitysCount}}</span>
                    </p>
                    <p class="flex flex-yc">
                        <span class="name">承运航司量</span>
                        <span class="fun">{{data.airlinesCount}}</span>
                    </p>
                    <p class="flex flex-yc">
                        <span class="name">航班线路总量</span>
                        <span class="fun">{{data.flightRoutesCount}}</span>
                    </p>
                    <p class="flex flex-yc flex-end">
                        <span class="name">承运航班总量</span>
                        <span class="fun">{{data.flightsCount}}</span>
                    </p>
                    <p class="flex flex-yc flex-end">
                        <span class="name">飞机制造商</span>
                        <span class="fun">{{data.planeMarkersCount}}</span>
                    </p>
                </div>
            </div>
            <div class="train-box chart-box">
                <div class="chart">
                    <v-chart :options="optiontrain" class="flight-chart charts"/>
                    <canvas id="myCanvast"></canvas>
                </div>
                <div class="list train">
                    <p class="flex flex-yc">
                        <span class="name train">互通高铁城市</span>
                        <span class="fun">{{data.trainCitysCount}}</span>
                    </p>
                    <p class="flex flex-yc">
                        <span class="name train">承运铁路局</span>
                        <span class="fun">{{data.railwaysCount}}</span>
                    </p>
                    <p class="flex flex-yc">
                        <span class="name train">高铁线路总量</span>
                        <span class="fun">{{data.trainRoutesCount}}</span>
                    </p>
                    <p class="flex flex-yc flex-end">
                        <span class="name train">高铁车次总量</span>
                        <span class="fun">{{data.trainsCount}}</span>
                    </p>
                    <p class="flex flex-yc flex-end">
                        <span class="name train">动车组制造商</span>
                        <span class="fun">{{data.emuMarkersCount}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import data from "./../data";
import Vue from "vue";
import ECharts from "vue-ECharts";
import "ECharts/lib/chart/radar";
let total=data.total;
export default {
    components: {
        "v-chart": ECharts
    },
    data() {
        return {
            data: total,
            optionflight: {
                color: ["#934BE1", "rgba(86,199,60, 1)"],
                tooltip: {
                    show: false,
                    trigger: "item"
                },

                radar: {
                    center: ["50%", "50%"],
                    radius: "99.5%",
                    startAngle: 90,
                    splitNumber: 2,

                    splitArea: {
                        areaStyle: {
                            color: ["transparent"]
                        }
                    },
                    axisLabel: {
                        show: false,
                        fontSize: 20,
                        color: "#000",
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(206, 76, 229,.34)"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(206, 76, 229,.34)"
                        }
                    },
                    // shape: 'circle',
                    name: {
                        show: false
                    },
                    indicator: [
                        {
                            name: "互通航班城市",
                            max: 150,
                            aaa: "assdfasdf"
                        },
                        {
                            name: "承运航司量",
                            max: 50,
                            aaa: "assdfasdf"
                        },
                        {
                            name: "航班线路总量",
                            max: 700,
                            aaa: "assdfasdf"
                        },
                        {
                            name: "承运航班总量",
                            max: 20000,
                            aaa: "assdfasdf"
                        },
                        {
                            name: "飞机制造商",
                            max: 10,
                            aaa: "assdfasdf"
                        }
                    ]
                },

                series: [
                    {
                        type: "radar",
                        symbol: "circle",
                        symbolSize: 0,
                        areaStyle: {
                            normal: {
                                color: "transparent"
                            }
                        },
                        itemStyle: {
                            color: "rgba(86,199,60, 1)",
                            borderColor: "rgba(86,199,60, 0.3)",
                            borderWidth: 10
                        },
                        lineStyle: {
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "#F94A6F"
                                        },
                                        {
                                            offset: 1,
                                            color: "#CE4CE5"
                                        }
                                    ],
                                    false
                                ),
                                width: 3,
                            }
                        },
                        data: [[150,50,700,20000,10]]
                    },
                    {
                        type: "radar",
                        symbol: "circle",
                        symbolSize: 8,
                        itemStyle: {
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "#F94A6F"
                                        },
                                        {
                                            offset: 1,
                                            color: "#CE4CE5"
                                        }
                                    ],
                                    false
                                ),
                                borderColor: "rgba(206, 76, 229, .4)",
                                borderWidth: 8
                            }
                        },
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
                                            color: "#F94A6F"
                                        },
                                        {
                                            offset: 1,
                                            color: "#CE4CE5"
                                        }
                                    ],
                                    false
                                ),
                                opacity: 0.34
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "#F94A6F"
                                        },
                                        {
                                            offset: 1,
                                            color: "#CE4CE5"
                                        }
                                    ],
                                    false
                                ),
                                width: 1
                            }
                        },
                        data: [[109, 45, 222, 16732, 5]]
                    }
                ]
            },
            optiontrain: {
                color: ["#934BE1", "rgba(86,199,60, 1)"],
                tooltip: {
                    show: false,
                },

                radar: {
                    center: ["50%", "50%"],
                    radius: "99.5%",
                    startAngle: 90,
                    splitNumber: 2,

                    splitArea: {
                        areaStyle: {
                            color: ["transparent"]
                        }
                    },
                    axisLabel: {
                        show: false,
                        fontSize: 20,
                        color: "#000",
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(64, 195, 209, .4)"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(4, 110, 252, .35)"
                        }
                    },
                    // shape: 'circle',
                    name: {
                        show: false
                    },
                    indicator: [
                        {
                            name: "互通高铁城市",
                            max: 150,
                            aaa: "assdfasdf"
                        },
                        {
                            name: "承运铁路局",
                            max: 50,
                            aaa: "assdfasdf"
                        },
                        {
                            name: "高铁线路总量",
                            max: 700,
                            aaa: "assdfasdf"
                        },
                        {
                            name: "高铁车次总量",
                            max: 20000,
                            aaa: "assdfasdf"
                        },
                        {
                            name: "动车组制造商",
                            max: 10,
                            aaa: "assdfasdf"
                        }
                    ]
                },

                series: [
                    {
                        type: "radar",
                        symbol: "circle",
                        symbolSize: 0,
                        areaStyle: {
                            normal: {
                                color: "transparent"
                            }
                        },
                        itemStyle: {
                            color: "rgba(86,199,60, 1)",
                            borderColor: "rgba(86,199,60, 0.3)",
                            borderWidth: 8
                        },
                        lineStyle: {
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "#40C3D1"
                                        },
                                        {
                                            offset: 1,
                                            color: "#1767F2"
                                        }
                                    ],
                                    false
                                ),
                                width: 3,
                            }
                        },
                      data: [[150,50,700,20000,10]]
                    },
                    {
                        type: "radar",
                        symbol: "circle",
                        symbolSize: 8,
                        itemStyle: {
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "#40C3D1"
                                        },
                                        {
                                            offset: 1,
                                            color: "#1767F2"
                                        }
                                    ],
                                    false
                                ),
                                borderColor: "rgba(64, 195, 209, .4)",
                                borderWidth: 8
                            }
                        },
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
                                            color: "#40C3D1"
                                        },
                                        {
                                            offset: 1,
                                            color: "#1767F2"
                                        }
                                    ],
                                    false
                                ),
                                opacity: 0.34
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: new ECharts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "#40C3D1"
                                        },
                                        {
                                            offset: 1,
                                            color: "#1767F2"
                                        }
                                    ],
                                    false
                                ),
                                width: 1
                            }
                        },
                        data: [[125, 5, 670, 9978, 5]]
                    }
                ]
            }
        };
    },
    props: {},
    mounted() {
      var chartW = document.getElementById("chartDom").offsetWidth;
       var canvasf = document.getElementById("myCanvasf");
       canvasf.width = chartW;
        canvasf.height = chartW;
      var ctxf = canvasf.getContext('2d');
      this.draw(ctxf,'rgba(147, 75, 225,.35)',chartW/2,chartW/2,chartW/2,5);
      var canvast = document.getElementById("myCanvast");
       canvast.width = chartW;
        canvast.height = chartW;
      var ctxt = canvast.getContext('2d');
      this.draw(ctxt,'rgba(31, 121, 235, .35)',chartW/2,chartW/2,chartW/2,5);
    },
    methods: {
        draw(ctx,c,x, y, r, n) {
            var i, ang;
            ang = (Math.PI * 2) / n;
            ctx.save();
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = c;
            ctx.lineWidth = 16;
            ctx.translate(x, y);
            ctx.moveTo(0, -r);
            ctx.beginPath();
            for (i = 0; i < n; i++) {
                ctx.rotate(ang);

                ctx.lineTo(0, -r);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }
};
</script>

