<template>
    <!-- Map -->

    <div class="map-warp">
        <v-chart class="map" id="container" :options="option" :autoresize="true" />
    </div>
</template>

<script>
import airports from "./../airports";
import Vue from "vue";
import echarts from "vue-echarts";
import "echarts-gl";

export default {
    components: {
        "v-chart": echarts
    },
    data() {
        return {
            option: {},
            series: []
        };
    },
    props: {
        routes: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        this.getData();
    },
    watch: {
        routes(val) {
            this.series = [];
            this.getData();
        }
    },
    methods: {
        getData() {
            let flightPoints = [],
                flightStopPoints = [],
                flightRoutes = [],
                flightStopRoutes = [],
                f_points = [],
                s_points = [], //经停点
                f_line = [],
                series = [];
            let routes = this.routes;

            for (let key in routes) {
                let item = routes[key];
                let line = item["line"];
                let r = Math.ceil(Math.random() * 10);
                let dep = airports[item.depCode];
                let arr = airports[item.arrCode];
                if ((dep && arr && dep[5] == "CN") || arr[5] == "CN") {
                    let depCoods = [dep[1], dep[2], item.depCode];
                    let arrCoods = [arr[1], arr[2], item.arrCode];
                    if (!f_points.includes(item.depCode)) {
                        flightPoints.push(depCoods);
                        f_points.push(item.depCode);
                    }
                    if (!f_points.includes(item.arrCode)) {
                        flightPoints.push(arrCoods);
                        f_points.push(item.arrCode);
                    }
                    if (item.stops.length != 0) {
                        for (let i = 0, s; (s = item.stops[i]); i++) {
                            let stop = airports[s];
                            if (!stop) {
                                continue;
                            }
                            let stopCoods = [stop[1], stop[2]];
                            if (dep[5] == "CN" || stop[5] == "CN") {
                                if (!s_points.includes(s)) {
                                    flightStopPoints.push(stopCoods);
                                    s_points.push(s);
                                }
                            }

                            if (i == 0) {
                                if (dep[5] == "CN" || stop[5] == "CN") {
                                    flightStopRoutes.push([
                                        depCoods,
                                        stopCoods
                                    ]);
                                }
                            } else if (i > 0 && i < item.stops.length - 1) {
                                let beforeStop = airports[item.stops[i - 1]];
                                if (beforeStop[5] == "CN" || stop[5] == "CN") {
                                    let beforeStopCoods = [
                                        beforeStop[1],
                                        beforeStop[2]
                                    ];
                                    flightStopRoutes.push([
                                        stopCoods,
                                        stopCoods
                                    ]);
                                }
                            } else {
                                if (arr[5] == "CN" || stop[5] == "CN") {
                                    flightStopRoutes.push([
                                        stopCoods,
                                        arrCoods
                                    ]);
                                }
                            }
                        }
                    } else {
                        if (!f_line.includes(line)) {
                            r > 5
                                ? flightRoutes.push([depCoods, arrCoods])
                                : flightRoutes.push([arrCoods, depCoods]);
                            f_line.push(line);
                        }
                    }
                }
            }

            series.push(
                {
                    type: "scatter3D",
                    coordinateSystem: "globe",
                    blendMode: "lighter",
                    symbolSize: 3,
                    itemStyle: {
                        color: "rgba(126, 255, 244, 1)",
                        opacity: 0.8
                    },

                    data: flightPoints
                },
                {
                    type: "scatter3D",
                    coordinateSystem: "globe",
                    blendMode: "lighter",
                    symbolSize: 3,
                    itemStyle: {
                        color: "#f00",
                        opacity: 0.8
                    },
                    data: flightStopPoints
                }
            );
            series.push(
                {
                    type: "lines3D",
                    effect: {
                        show: true,
                        trailWidth: 4,
                        trailLength: 0.3,
                        trailOpacity: 1,
                        trailColor: "rgb(30, 30, 60)"
                    },

                    lineStyle: {
                        width: 1,
                        color: "#2ae493", // 0% 处的颜色
                        opacity: 0.15
                    },
                    blendMode: "lighter",
                    data: flightRoutes
                },
                {
                    type: "lines3D",
                    effect: {
                        show: true,
                        trailWidth: 5,
                        trailLength: 0.5,
                        trailOpacity: 1,
                        trailColor: "rgb(30, 30, 60)"
                    },

                    lineStyle: {
                        width: 1,
                        color: "#e6b555",
                        opacity: 0.5
                    },
                    blendMode: "lighter",

                    data: flightStopRoutes
                }
            );
            this.series = series;
            this.option = {
                backgroundColor: "transparent",
                globe: {
                    baseTexture: require("@/pages/components/gl/bg.png"),
                    displacementScale: 0.07,

                    shading: "realistic",
                    realisticMaterial: {
                        roughness: 0.1,
                        metalness: 0
                    },

                    postEffect: {
                        enable: true,
                        depthOfField: {
                            enable: false
                        }
                    },
                    groundPlane: {
                        show: true
                    },
                    light: {
                        ambient: {
                            intensity: 1
                        },
                        main: {
                            intensity: 0,
                            shadow: true,
                            alpha: 150,
                            beta: 70
                        },
                        ambientCubemap: {
                            // texture: require("@/pages/components/gl/lake.hdr"),
                            exposure: 1,
                            diffuseIntensity: 0.5,
                            specularIntensity: 2
                        }
                    },
                    viewControl: {
                        autoRotate: true,
                        zoomSensitivity: 1,
                        distance: 250,
                        autoRotateDirection:'ccw'
                    }
                },
                series: this.series
            };
        }
    }
};
</script>

