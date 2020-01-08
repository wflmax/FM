<!--首页-->
<template>
    <div class="warp">
        <div class="airlineSeasonal" v-if="statistics != null">
            <div class="bottom">
            </div>
            <div class="model-box left-model" >
                <flightsCover :flights="statistics.flights"></flightsCover>
                <routesCover :routes="statistics.routes"></routesCover>
                <passagerCover :passagers="statistics.passagers"></passagerCover>
                <timeDistribution :schedules="statistics.schedules"></timeDistribution>
                <capacityIn :capacity="statistics.capacity"></capacityIn>
            </div>
            <div class="model-box right-model">
                <airplaneMaker :models="statistics.models" :markers="statistics.markers"></airplaneMaker>
            </div>
            <earth :routes="routes3D"></earth>
            <div class="earth-s"></div>
        </div>
    </div>
</template>
<script>
import earth from "./components/earth";
import airplaneMaker from "./components/airplane-maker";
import routesCover from "./components/routes-cover";
import flightsCover from "./components/flights-cover";
import passagerCover from "./components/passager-cover";
import capacityIn from "./components/capacity-in";
import timeDistribution from "./components/time-distribution";
const axios = require("axios");
export default {
    multi: true,
    components: {
        earth,
        airplaneMaker,
        routesCover,
        capacityIn,
        timeDistribution,
        flightsCover,
        passagerCover,
    },
    data() {
        return {
            search: "JD",
            routes3D: [],
            statistics: null,
            areas: [], //空管局
            countrys: "00",
            airlinesCount: null,
            schedules: []
        };
    },

    mounted() {
        let airline = this.$route.query.airline;
        if (airline && this.titles.hasOwnProperty(airline.toLowerCase())) {
            this.search = airline.toLowerCase();
        }
        this.getData();
    },
    methods: {
        getData() {
            var that = this;
            axios
                .get("http://api.133.cn/map/routes?airline=" + that.search)
                .then(function(response) {
                    var d = response.data.datas;
                    that.routes3D = d.routes;
                    that.getCompareData();
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                })
                .finally(function() {});
        },
        getCompareData() {
            var that = this;
            axios
                .get("http://api.133.cn/map/statistics?airline=" + that.search)
                .then(function(response) {
                    var c = response.data.datas;
                    that.statistics = c;

                    that.schedules = c.schedules;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                })
                .finally(function() {
                    // always executed
                });
        },
        digitize(n, len) {
            //接受一个number类参数，拆分成一个数组并返回
            var str = n + "";
            var arr = [];
            str.split("").forEach(function(item) {
                arr.push(parseInt(item));
            });
            return arr;
        }
    },
    watch: {
        $route(from) {
            console.log(from.query.airline);
            if (this.search != from.query.airline) {
                  this.search = from.query.airline.toLowerCase();
                  this.getData();

            }
        }
    }
};
</script>
<style lang="less">
@import "./index.less";
</style>

