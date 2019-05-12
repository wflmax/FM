<template>
    <!-- Map -->

    <div class="map-warp">
        <v-chart class="map" id="container" :options="option" />
    </div>
</template>

<script>
import flights from "./gl/flights";
import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts-gl";
var airports = flights.airports.map(function(item) {
    return {
        coord: [item[3], item[4]]
    };
});
var routesGroupByAirline = {};
flights.routes.forEach(function(route) {
    var airline = flights.airlines[route[0]];
    var airlineName = airline[0];
    if (!routesGroupByAirline[airlineName]) {
        routesGroupByAirline[airlineName] = [];
    }
    routesGroupByAirline[airlineName].push(route);
});
function getAirportCoord(idx) {
    return [flights.airports[idx][3], flights.airports[idx][4]];
}
var pointsData = [];
flights.routes.forEach(function(airline) {
    pointsData.push(getAirportCoord(airline[1]));
    pointsData.push(getAirportCoord(airline[2]));
});
var series = flights.airlines
    .map(function(airline) {
        var airlineName = airline[0];
        var routes = routesGroupByAirline[airlineName];

        if (!routes) {
            return null;
        }
        return {
            type: "lines3D",
            name: airlineName,

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
                opacity:.1
            },
            blendMode: "lighter",

            data: routes.map(function(item) {
                return [airports[item[1]].coord, airports[item[2]].coord];
            })
        };
    })
    .filter(function(series) {
        return !!series;
    });
series.push({
    type: "scatter3D",
    coordinateSystem: "globe",
    blendMode: "lighter",
    symbolSize: 2,
    itemStyle: {
        color: "rgb(50, 50, 150)",
        opacity: 1
    },
    data: pointsData
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
                            intensity: 5,
                            shadow: false
                        }
                    },
                    viewControl: {
                        autoRotate: true
                    }
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

