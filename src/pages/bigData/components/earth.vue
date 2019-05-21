<template>
    <!-- Map -->

    <div class="map-warp">
        <v-chart class="map" id="container" :options="option"/>
    </div>
</template>

<script>
import routes from "./gl/routes";
import { stationCoord } from "@/config/utils";
import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts-gl";
import { debuglog } from 'util';
let flightPoints = [],
    trainPoints = [],
    flightRoutes = [],
    trainRoutes = [],
    f_points=[],
    t_points=[],
    f_line = [],
    t_line = [],
    series = [];

for (let key in routes) {
    let datas = routes[key];
    let keyArr = key.split("_");
    for (let d in datas) {
        let item = datas[d];
        let line1 = item[0] + "" + item[1];
        let line2 = item[2] + "" + item[3];
        let r=Math.ceil(Math.random()*10);
        if (keyArr[0] == "f") {
            let a = stationCoord.coords("f", item[0]);
            let b = stationCoord.coords("f", item[1]);
            let c = stationCoord.coords("t", item[2]);
            let d = stationCoord.coords("t", item[3]);
            if (!f_points.includes(item[0])) {
                flightPoints.push(a);
                f_points.push(item[0])
            }
            if (!f_points.includes(item[1])) {
                flightPoints.push(b);
                 f_points.push(item[1])
            }
            if (!f_line.includes(line1)) {
              r>5?flightRoutes.push([a, b]):flightRoutes.push([b, a]);
                f_line.push(line1);
            }
            if (!t_points.includes(item[2])) {
                trainPoints.push(c);
                 t_points.push(item[2])
            }
            if (!t_points.includes(item[3])) {
                trainPoints.push(d);
                t_points.push(item[3])
            }
            if (!t_line.includes(line1)) {
                trainRoutes.push([c,d]);
                t_line.push(line1);
            }
            a=null;b=null;c=null;d=null;
        } else {
           let a = stationCoord.coords("t", item[0]);
            let b = stationCoord.coords("t", item[1]);
            let c = stationCoord.coords("f", item[2]);
            let d = stationCoord.coords("f", item[3]);
            if (!t_points.includes(item[0])) {
                trainPoints.push(a);
                t_points.push(item[0]);
            }
            if (!t_points.includes(item[1])) {
                trainPoints.push(b);
                t_points.push(item[1]);
            }
            if (!t_line.includes(line2)) {
                trainRoutes.push([a,b]);
                t_line.push(line2);
            }
            if (!f_points.includes(item[2])) {
                flightPoints.push(c);
                f_points.push(item[2]);
            }
            if (!f_points.includes(item[3])) {
                flightPoints.push(d);
                f_points.push(item[3]);
            }
            if (!f_line.includes(line2)) {
                r>5?flightRoutes.push([c,d]):flightRoutes.push([d,c]);
                f_line.push(line2);
            }
            a=null;b=null;c=null;d=null;
        }
    }
}
series.push(
    {
        type: "scatter3D",
        coordinateSystem: "globe",
        blendMode: "lighter",
        symbolSize: 4,
        itemStyle: {
            color: "#ff0",
            opacity: 0.4
        },
        data: trainPoints
    },
    {
        type: "scatter3D",
        coordinateSystem: "globe",
        blendMode: "lighter",
        symbolSize: 4,
        itemStyle: {
            color: "rgba(206, 76, 229, .4)",
            opacity: 1
        },
        data: flightPoints
    }
);
series.push({
    type: "lines3D",

    effect: {
        show: true,
        trailWidth: 3,
        trailLength: 0.15,
        trailOpacity: 1,
        trailColor: "rgb(30, 30, 60)"
    },

    lineStyle: {
        width: 1,
        color: "rgba(206, 76, 229, .4)",
        opacity: 1
    },
    blendMode: "lighter",

    data: trainRoutes
},{
    type: "lines3D",
    effect: {
        show: true,
        trailWidth: 3,
        trailLength: 0.15,
        trailOpacity: 1,
        trailColor: "rgb(30, 30, 60)"
    },

    lineStyle: {
        width: 1,
        color: "rgba(147, 75, 225,.35)",
        opacity: 1
    },
    blendMode: "lighter",

    data: flightRoutes
});
export default {
    components: {
        "v-chart": ECharts
    },
    data() {
        return {
            option: {
                backgroundColor: "transparent",
                globe: {
                    baseTexture: require("./gl/bathymetry_bw_composite_4k.jpg"),

                    displacementScale: 0.05,
                    // displacementQuality: 'high',

                    // baseColor: '#000',

                    shading: "realistic",
                    realisticMaterial: {
                        roughness: 0.9
                    },

                    postEffect: {
                        enable: true,
                        depthOfField: {
                            // enable: true
                        }
                    },
                    light: {
                        main: {
                            intensity:1,
                            shadow: false
                        }
                    },
                    // viewControl: {
                    //     autoRotate: true
                    // }
                },
                series: series
            }
        };
    },
    props: {},
    mounted() {},
    methods: {}
};
</script>

