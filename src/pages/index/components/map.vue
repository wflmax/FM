<template>
    <div class="map-contanter" id="map"></div>
</template>
 <script>
  function initMap() {
	map = new google.maps.Map(document.getElementById(GoogleUtil.config.container), {
		backgroundColor: SettingConfig.waterColor,
		center: {
			lat: GoogleUtil.config.centerLat,
			lng: GoogleUtil.config.centerLng
		},
		zoom: GoogleUtil.config.zoom,
		minZoom: GoogleUtil.config.minZoom,
		maxZoom: GoogleUtil.config.maxZoom,
		streetViewControl: false,
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		mapTypeControl: false,
		fullscreenControl: true,
		fullscreenControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
	});

}
/**
 * 地图显示类方法
 */

GoogleUtil = {
	config: {
		mapkey: ['AIzaSyB5KAWo9taL4p-xf5gcB5vMvPn6yivGuIM'],
		container: "map",
		zoom: 3,
		minZoom: 2,
		maxZoom: 6,
		centerLat: 39.334053,
		centerLng: 159.02045,
		mapstatus: false,
		isnewMap: false,
		ZOOM_MAX: 19,
		ZOOM_MIN: 0
	},
	mapConstant: {
		cityLevel: 1,
		markerSize: 32,
		uSymbol: 'M593.180416 494.907717c0 28.253484-22.89443 51.16531-51.158147 51.16531-28.260647 0-51.172473-22.911826-51.172473-51.16531 0-28.269857 22.911826-51.16531 51.172473-51.16531C570.285986 443.742407 593.180416 466.63786 593.180416 494.907717z',
		lineSymbol: {
			path: 'M 0,-1 0,1',
			strokeOpacity: .5,
			strokeColor: '#2f819c', //虚线
			strokeWeight: 1
		},
		markersArray: [],
		markersCode: [],
		polylines: [],
		lastInfoWindow: [],
		lasthighId: null
	},
	/**
	 * 异步加载谷歌API
	 */
	loadScript: function () {
		var script = document.createElement("script");
		var keyLen = this.config.mapkey.length;
		script.type = "text/javascript";
		script.src = "http://ditu.google.cn/maps/api/js?v=3&key=" + this.config.mapkey[Math.floor(Math.random() * keyLen)] + '&hl=zh-CN&callback=initMap';
		script.async = false;
		script.defer = false;
		document.getElementsByTagName("head")[0].appendChild(script);

	},

}
window.onload = GoogleUtil.loadScript();

// const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
// mapboxgl.accessToken =
//     "pk.eyJ1Ijoid3VmbG1heCIsImEiOiJjanRwbmU5NXkwNmlnNDNwcGY5M2psMW80In0.8ZX4CyoWaA5klNBh7AP8cA";
// import { stationCoord } from "@/config/utils";
// let map;
// export default {
//     props: {
//         data: {
//             type: Array
//         }
//     },
//     data() {
//         return {
//             map: null,
//             bounds: [],
//             colors:{'f':'#f56c6c','t':'#66b1ff'}
//         };
//     },
//     mounted() {
//         this.map = new mapboxgl.Map({
//             container: "map",
//             style: "mapbox://styles/wuflmax/cjumc67or01l51flpu7i4zbn6",
//             center: [118.331301, 27.753746],
//             zoom: 4.3
//         });
//           let self = this;
//         this.map.on("load", function() {
//             self.coverData();
//         });
//     },
//     methods: {
//         coverData() {
//             let places = {}; //点
//             let features = [];
//             let routes = {}; //线
//             let temp = [];
//             let temR = [];
//             for (let i in this.data) {
//                 let r = this.data[i].routes;
//                 for (let j in r) {
//                     let dep = r[j].depCode;
//                     let arr = r[j].arrCode;
//                     let type = r[j].type;
//                     let depCoord = [
//                         stationCoord.lng(type, dep),
//                         stationCoord.lat(type, dep)
//                     ];
//                     let arrCoord = [
//                         stationCoord.lng(type, arr),
//                         stationCoord.lat(type, arr)
//                     ];
//                     if (!temp.includes(type + dep)) {
//                         let objDep = {
//                             label: stationCoord.name(type, dep),
//                             type: type,
//                             coordinates: depCoord
//                         };
//                         features.push(objDep);
//                         temp.push(type + dep);
//                     }
//                     if (!temp.includes(type + arr)) {
//                         let objArr = {
//                             label: stationCoord.name(type, arr),
//                             type: type,
//                             coordinates: arrCoord
//                         };
//                         features.push(objArr);
//                         temp.push(type + arr);
//                     }
//                     let objRoute = {
//                         type: "FeatureCollection",
//                         features: [
//                             {
//                                 dec:
//                                     stationCoord.name(type, dep) +
//                                     "至" +
//                                     stationCoord.name(type, arr),
//                                 type: type,
//                                 geometry: {
//                                     type: "LineString",
//                                     coordinates: [depCoord, arrCoord]
//                                 }
//                             }
//                         ]
//                     };

//                     temR.push(objRoute);
//                 }
//             }
//             places["features"] = features;
//             this.addMaker(places);
//             routes["features"] = temR;
//             this.addLine(routes);
//             // this.map.fitBounds(this.bounds); //根据点自动适应屏幕
//         },
//         addLine(routes) {
//             let self = this;
//             routes.features.forEach(function(line,index) {
//               let color=self.colors[line.features[0].type];
//                 self.map.addLayer({
//                     type: "line",
//                     id:'line'+index,
//                     source: {
//                         type: "geojson",
//                         data: line
//                     },
//                     layout: {
//                         "line-join": "round",
//                         "line-cap": "round"
//                     },
//                     paint: {
//                         "line-color": color,
//                         "line-width":.5
//                     }
//                 });
//                 color=null;
//             });
//         },
//         addMaker(places) {
//             let self = this;
//             places.features.forEach(function(marker) {
//                 // create a DOM element for the marker
//                 var el = document.createElement("div");
//                 el.className = "marker-nomarl " + marker.type;
//                 el.innerHTML = '<div class="mlabel">' + marker.label + "</div>";
//                 // add marker to map
//                 new mapboxgl.Marker(el)
//                     .setLngLat(marker.coordinates)
//                     .addTo(self.map);
//             });
//         }
//     }
// };
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

