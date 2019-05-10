<template>
    <!-- Map -->

    <div class="map-warp">
        <v-chart  class="map" id="container" :options="option" style="width: 100%;height:100%;"/>
    </div>
</template>

<script>
import data from "./../data";
import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts-gl";
export default {
    components: {
        "v-chart": ECharts
    },
    data() {
        return {
            option: {
                    backgroundColor: 'transparent',
                    globe: {

                        environment: require('./gl/starfield.jpg'),
                        baseTexture: require("./gl/bathymetry_bw_composite_4k.jpg"),

                        displacementScale: 0.05,
                        // displacementQuality: 'high',

                        // baseColor: '#000',

                        shading: 'realistic',
                        realisticMaterial: {
                            roughness: 0.2,
                            metalness: 0
                        },

                        postEffect: {
                            enable: true,
                            depthOfField: {
                                // enable: true
                            }
                        },
                        light: {
                            ambient: {
                                intensity: 0
                            },
                            main: {
                                intensity: 0.1,
                                shadow: false
                            },
                            ambientCubemap: {
                                texture: require('./gl/lake.hdr'),
                                exposure: 1,
                                diffuseIntensity: 0.5,
                                specularIntensity: 2
                            }
                        },
                        viewControl: {
                            autoRotate: false
                        },


                    },
                    series: []
                }
        };
    },
    props: {},
    mounted() {

    },
    methods: {}
};
</script>

