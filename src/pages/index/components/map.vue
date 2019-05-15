<template>
    <GmapMap :center="{lat:10, lng:10}" :zoom="7" map-type-id="terrain" class="map-contanter">
       <GmapMarker ref="myMarker"
    :position="{lat:10, lng:10}" />
    </GmapMap>
</template>
 <script>
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyDDIIuCrxy3qThI7OQ6UfhGNSBIq9mo05Y1",
        libraries: "places",
        language: 'zh-CN',
    },
    loadCn: true
});
export default {
    props: {
        data: {
            type: Array
        }
    },
    mounted() {
        // this.coverData();
    },
    methods: {

    }
};
</script>
<style lang="less" scoped>
.map-contanter {
    height: 100vh;
    width: 100%;
}
/deep/.marker-nomarl {
    height: 8px;
    width: 8px;
    background: #f56c6c;
    border-radius: 100%;
    &.t {
        background: #66b1ff;
    }
    .mlabel {
        position: absolute;
        width: 100px;
        color: #ffffff;
        text-shadow: 0 0 4px #666666, 0 0 3px #666666, 0 0 2px #666666,
            0 0 2px #666666;
        padding: 5px;
        left: 5px;
        top: -12px;
    }
}
</style>

